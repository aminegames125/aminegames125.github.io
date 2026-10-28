import { contact, site } from "../content/site";
import ContactForm from "./ContactForm";

export default function Contact() {
  const connected = site.contactEndpoint !== "";

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-wrap px-margin">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 id="contact-title" className="font-display text-h2 font-bold">
            {contact.heading}
          </h2>
          <p className="mt-4 max-w-sm text-lede text-pretty">
            {connected ? contact.body : contact.offlineBody}{" "}
            <a
              href={site.github}
              className="underline decoration-1 underline-offset-4 hover:decoration-4 hover:decoration-accent"
            >
              {contact.githubLabel}
            </a>
            .
          </p>
        </div>
        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
