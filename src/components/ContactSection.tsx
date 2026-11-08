import { Mail, MessageCircle } from 'lucide-react';
import { OWNER_CONTACT, emailContactUrl, whatsappContactUrl } from '../data/contact';

/** "Like this website? Let's build yours." — the site owner's contact card. */
export const ContactSection = () => {
  const whatsapp = whatsappContactUrl();
  const email = emailContactUrl();
  if (!whatsapp && !email) return null;

  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6">
      <div className="panel flex flex-col items-center gap-5 text-center sm:py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-400/80">Like this website?</p>
        <h2 className="font-display text-3xl font-semibold text-cream-50 sm:text-4xl">Let&rsquo;s build yours.</h2>
        <p className="max-w-xl text-cream-100/65">
          {OWNER_CONTACT.name ? <>I&rsquo;m {OWNER_CONTACT.name}. </> : null}I design and build websites, web apps and custom tools for businesses and
          individuals. Have an idea? Send me a message.
        </p>
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1fa855] px-6 py-3.5 font-semibold text-white transition hover:bg-[#23b85e]"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp me
            </a>
          )}
          {email && (
            <a href={email} className="btn-ghost flex-1">
              <Mail className="h-5 w-5" /> Email me
            </a>
          )}
        </div>
        {OWNER_CONTACT.email && <p className="text-xs text-cream-100/45 break-all">{OWNER_CONTACT.email}</p>}
      </div>
    </section>
  );
};
