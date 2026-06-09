import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Power Tech Solutions",
  description:
    "How Power Tech Solutions collects, uses and protects your personal information when you use our website and submit enquiries.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-20 bg-white text-gray-900 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy-policy" }]} />
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mt-6 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: June 2026</p>

        <div className="space-y-6 text-gray-600 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-bold text-gray-900">1. Information We Collect</h2>
            <p>
              When you submit an enquiry, request a quote or contact us, we collect the information you
              provide — such as your name, company, mobile number, email, city and message. We may also
              collect basic analytics about how you use the site.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Respond to your enquiries and provide quotations.</li>
              <li>Process orders, installations, AMC and service requests.</li>
              <li>Send relevant updates about products and services you asked about.</li>
              <li>Improve our website and customer service.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">3. Sharing of Information</h2>
            <p>
              We do not sell your personal information. We may share it with trusted service providers
              (such as email delivery) solely to operate our business, and where required by law.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">4. Data Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your information.
              However, no method of transmission over the Internet is completely secure.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">5. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information by
              contacting us. We will respond within a reasonable time.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">6. Contact Us</h2>
            <p>
              For privacy questions, email{" "}
              <a href={`mailto:${SITE.email}`} className="text-red-600 hover:underline">{SITE.email}</a>{" "}
              or call {SITE.phoneDisplay}. {SITE.name}, {SITE.address}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
