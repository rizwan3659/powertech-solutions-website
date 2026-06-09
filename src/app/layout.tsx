import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AIChatWidget from "@/components/AIChatWidget";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_TITLE = "Power Tech Solutions | Batteries, Voltage Stabilizers & UPS Systems";
const SITE_DESC =
  "Power Tech Solutions supplies Amaron Quanta SMF & tubular batteries, servo and automatic voltage stabilizers, online UPS systems (1–100 KVA) and power backup solutions, with AMC and repair services across Delhi NCR. ISO 9001:2008 certified since 2009.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESC,
  keywords: [
    "batteries",
    "Amaron Quanta SMF battery",
    "voltage stabilizer",
    "servo stabilizer",
    "online UPS",
    "UPS system",
    "power backup solutions",
    "Delhi NCR",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: "https://powertechsolutions.com",
    siteName: "Power Tech Solutions",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectronicsStore",
  name: "Power Tech Solutions",
  description: SITE_DESC,
  url: "https://powertechsolutions.com",
  foundingDate: "2009",
  telephone: "+91-11-29945496",
  email: "data_powertech@yahoo.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "F-109, IIIrd Floor, Shaheen Bagh, Abul Fazal Enclave-II, Jamia Nagar",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110025",
    addressCountry: "IN",
  },
  brand: ["Amaron", "Quanta", "Microtek", "Emerson", "Vertiv", "APC"],
  makesOffer: [
    "Batteries",
    "Voltage Stabilizers",
    "UPS Systems",
    "Power Backup Solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          {children}
        </Providers>
        <AIChatWidget />
      </body>
    </html>
  );
}
