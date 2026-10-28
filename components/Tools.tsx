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
            <dt className="text-small text-muted md:col-span-3 md:pt-4 md:text-body">{group.label}</dt>
            <dd className="md:col-span-9">
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex min-h-14 items-center rounded-slot border-2 border-b-4 border-line bg-inset px-5 font-semibold"
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
