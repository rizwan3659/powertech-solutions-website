import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import {
  categories,
  getCategory,
  getProductsByCategory,
  COMPANY,
} from "@/lib/catalog";
import Breadcrumbs from "@/components/Breadcrumbs";

export const dynamic = "force-static";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: category.seo.title,
    description: category.seo.description,
    keywords: category.seo.keywords,
    alternates: { canonical: `/products/category/${category.slug}` },
    openGraph: {
      title: category.seo.title,
      description: category.seo.description,
      url: `${COMPANY.url}/products/category/${category.slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(category.slug);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.seo.description,
    url: `${COMPANY.url}/products/category/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categoryProducts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${COMPANY.url}/products/${p.slug}`,
        name: p.name,
      })),
    },
  };

  return (
    <div className="pt-24 pb-20 bg-white text-gray-900 min-h-screen selection:bg-red-500/30 selection:text-red-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: category.name, href: `/products/category/${category.slug}` },
          ]}
        />

        {/* Header */}
        <div className="mt-8 mb-10 max-w-3xl">
          <span className="text-[11px] uppercase tracking-widest font-bold text-red-600">
            {category.tagline}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mt-2 mb-4">
            {category.name}
          </h1>
          <p className="text-gray-600 leading-relaxed font-light">{category.description}</p>
        </div>

        {/* Subcategories */}
        {category.subcategories.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {category.subcategories.map((sub) => (
              <div
                key={sub.slug}
                className="border border-gray-200 rounded-md p-4 bg-gray-50/50"
              >
                <h2 className="text-sm font-bold text-gray-900 mb-1">{sub.name}</h2>
                <p className="text-[11px] text-gray-500 leading-relaxed">{sub.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Products */}
        <h2 className="text-xl font-black tracking-tight mb-5">
          {categoryProducts.length} {category.name}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="bg-white border border-gray-200 group hover:border-red-600 transition-colors flex flex-col rounded-md shadow-sm hover:shadow-md overflow-hidden"
            >
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-3 border-b border-gray-100">
                <img
                  src={product.image || "https://placehold.co/400?text=No+Image"}
                  alt={product.imageAlt}
                  loading="lazy"
                  className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <span className="text-[9px] uppercase tracking-widest font-bold text-red-600 mb-1">
                  {product.brand}
                </span>
                <h3 className="text-xs font-bold text-gray-900 leading-tight mb-2">{product.name}</h3>
                <span className="mt-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-red-600 transition-colors">
                  View Details <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Other categories */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <h2 className="text-lg font-black tracking-tight mb-5">Other Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/products/category/${c.slug}`}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-gray-200 rounded hover:border-red-600 hover:text-red-600 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
