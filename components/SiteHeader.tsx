import { header, site } from "../content/site";
import HeaderCta from "./HeaderCta";
import LogoLink from "./LogoLink";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 bg-bg">
      <div className="mx-auto flex h-header max-w-wrap items-center justify-between px-margin">
        <LogoLink name={site.name} />
        <HeaderCta label={header.cta} />
      </div>
    </header>
  );
}
