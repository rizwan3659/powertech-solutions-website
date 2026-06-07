import { prisma } from "@/lib/prisma";
import ProductsClient from "./ProductsClient";

export const revalidate = 60; // Revalidate every 60 seconds (optional)

export default async function ProductsPage() {
  const products = await prisma.cmsProduct.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  // Convert Date objects to strings for the client component
  const serializedProducts = products.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  // We can just cast it back or pass it as is, ProductsClient only needs standard properties
  return <ProductsClient products={serializedProducts as any} />;
}
