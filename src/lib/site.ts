// ---------------------------------------------------------------------------
// Central site configuration: contact details and social media links.
// Edit these values in one place; they are used by the header, footer,
// sticky buttons and chat widget.
// ---------------------------------------------------------------------------

export const SITE = {
  name: "Power Tech Solutions",
  url: "https://powertech-nine.vercel.app",

  // Contact
  phoneDisplay: "011-29945496",
  phoneTel: "01129945496",
  mobileDisplay: "+91 98105 17255",
  mobileTel: "919810517255",
  whatsapp: "919810517255", // digits only, country code first (no +)
  email: "data_powertech@yahoo.com",
  address:
    "F-109, IIIrd Floor, (R), Shaheen Bagh, Abul Fazal Enclave-II, Jamia Nagar, New Delhi-110025",
} as const;

export function whatsappLink(message = "Hi Power Tech Solutions, I have an enquiry.") {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Social profiles. Replace the "#" placeholders with the real profile URLs.
// Entries left as "#" are hidden in the footer automatically.
export const SOCIALS: { name: string; href: string }[] = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Twitter", href: "#" },
];
