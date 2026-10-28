"use client";

import { useRef, useState } from "react";
import { contact, site } from "../content/site";
import TopicPills from "./TopicPills";

type Status = "idle" | "sending" | "success" | "limited" | "error";

const field =
  "min-h-16 w-full rounded-slot border-2 border-b-4 border-edge bg-inset px-5 text-xl placeholder:text-muted focus-visible:border-accent";

const notices: Record<Status, string> = {
  idle: "",
  sending: "",
  success: contact.success,
  limited: contact.rateLimited,
  error: contact.error,
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const notice = useRef<HTMLParagraphElement>(null);
  const connected = site.contactEndpoint !== "";
  const sending = status === "sending";
  const failed = status === "limited" || status === "error";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    let next: Status = "error";
    try {
      const response = await fetch(site.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          reply: data.get("reply"),
          topic: data.get("topic") ?? "",
          message: data.get("message"),
          website: data.get("website"),
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (response.ok) {
        form.reset();
        next = "success";
      } else if (response.status === 429) {
        next = "limited";
      }
    } catch {
      // The status stays "error": the request failed or timed out.
    }
    setStatus(next);
    // The notice sits below the button, so bring it to the person who just pressed Send.
    if (next !== "success") requestAnimationFrame(() => notice.current?.focus());
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {!connected && (
        <p className="rounded-slot border-2 border-b-4 border-accent bg-surface p-5">
          {contact.unavailable}{" "}
          <a
            href={site.github}
            className="font-semibold underline decoration-1 underline-offset-4 hover:decoration-4 hover:decoration-accent"
          >
            {contact.githubLabel}
          </a>
        </p>
      )}
      <fieldset disabled={!connected} className="grid gap-6 disabled:opacity-50">
        <label className="grid gap-2">
          <span className="text-small text-muted">{contact.nameLabel}</span>
          <input
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            readOnly={sending}
            className={field}
          />
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
            readOnly={sending}
            className={field}
          />
        </label>
        <TopicPills />
        <label className="grid gap-2">
          <span className="text-small text-muted">{contact.messageLabel}</span>
          <textarea
            name="message"
            required
            rows={5}
            maxLength={1500}
            readOnly={sending}
            className={`${field} resize-y py-4`}
          />
        </label>
        <div aria-hidden="true" className="sr-only">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          aria-disabled={sending}
          className="layer layer-text inline-flex min-h-12 w-fit items-center gap-3 rounded-pill bg-accent px-8 font-semibold text-accent-ink transition-transform duration-(--dur-fast) ease-brand active:scale-97 aria-disabled:opacity-60"
        >
          {sending && (
            <span
              aria-hidden="true"
              className="spin size-4 rounded-pill border-2 border-current border-t-transparent"
            />
          )}
          {sending ? contact.sending : contact.send}
        </button>
      </fieldset>
      <p
        ref={notice}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        data-failed={failed ? "" : undefined}
        className="min-h-6 rounded-tag text-muted data-failed:border-l-4 data-failed:border-alert data-failed:pl-4 data-failed:text-alert"
      >
        {notices[status]}
      </p>
    </form>
  );
}
