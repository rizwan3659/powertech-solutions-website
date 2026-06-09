import { getProducts, getCategories } from "@/lib/products-data";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <ProductsClient
      products={products}
      categories={categories}
      initialCategory={category ?? "all"}
    />
  );
}
