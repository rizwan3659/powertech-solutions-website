import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categories, products, COMPANY } from "@/lib/catalog";

export const runtime = "nodejs";

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

// One-time / idempotent import of the code-defined catalog into the database
// so the admin CMS starts populated and editable. Safe to run multiple times.
export async function POST() {
  try {
    let cats = 0;
    let subs = 0;
    let brandCount = 0;
    let prods = 0;

    // Categories + subcategories
    for (const [i, c] of categories.entries()) {
      await prisma.productCategory.upsert({
        where: { slug: c.slug },
        update: { name: c.name, description: c.description, imageUrl: c.image, sortOrder: i },
        create: { name: c.name, slug: c.slug, description: c.description, imageUrl: c.image, sortOrder: i },
      });
      cats++;
      for (const [j, sub] of c.subcategories.entries()) {
        await prisma.productCategory.upsert({
          where: { slug: sub.slug },
          update: { name: sub.name, description: sub.description, parentSlug: c.slug, sortOrder: j },
          create: { name: sub.name, slug: sub.slug, description: sub.description, parentSlug: c.slug, sortOrder: j },
        });
        subs++;
      }
    }

    // Brands (from company brand list + product brands)
    const brandNames = new Set<string>(COMPANY.brands as readonly string[]);
    for (const p of products) brandNames.add(p.brand);
    for (const name of brandNames) {
      const slug = slugify(name);
      if (!slug) continue;
      await prisma.brand.upsert({
        where: { slug },
        update: { name },
        create: { name, slug },
      });
      brandCount++;
    }

    // Products
    for (const p of products) {
      await prisma.cmsProduct.upsert({
        where: { slug: p.slug },
        update: {
          name: p.name,
          description: p.overview,
          category: p.categorySlug,
          subcategory: p.subcategorySlug ?? null,
          brand: p.brand,
          imageUrl: p.image,
          images: p.images ?? (p.image ? [p.image] : []),
          features: p.features,
          specs: p.specs as any,
        },
        create: {
          name: p.name,
          slug: p.slug,
          description: p.overview,
          category: p.categorySlug,
          subcategory: p.subcategorySlug ?? null,
          brand: p.brand,
          imageUrl: p.image,
          images: p.images ?? (p.image ? [p.image] : []),
          features: p.features,
          specs: p.specs as any,
        },
      });
      prods++;
    }

    return NextResponse.json({
      success: true,
      imported: { categories: cats, subcategories: subs, brands: brandCount, products: prods },
    });
  } catch (error: any) {
    console.error("Import catalog error:", error);
    return NextResponse.json({ error: error?.message || "Import failed" }, { status: 500 });
  }
}
