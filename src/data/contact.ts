/**
 * The site owner's contact details for the "Let's build yours" section.
 * Leave a value empty ('') to hide that button.
 */
export const OWNER_CONTACT = {
  /** Shown as "Designed & built by …". */
  name: 'Saurabh',
  /** WhatsApp number with country code, digits only — e.g. '919876543210'. */
  whatsapp: '919403588913',
  email: 'amrutkars18@gmail.com',
  /** Pre-filled text when a visitor taps WhatsApp or Email. */
  message: "Hi! I saw your Festive Card Studio website and I'd like to discuss a project with you.",
};

export const whatsappContactUrl = () =>
  OWNER_CONTACT.whatsapp ? `https://wa.me/${OWNER_CONTACT.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(OWNER_CONTACT.message)}` : '';

export const emailContactUrl = () =>
  OWNER_CONTACT.email
    ? `mailto:${OWNER_CONTACT.email}?subject=${encodeURIComponent('Project enquiry from Festive Card Studio')}&body=${encodeURIComponent(OWNER_CONTACT.message)}`
    : '';
