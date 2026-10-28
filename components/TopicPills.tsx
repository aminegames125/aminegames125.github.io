import { contact } from "../content/site";

export default function TopicPills() {
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-3 text-small text-muted">{contact.topicLabel}</legend>
      <div className="flex flex-wrap gap-2">
        {contact.topics.map((topic) => (
          <label key={topic} className="relative cursor-pointer">
            <input type="radio" name="topic" value={topic} className="peer sr-only" />
            <span className="inline-flex min-h-11 items-center rounded-pill border border-edge bg-surface px-4.5 transition-transform duration-(--dur-fast) ease-brand hover:bg-line peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent peer-active:scale-97">
              {topic}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
