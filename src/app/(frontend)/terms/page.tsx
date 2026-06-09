import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | Power Tech Solutions",
  description:
    "Terms and conditions for using the Power Tech Solutions website and purchasing our batteries, voltage stabilizers, UPS systems and power backup solutions.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 bg-white text-gray-900 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms & Conditions", href: "/terms" }]} />
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mt-6 mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: June 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the {SITE.name} website, you accept and agree to be bound by these
              Terms &amp; Conditions. If you do not agree, please do not use this website.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">2. Products &amp; Services</h2>
            <p>
              {SITE.name} supplies batteries, voltage stabilizers, UPS systems and power backup
              solutions, along with installation, AMC and repair services. Product specifications,
              images and availability are indicative and may change without notice. Final pricing and
              availability are confirmed at the time of quotation.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">3. Quotations &amp; Orders</h2>
            <p>
              Enquiries submitted through this website do not constitute a binding order. Orders are
              confirmed only on acceptance of a written quotation and applicable advance payment, where
              required.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">4. Warranty</h2>
            <p>
              Products are covered by the respective manufacturer&apos;s warranty. Warranty terms vary by
              brand and product and are provided with the product documentation. Warranty does not cover
              damage from misuse, unauthorised repair, or incorrect installation by third parties.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">5. Limitation of Liability</h2>
            <p>
              {SITE.name} shall not be liable for any indirect or consequential loss arising from the use
              of this website or our products beyond the value of the product or service supplied.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">6. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics and logos, is the property of
              {" "}{SITE.name} and may not be reproduced without permission.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">7. Contact</h2>
            <p>
              For any questions about these terms, contact us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-red-600 hover:underline">{SITE.email}</a>{" "}
              or {SITE.phoneDisplay}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
