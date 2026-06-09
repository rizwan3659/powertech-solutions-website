"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product, Category } from "@/lib/catalog";
import Breadcrumbs from "@/components/Breadcrumbs";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function ProductsClient({
  products,
  categories,
  initialCategory = "all",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [active, setActive] = useState(initialCategory);

  const filtered = useMemo(
    () =>
      active === "all"
        ? products
        : products.filter((p) => p.categorySlug === active),
    [active, products]
  );

  const filters = [{ slug: "all", name: "All Products" }, ...categories];

  return (
    <div className="pt-24 pb-20 bg-white min-h-[90vh] text-gray-900 selection:bg-red-500/30 selection:text-red-900 relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Products", href: "/products" }]} />

        {/* Header */}
        <div className="text-center mt-6 mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 tracking-tighter">
            Our <span className="text-red-600">Products</span>.
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed font-light max-w-2xl mx-auto">
            Batteries, voltage stabilizers, online UPS systems and complete power backup
            solutions — engineered for reliability across homes, offices and industry.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.slug}
              onClick={() => setActive(f.slug)}
              className={`px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest border transition-colors rounded ${
                active === f.slug
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-600 hover:text-red-600"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div
          key={active}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {filtered.map((product) => (
            <motion.div key={product.slug} variants={fadeInUp}>
              <Link
                href={`/products/${product.slug}`}
                className="bg-white border border-gray-200 group hover:border-red-600 transition-colors flex flex-col relative overflow-hidden h-full rounded-md shadow-sm hover:shadow-md"
              >
                <div className="aspect-square bg-gray-50 w-full relative overflow-hidden border-b border-gray-100 flex items-center justify-center p-3">
                  <img
                    src={product.image || "https://placehold.co/400?text=No+Image"}
                    alt={product.imageAlt}
                    loading="lazy"
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                  />
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-red-600 mb-1">
                    {product.brand}
                  </span>
                  <h3 className="text-xs font-bold text-gray-900 leading-tight mb-2">
                    {product.name}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-red-600 transition-colors">
                    View Details <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-20">No products in this category yet.</p>
        )}

        {/* Browse by category */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/products/category/${c.slug}`}
                className="group border border-gray-200 hover:border-red-600 rounded-md p-5 transition-colors"
              >
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                  {c.name}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
