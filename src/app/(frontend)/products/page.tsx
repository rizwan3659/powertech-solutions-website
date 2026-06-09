import { products, categories } from "@/lib/catalog";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <ProductsClient
      products={products}
      categories={categories}
      initialCategory={category ?? "all"}
    />
  );
}
