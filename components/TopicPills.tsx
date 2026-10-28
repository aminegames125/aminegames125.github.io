import { contact } from "../content/site";

export default function TopicPills() {
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-3 text-small text-muted">{contact.topicLabel}</legend>
      <div className="flex flex-wrap gap-2">
        {contact.topics.map((topic) => (
          <label key={topic} className="relative cursor-pointer">
            <input type="radio" name="topic" value={topic} className="peer sr-only" />
            <span className="inline-flex min-h-12 items-center rounded-slot border-2 border-b-4 border-edge bg-inset px-4 hover:bg-surface peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent">
              {topic}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
