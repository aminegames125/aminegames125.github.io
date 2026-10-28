import { Fragment } from "react";
import { hero } from "../content/site";
import CountUp from "./CountUp";

export default function MetaLine() {
  return (
    <p className="text-muted">
      {hero.stats.map((stat, index) => (
        <Fragment key={stat.label}>
          {index > 0 && ", "}
          <strong className="font-semibold text-text">
            <CountUp value={stat.value} suffix={stat.suffix} />
          </strong>{" "}
          {stat.label}
        </Fragment>
      ))}
    </p>
  );
}
