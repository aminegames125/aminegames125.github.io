"use client";

import { useEffect, useRef, useState } from "react";
import { contact, site } from "../content/site";
import TopicPills from "./TopicPills";
import { contactConnected, webhookUrl } from "./webhook";

type Status = "idle" | "sending" | "success" | "limited" | "error";

const COOLDOWN_MS = 10 * 60 * 1000;
/** A person needs longer than this to fill the form in. Faster is a script. */
const MIN_FILL_MS = 3000;
const SENT_KEY = "contact-sent";

const field =
  "min-h-16 w-full rounded-slot border-2 border-b-4 border-edge bg-inset px-5 text-xl placeholder:text-muted focus-visible:border-accent";

const notices: Record<Status, string> = {
  idle: "",
  sending: "",
  success: contact.success,
  limited: contact.rateLimited,
  error: contact.error,
};

function lastSent() {
  try {
    return Number(localStorage.getItem(SENT_KEY)) || 0;
  } catch {
    return 0;
  }
}

function rememberSent() {
  try {
    localStorage.setItem(SENT_KEY, String(Date.now()));
  } catch {
    // Storage can be blocked. The cooldown is then best effort.
  }
}

/**
 * Posts straight to a Discord webhook. The URL is injected at build time and encoded (see
 * next.config.ts), and the checks below only slow bots and casual abuse down: a static page cannot
 * keep a webhook secret, so the channel should hold nothing but these messages.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const openedAt = useRef(0);
  const notice = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);
  const sending = status === "sending";
  const failed = status === "limited" || status === "error";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);

    // The honeypot is filled or the form was done too fast: a bot. Say "sent" and drop it.
    if (String(data.get("website") ?? "") !== "" || Date.now() - openedAt.current < MIN_FILL_MS) {
      form.reset();
      setStatus("success");
      return;
    }
    if (Date.now() - lastSent() < COOLDOWN_MS) {
      setStatus("limited");
      requestAnimationFrame(() => notice.current?.focus());
      return;
    }

    setStatus("sending");
    const text = [
      "**New message from the portfolio**",
      `**Name:** ${String(data.get("name") ?? "")}`,
      `**Reply to:** ${String(data.get("reply") ?? "")}`,
      `**Type:** ${String(data.get("topic") ?? "") || "not given"}`,
      `**Message:** ${String(data.get("message") ?? "")}`,
    ].join("\n");
    let next: Status = "error";
    try {
      const response = await fetch(webhookUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text.slice(0, 1900),
          allowed_mentions: { parse: [] },
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (response.ok) {
        form.reset();
        rememberSent();
        next = "success";
      }
    } catch {
      // The status stays "error": the request failed or timed out.
    }
    setStatus(next);
    if (next !== "success") requestAnimationFrame(() => notice.current?.focus());
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {!contactConnected && (
        <p className="rounded-slot border-2 border-b-4 border-accent bg-surface p-5">
          {contact.offlineBody}{" "}
          <a
            href={site.github}
            className="font-semibold underline decoration-1 underline-offset-4 hover:decoration-4 hover:decoration-accent"
          >
            {contact.githubLabel}
          </a>
          .
        </p>
      )}
      <fieldset disabled={!contactConnected} className="grid gap-6 disabled:opacity-50">
        <label className="grid gap-2">
          <span className="text-small text-muted">{contact.nameLabel}</span>
          <input name="name" type="text" required maxLength={80} autoComplete="name" className={field} />
        </label>
        <label className="grid gap-2">
          <span className="text-small text-muted">{contact.replyLabel}</span>
          <input
            name="reply"
            type="text"
            required
            maxLength={120}
            autoComplete="email"
            spellCheck={false}
            className={field}
          />
        </label>
        <TopicPills />
        <label className="grid gap-2">
          <span className="text-small text-muted">{contact.messageLabel}</span>
          <textarea name="message" required rows={5} maxLength={1500} className={`${field} resize-y py-4`} />
        </label>
        <div aria-hidden="true" className="sr-only">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          aria-disabled={sending}
          className="layer layer-text min-h-12 w-fit rounded-pill bg-accent px-8 font-semibold text-accent-ink transition-transform duration-(--dur-fast) ease-brand active:scale-97 aria-disabled:opacity-60"
        >
          {sending ? contact.sending : contact.send}
        </button>
      </fieldset>
      <p
        ref={notice}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        data-failed={failed ? "" : undefined}
        className="min-h-6 text-muted data-failed:border-l-4 data-failed:border-alert data-failed:pl-4 data-failed:text-alert"
      >
        {notices[status]}
      </p>
    </form>
  );
}
