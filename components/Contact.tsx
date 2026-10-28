import { contact, site } from "../content/site";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-wrap px-margin">
      <Reveal className="grid gap-10 md:grid-cols-12">
        <div data-reveal className="md:col-span-5">
          <h2 id="contact-title" className="font-display text-h2 font-bold">
            {contact.heading}
          </h2>
          <p className="mt-4 max-w-sm text-lede text-pretty">
            {contact.body}{" "}
            <a
              href={site.github}
              className="underline decoration-1 underline-offset-4 hover:decoration-4 hover:decoration-accent"
            >
              {contact.githubLabel}
            </a>
            .
          </p>
        </div>
        <div data-reveal className="md:col-span-7">
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
