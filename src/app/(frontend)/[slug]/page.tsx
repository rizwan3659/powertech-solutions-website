import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Breadcrumbs from "@/components/Breadcrumbs";

// Dynamic, admin-managed CMS pages served at /{slug}.
// Static routes (products, about, services, contact, terms, etc.) take
// precedence; unknown slugs are resolved here against the CmsPage table.
export const dynamic = "force-dynamic";

async function getPage(slug: string) {
  try {
    return await prisma.cmsPage.findFirst({
      where: { slug, isPublished: true },
    });
  } catch {
    // Table may not exist yet (pre-migration) or DB unreachable.
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Page Not Found" };
  return {
    title: page.seoTitle || `${page.title} | Power Tech Solutions`,
    description: page.seoDesc || undefined,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function CmsDynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <div className="pt-24 pb-20 bg-white text-gray-900 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: page.title, href: `/${page.slug}` }]} />
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mt-6 mb-6">{page.title}</h1>
        <article
          className="prose prose-sm max-w-none text-gray-600 leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-2 [&_a]:text-red-600 [&_ul]:list-disc [&_ul]:pl-6 [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
      </div>
    </div>
  );
}
