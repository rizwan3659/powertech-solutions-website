// ---------------------------------------------------------------------------
// Public catalog data layer.
//
// Reads products & categories from the database (admin-managed CMS). When the
// DB is empty or unreachable, it falls back to the code-defined catalog in
// catalog.ts so the public site always renders. For products/categories whose
// slug matches a built-in catalog entry, the rich fields the DB doesn't store
// (applications, benefits, FAQs, SEO, tagline, alt text) are merged in.
// ---------------------------------------------------------------------------

import { prisma } from "@/lib/prisma";
import {
  categories as staticCategories,
  products as staticProducts,
  getCategory as getStaticCategory,
  getProduct as getStaticProduct,
  type Product,
  type Category,
} from "@/lib/catalog";

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

function normalizeSpecs(json: unknown): { label: string; value: string }[] {
  if (Array.isArray(json)) {
    return json
      .filter((x): x is { label: unknown; value: unknown } => !!x && typeof x === "object" && "label" in x)
      .map((x) => ({ label: String((x as any).label), value: String((x as any).value ?? "") }));
  }
  return [];
}

type ProductRow = Awaited<ReturnType<typeof prisma.cmsProduct.findMany>>[number];
type CategoryRow = Awaited<ReturnType<typeof prisma.productCategory.findMany>>[number];

function mapProduct(row: ProductRow): Product {
  const slug = row.slug || slugify(row.name);
  const s = getStaticProduct(slug);
  const dbSpecs = normalizeSpecs(row.specs);
  return {
    slug,
    name: row.name,
    tagline: s?.tagline ?? row.description.slice(0, 110),
    categorySlug: row.category,
    subcategorySlug: row.subcategory ?? s?.subcategorySlug,
    brand: row.brand ?? s?.brand ?? "",
    image: row.imageUrl ?? s?.image ?? null,
    images: row.images.length > 0 ? row.images : s?.images,
    imageAlt: s?.imageAlt ?? row.name,
    overview: row.description || s?.overview || "",
    features: row.features.length > 0 ? row.features : s?.features ?? [],
    specs: dbSpecs.length > 0 ? dbSpecs : s?.specs ?? [],
    applications: s?.applications ?? [],
    benefits: s?.benefits ?? [],
    faqs: s?.faqs ?? [],
    seo:
      s?.seo ?? {
        title: `${row.name} | Power Tech Solutions`,
        description: row.description.slice(0, 160),
        keywords: [row.name, row.brand ?? "", row.category].filter(Boolean),
      },
  };
}

function mapCategory(main: CategoryRow, all: CategoryRow[]): Category {
  const s = getStaticCategory(main.slug);
  const subs = all.filter((r) => r.parentSlug === main.slug);
  return {
    slug: main.slug,
    name: main.name,
    tagline: s?.tagline ?? "",
    description: main.description ?? s?.description ?? "",
    image: main.imageUrl ?? s?.image ?? null,
    subcategories: subs.map((sub) => ({
      slug: sub.slug,
      name: sub.name,
      description: sub.description ?? getStaticCategory(main.slug)?.subcategories.find((x) => x.slug === sub.slug)?.description ?? "",
    })),
    seo:
      s?.seo ?? {
        title: `${main.name} | Power Tech Solutions`,
        description: main.description ?? "",
        keywords: [main.name],
      },
  };
}

// --- Products -------------------------------------------------------------

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await prisma.cmsProduct.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
    if (rows.length === 0) return staticProducts;
    return rows.map(mapProduct);
  } catch {
    return staticProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const row = await prisma.cmsProduct.findFirst({ where: { slug, isActive: true } });
    if (row) return mapProduct(row);
    // Not in DB — fall back to static (covers the case where DB has other products).
    return getStaticProduct(slug);
  } catch {
    return getStaticProduct(slug);
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.categorySlug === categorySlug);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, limit);
}

// --- Categories -----------------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  try {
    const rows = await prisma.productCategory.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
    const mains = rows.filter((r) => !r.parentSlug);
    if (mains.length === 0) return staticCategories;
    return mains.map((m) => mapCategory(m, rows));
  } catch {
    return staticCategories;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug);
}
