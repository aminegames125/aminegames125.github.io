import Link from "next/link";
import { header, site } from "../content/site";
import HeaderCta from "./HeaderCta";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 bg-bg">
      <div className="mx-auto flex h-header max-w-wrap items-center justify-between px-margin">
        <Link href="/" className="font-display text-xl font-bold tracking-brand">
          {site.name}
        </Link>
        <HeaderCta label={header.cta} />
      </div>
    </header>
  );
}
