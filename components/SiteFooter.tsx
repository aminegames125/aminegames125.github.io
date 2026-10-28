import { footer, site } from "../content/site";

export default function SiteFooter() {
  return (
    <footer className="mt-section overflow-hidden bg-accent pt-10 text-accent-ink">
      <div className="mx-auto max-w-wrap px-margin">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <span>{footer.meta}</span>
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-semibold underline decoration-1 underline-offset-4 hover:decoration-4"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="wordmark-box mt-wordmark">
          <div
            aria-hidden="true"
            className="wordmark select-none font-display font-extrabold tracking-wordmark"
          >
            {site.name}
          </div>
        </div>
      </div>
    </footer>
  );
}
