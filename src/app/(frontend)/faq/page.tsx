import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";
import { products, COMPANY } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "FAQs | Power Tech Solutions",
  description:
    "Frequently asked questions about batteries, voltage stabilizers, UPS systems, AMC, warranty and installation from Power Tech Solutions.",
  alternates: { canonical: "/faq" },
};

const GENERAL_FAQS = [
  {
    question: "What products does Power Tech Solutions offer?",
    answer:
      "We supply batteries (Amaron Quanta SMF, tubular, automotive and industrial), servo and automatic voltage stabilizers, online UPS systems from 1 to 100 KVA, and complete power backup solutions including solar, UPS rental, AMC and repair.",
  },
  {
    question: "Which areas do you serve?",
    answer: "We serve Delhi NCR and surrounding regions for sales, installation, AMC and on-site service.",
  },
  {
    question: "Do you provide installation and after-sales service?",
    answer:
      "Yes. Our ISO 9001:2008 certified engineers handle installation, commissioning, AMC and breakdown support for all the products we supply.",
  },
  {
    question: "How do I get a quotation?",
    answer:
      "Share your requirement via our contact form, WhatsApp or phone. We assess your load and budget and provide a tailored quotation.",
  },
];

export default function FaqPage() {
  // Aggregate a curated set of product FAQs alongside the general ones.
  const productFaqs = products.flatMap((p) =>
    p.faqs.slice(0, 1).map((f) => ({ question: f.question, answer: f.answer }))
  );
  const allFaqs = [...GENERAL_FAQS, ...productFaqs];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="pt-24 pb-20 bg-white text-gray-900 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQs", href: "/faq" }]} />
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mt-6 mb-2">
          Frequently Asked <span className="text-red-600">Questions</span>
        </h1>
        <p className="text-gray-500 font-light mb-8">
          Answers about our products, warranty, installation and service. Still need help? Call{" "}
          {SITE.phoneDisplay}.
        </p>

        <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
          {allFaqs.map((f, i) => (
            <details key={i} className="group p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-sm text-gray-900">
                {f.question}
                <span className="text-red-600 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
              </summary>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-8">
          {COMPANY.name} · {COMPANY.certification} certified · Established {COMPANY.established}
        </p>
      </div>
    </div>
  );
}
