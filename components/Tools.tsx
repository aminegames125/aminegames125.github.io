import { tools } from "../content/site";

/** Quiet by design: these are facts, not controls, so they get no button-style chrome. */
export default function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="mx-auto max-w-wrap px-margin pb-section">
      <h2 id="tools-title" className="font-display text-h2 font-bold">
        {tools.heading}
      </h2>
      <dl className="mt-10 md:mt-12">
        {tools.groups.map((group) => (
          <div key={group.label} className="grid gap-2 border-t-2 border-line py-5 md:grid-cols-12 md:gap-6">
            <dt className="text-muted md:col-span-3 md:pt-1.5">{group.label}</dt>
            <dd className="md:col-span-9">
              <ul className="flex flex-wrap gap-x-8 gap-y-1 font-display text-name font-semibold">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
