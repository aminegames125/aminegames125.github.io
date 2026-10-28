import { hero } from "../content/site";
import CountUp from "./CountUp";

/** The two facts as big figures. The number is bold and counts up once, the rest is muted. */
export default function MetaLine() {
  return (
    <dl className="grid w-full grid-cols-2 gap-6">
      {hero.stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse">
          <dt className="text-muted">{stat.label}</dt>
          <dd className="font-display text-h2 font-bold">
            <CountUp value={stat.value} suffix={stat.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
