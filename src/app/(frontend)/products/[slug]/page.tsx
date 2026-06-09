import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle2,
  Sparkles,
  Cpu,
  Layers,
  Award,
  ArrowRight,
  Phone,
} from "lucide-react";
import { COMPANY } from "@/lib/catalog";
import { getProductBySlug, getCategoryBySlug, getRelatedProducts } from "@/lib/products-data";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGallery from "@/components/ProductGallery";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: `${COMPANY.url}/products/${product.slug}`,
      type: "website",
      images: product.image ? [{ url: product.image, alt: product.imageAlt }] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = await getCategoryBySlug(product.categorySlug);
  const related = await getRelatedProducts(product);

  // ---- Schema markup ----
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image
      ? product.image.startsWith("http")
        ? product.image
        : `${COMPANY.url}${product.image}`
      : undefined,
    description: product.seo.description,
    brand: { "@type": "Brand", name: product.brand },
    category: category?.name,
    additionalProperty: product.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.label,
      value: s.value,
    })),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      seller: { "@type": "Organization", name: COMPANY.name },
      areaServed: "Delhi NCR, India",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="pt-24 pb-20 bg-white text-gray-900 min-h-screen selection:bg-red-500/30 selection:text-red-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {product.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: category?.name ?? "Category", href: `/products/category/${product.categorySlug}` },
            { name: product.name, href: `/products/${product.slug}` },
          ]}
        />

        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-10 mt-8 items-start">
          <ProductGallery
            images={product.images && product.images.length > 0 ? product.images : product.image ? [product.image] : []}
            alt={product.imageAlt}
          />

          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-red-600">
              {product.brand} · {category?.name}
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mt-2 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 leading-relaxed font-light mb-6">{product.tagline}</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">{product.overview}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-red-700 transition-colors"
              >
                Request a Quote <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-300 text-gray-900 text-xs font-bold uppercase tracking-widest rounded hover:bg-gray-50 transition-colors"
              >
                <Phone size={15} /> Talk to an Expert
              </a>
            </div>

            {/* Quick spec strip */}
            <dl className="grid grid-cols-2 gap-px bg-gray-100 mt-8 border border-gray-100 rounded overflow-hidden">
              {product.specs.slice(0, 4).map((s) => (
                <div key={s.label} className="bg-white p-3">
                  <dt className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{s.label}</dt>
                  <dd className="text-xs font-bold text-gray-900 mt-0.5">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Features */}
        <Section icon={Sparkles} title="Features">
          <ul className="grid md:grid-cols-2 gap-3">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 size={16} className="text-red-600 shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </Section>

        {/* Specifications */}
        <Section icon={Cpu} title="Specifications">
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((s, i) => (
                  <tr key={s.label} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                    <th className="text-left font-bold text-gray-900 px-4 py-3 w-1/3 align-top">
                      {s.label}
                    </th>
                    <td className="px-4 py-3 text-gray-600">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Applications */}
        <Section icon={Layers} title="Applications & Use Cases">
          <div className="flex flex-wrap gap-2">
            {product.applications.map((a) => (
              <span
                key={a}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-700"
              >
                {a}
              </span>
            ))}
          </div>
        </Section>

        {/* Benefits */}
        <Section icon={Award} title="Benefits">
          <ul className="grid md:grid-cols-2 gap-3">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 size={16} className="text-red-600 shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
        </Section>

        {/* FAQs */}
        {product.faqs.length > 0 && (
          <Section icon={Sparkles} title="Frequently Asked Questions">
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
              {product.faqs.map((f) => (
                <details key={f.question} className="group p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-sm text-gray-900">
                    {f.question}
                    <span className="text-red-600 group-open:rotate-45 transition-transform text-lg leading-none">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </Section>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <Section icon={Layers} title="Related Products">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/products/${r.slug}`}
                  className="group border border-gray-200 hover:border-red-600 rounded-md overflow-hidden transition-colors flex flex-col"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center p-3 border-b border-gray-100">
                    <img
                      src={r.image || "https://placehold.co/400?text=No+Image"}
                      alt={r.imageAlt}
                      loading="lazy"
                      className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-red-600">
                      {r.brand}
                    </span>
                    <h3 className="text-xs font-bold text-gray-900 leading-tight mt-1">{r.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* CTA */}
        <div className="mt-16 bg-gray-900 text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-3">
            Need help choosing the right {category?.name.toLowerCase()}?
          </h2>
          <p className="text-gray-300 font-light mb-6 max-w-xl mx-auto text-sm">
            Our ISO 9001:2008 certified engineers will recommend the perfect configuration for your
            load and budget. Get a free consultation today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest rounded hover:bg-red-700 transition-colors"
          >
            Get a Free Quote <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <div className="flex items-center gap-2.5 mb-5">
        <Icon size={18} className="text-red-600" />
        <h2 className="text-xl font-black tracking-tight text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}
