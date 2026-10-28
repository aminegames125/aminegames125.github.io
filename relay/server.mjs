import { createServer } from "node:http";

const webhook = process.env.DISCORD_WEBHOOK_URL;
if (!webhook) {
  process.stderr.write("DISCORD_WEBHOOK_URL is not set.\n");
  process.exit(1);
}

const port = Number(process.env.PORT ?? 8787);
const origins = (process.env.ALLOWED_ORIGINS ?? "https://aminegames125.github.io,https://amineos.dev")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const trustProxy = process.env.TRUST_PROXY === "1";

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 8192;
const MAX = { name: 80, reply: 120, topic: 40, message: 1500 };

const hits = new Map();

function clientIp(req) {
  return (trustProxy && req.headers["x-real-ip"]) || req.socket.remoteAddress || "unknown";
}

function isLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  const limited = recent.length >= LIMIT;
  if (!limited) recent.push(now);
  hits.set(ip, recent);
  return limited;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of hits) {
    if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(ip);
  }
}, 60_000).unref();

function reply(res, status, body, extra = {}) {
  res.writeHead(status, { "Content-Type": "application/json", ...extra });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        resolve(null);
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", () => resolve(null));
  });
}

const clean = (value) =>
  typeof value === "string" ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim() : null;

function validate(payload) {
  const name = clean(payload.name);
  const reply = clean(payload.reply);
  const topic = clean(payload.topic ?? "");
  const message = clean(payload.message);
  const fits = (value, max, min) => value !== null && value.length >= min && value.length <= max;
  if (
    !fits(name, MAX.name, 1) ||
    !fits(reply, MAX.reply, 1) ||
    !fits(message, MAX.message, 1) ||
    !fits(topic, MAX.topic, 0)
  ) {
    return null;
  }
  return { name, reply, topic, message };
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");

  if (req.method === "GET" && url.pathname === "/healthz") {
    return reply(res, 200, { ok: true });
  }
  if (url.pathname !== "/contact") return reply(res, 404, { error: "not_found" });

  const origin = req.headers.origin ?? "";
  if (!origins.includes(origin)) return reply(res, 403, { error: "origin_not_allowed" });
  const cors = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, { ...cors, "Access-Control-Max-Age": "600" });
    return res.end();
  }
  if (req.method !== "POST") return reply(res, 405, { error: "method_not_allowed" }, cors);
  if (isLimited(clientIp(req))) {
    return reply(res, 429, { error: "rate_limited" }, { ...cors, "Retry-After": String(WINDOW_MS / 1000) });
  }

  const raw = await readBody(req);
  if (raw === null) return reply(res, 413, { error: "too_large" }, cors);

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return reply(res, 400, { error: "invalid_json" }, cors);
  }
  if (typeof payload !== "object" || payload === null) {
    return reply(res, 400, { error: "invalid_json" }, cors);
  }
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return reply(res, 200, { ok: true }, cors);
  }

  const fields = validate(payload);
  if (!fields) return reply(res, 400, { error: "invalid_fields" }, cors);

  const content = [
    "**New message from the portfolio**",
    `**Name:** ${fields.name}`,
    `**Reply to:** ${fields.reply}`,
    `**Type:** ${fields.topic || "not given"}`,
    `**Message:** ${fields.message}`,
  ].join("\n");

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content.slice(0, 2000), allowed_mentions: { parse: [] } }),
      signal: AbortSignal.timeout(8000),
    });
    if (!upstream.ok) return reply(res, 502, { error: "upstream_failed" }, cors);
  } catch {
    return reply(res, 502, { error: "upstream_failed" }, cors);
  }
  return reply(res, 200, { ok: true }, cors);
});

server.listen(port);
