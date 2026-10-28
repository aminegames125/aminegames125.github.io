"use client";

import { useState } from "react";
import { contact, site } from "../content/site";
import TopicPills from "./TopicPills";

type Status = "idle" | "sending" | "success" | "limited" | "error";

const field =
  "min-h-16 w-full rounded-field border border-edge bg-surface px-6 text-xl placeholder:text-muted focus-visible:bg-line";

const notices: Record<Status, string> = {
  idle: "",
  sending: "",
  success: contact.success,
  limited: contact.rateLimited,
  error: contact.error,
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const connected = site.contactEndpoint !== "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch(site.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          topic: data.get("topic") ?? "",
          message: data.get("message"),
          website: data.get("website"),
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (response.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus(response.status === 429 ? "limited" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <fieldset disabled={!connected || status === "sending"} className="grid gap-6">
        <label className="grid gap-2">
          <span className="text-small text-muted">{contact.nameLabel}</span>
          <input name="name" type="text" required maxLength={80} autoComplete="name" className={field} />
        </label>
        <TopicPills />
        <label className="grid gap-2">
          <span className="text-small text-muted">{contact.messageLabel}</span>
          <textarea
            name="message"
            required
            rows={5}
            maxLength={1500}
            className={`${field} resize-y py-4`}
          />
        </label>
        <div aria-hidden="true" className="sr-only">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          className="layer layer-text min-h-12 w-fit rounded-pill bg-accent px-8 font-semibold text-accent-ink transition-transform duration-(--dur-fast) ease-brand active:scale-97 disabled:opacity-60"
        >
          {status === "sending" ? contact.sending : contact.send}
        </button>
      </fieldset>
      <p role="status" aria-live="polite" className="min-h-6 text-muted">
        {connected ? notices[status] : contact.unavailable}
      </p>
    </form>
  );
}
