import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AIChatWidget from "@/components/AIChatWidget";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PowerTech Solutions | UPS, Inverter & Battery Solutions",
  description:
    "PowerTech Solutions provides UPS systems, inverters, batteries, installation, maintenance, AMC, and repair services for homes, offices, and industries.",
  openGraph: {
    title: "PowerTech Solutions | UPS, Inverter & Battery Solutions",
    description:
      "PowerTech Solutions provides UPS systems, inverters, batteries, installation, maintenance, AMC, and repair services for homes, offices, and industries.",
    url: "https://powertechsolutions.com",
    siteName: "PowerTech Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerTech Solutions | UPS, Inverter & Battery Solutions",
    description:
      "PowerTech Solutions provides UPS systems, inverters, batteries, installation, maintenance, AMC, and repair services for homes, offices, and industries.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "PowerTech Solutions",
  description:
    "PowerTech Solutions provides UPS systems, inverters, batteries, installation, maintenance, AMC, and repair services for homes, offices, and industries.",
  url: "https://powertechsolutions.com",
  telephone: "+1-234-567-8900",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Power Ave",
    addressLocality: "Tech City",
    addressRegion: "NY",
    postalCode: "10001",
    addressCountry: "US",
  },
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
