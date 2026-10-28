"use client";

import { useState } from "react";
import { contact, site } from "../content/site";
import TopicPills from "./TopicPills";

const field =
  "min-h-16 w-full rounded-slot border-2 border-b-4 border-edge bg-inset px-5 text-xl placeholder:text-muted focus-visible:border-accent";

/**
 * Opens a prefilled GitHub issue. A workflow in .github/workflows forwards each one to Discord,
 * so there is no server and no secret in the page. The sender's GitHub account is the reply address.
 */
export default function ContactForm() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const topic = String(data.get("topic") ?? "");
    const issue = new URLSearchParams({
      title: topic ? `${contact.titlePrefix}: ${topic}` : contact.titlePrefix,
      body: String(data.get("message") ?? ""),
    });
    window.open(`${site.issueUrl}?${issue}`, "_blank", "noopener");
    setOpened(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <TopicPills />
      <label className="grid gap-2">
        <span className="text-small text-muted">{contact.messageLabel}</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={1500}
          onChange={() => setOpened(false)}
          className={`${field} resize-y py-4`}
        />
      </label>
      <button
        type="submit"
        className="layer layer-text min-h-12 w-fit rounded-pill bg-accent px-8 font-semibold text-accent-ink transition-transform duration-(--dur-fast) ease-brand active:scale-97"
      >
        {contact.send}
      </button>
      <p role="status" aria-live="polite" className="min-h-6 text-muted">
        {opened ? contact.opened : ""}
      </p>
    </form>
  );
}
