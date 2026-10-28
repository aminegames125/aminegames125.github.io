import { Fragment } from "react";

/** Lets long project names wrap after an underscore or hyphen instead of mid-word. */
export default function Breakable({ text }: { text: string }) {
  const parts = text.split(/(?<=[_-])/);
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={part}>
          {part}
          {index < parts.length - 1 && <wbr />}
        </Fragment>
      ))}
    </>
  );
}
