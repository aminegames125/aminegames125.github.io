import { footer, site } from "../content/site";

export default function SiteFooter() {
  return (
    <footer className="mt-section overflow-hidden">
      <div className="mx-auto max-w-wrap px-margin">
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-muted">
          <span>{footer.meta}</span>
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-text underline decoration-1 underline-offset-4 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="wordmark-box mt-wordmark">
          <div
            aria-hidden="true"
            className="wordmark select-none font-display font-extrabold tracking-wordmark text-text"
          >
            {site.name}
          </div>
        </div>
      </div>
    </footer>
  );
}
