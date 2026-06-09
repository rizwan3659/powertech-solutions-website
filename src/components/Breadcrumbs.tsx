import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { COMPANY } from "@/lib/catalog";

export type Crumb = { name: string; href: string };

/**
 * Accessible breadcrumb trail with embedded BreadcrumbList JSON-LD for SEO.
 * The last crumb is rendered as the current page (no link).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${COMPANY.url}${item.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-[11px] md:text-xs text-gray-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {isLast ? (
                <span className="font-bold text-gray-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="hover:text-red-600 transition-colors uppercase tracking-wide"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight size={12} className="text-gray-300" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
