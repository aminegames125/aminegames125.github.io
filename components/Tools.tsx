import { tools } from "../content/site";

export default function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="mx-auto max-w-wrap px-margin pb-section">
      <h2 id="tools-title" className="font-display text-h2 font-bold">
        {tools.heading}
      </h2>
      <dl className="mt-10 grid gap-y-8 md:mt-12">
        {tools.groups.map((group) => (
          <div key={group.label} className="grid gap-3 md:grid-cols-12">
            <dt className="text-small text-muted md:col-span-3 md:pt-3 md:text-body">{group.label}</dt>
            <dd className="md:col-span-9">
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex min-h-11 items-center rounded-pill bg-surface px-4.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
