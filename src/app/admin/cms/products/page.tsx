import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import ImageUploader from "@/components/admin/ImageUploader"

export const metadata = { title: "Products | Admin Portal" }

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
}

export default async function ProductsAdmin() {
  const [products, categories, brands] = await Promise.all([
    prisma.cmsProduct.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.productCategory.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
    prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
  ])
  const mains = categories.filter((c) => !c.parentSlug)
  const subs = categories.filter((c) => c.parentSlug)

  async function createProduct(formData: FormData) {
    "use server"
    const name = (formData.get("name") as string)?.trim()
    const description = (formData.get("description") as string)?.trim()
    const category = (formData.get("category") as string)?.trim()
    if (!name || !description || !category) return

    const slug = slugify((formData.get("slug") as string)?.trim() || name)
    const subcategory = (formData.get("subcategory") as string)?.trim() || null
    const brand = (formData.get("brand") as string)?.trim() || null
    const isFeatured = formData.get("isFeatured") === "on"
    const images = (formData.getAll("images") as string[]).filter(Boolean)
    const imageUrl = ((formData.get("imageUrl") as string) || images[0] || "").trim() || null
    const features = ((formData.get("features") as string) || "")
      .split("\n").map((s) => s.trim()).filter(Boolean)

    await prisma.cmsProduct.upsert({
      where: { slug },
      update: { name, description, category, subcategory, brand, imageUrl, images, features, isFeatured },
      create: { name, slug, description, category, subcategory, brand, imageUrl, images, features, isFeatured },
    })
    revalidatePath("/admin/cms/products")
  }

  async function toggleProduct(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    const current = formData.get("current") === "true"
    await prisma.cmsProduct.update({ where: { id }, data: { isActive: !current } })
    revalidatePath("/admin/cms/products")
  }

  async function deleteProduct(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    await prisma.cmsProduct.delete({ where: { id } })
    revalidatePath("/admin/cms/products")
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-100">CMS — Products</h1>
        <Link href="/admin/cms" className="text-sm text-indigo-400 hover:text-indigo-300">← Back to CMS</Link>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Add / Update Product</h2>
        {(mains.length === 0 || brands.length === 0) && (
          <p className="text-xs text-yellow-400 mb-4">
            Tip: add Categories and Brands first (or run “Import catalog” from the CMS hub) so the dropdowns are populated.
          </p>
        )}
        <form action={createProduct} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name *</label>
              <input name="name" required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
              <input name="slug" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100" placeholder="auto from name; saving same slug updates" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Category *</label>
              <select name="category" required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100">
                <option value="">— Select —</option>
                {mains.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Sub-category</label>
              <select name="subcategory" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100">
                <option value="">— None —</option>
                {subs.map((c) => <option key={c.slug} value={c.slug}>{c.name} ({c.parentSlug})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Brand</label>
              <select name="brand" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100">
                <option value="">— None —</option>
                {brands.map((b) => <option key={b.slug} value={b.name}>{b.name}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" name="isFeatured" className="w-4 h-4" /> Featured product
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description *</label>
            <textarea name="description" required rows={3} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Features (one per line)</label>
            <textarea name="features" rows={3} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100" placeholder={"Pure sine wave output\nZero transfer time"} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Primary Image</label>
              <ImageUploader name="imageUrl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Gallery Images</label>
              <ImageUploader name="images" multiple />
            </div>
          </div>

          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Save Product</button>
        </form>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-700">
                <th className="p-4 text-gray-300 font-medium">Image</th>
                <th className="p-4 text-gray-300 font-medium">Name</th>
                <th className="p-4 text-gray-300 font-medium">Category</th>
                <th className="p-4 text-gray-300 font-medium">Brand</th>
                <th className="p-4 text-gray-300 font-medium">Status</th>
                <th className="p-4 text-gray-300 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-contain rounded bg-gray-900" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-500">No Img</div>
                    )}
                  </td>
                  <td className="p-4 text-gray-100">
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.slug}</div>
                  </td>
                  <td className="p-4 text-gray-300 text-sm">{product.category}{product.subcategory ? ` / ${product.subcategory}` : ""}</td>
                  <td className="p-4 text-gray-300 text-sm">{product.brand || "—"}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${product.isActive ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <form action={toggleProduct} className="inline">
                      <input type="hidden" name="id" value={product.id} />
                      <input type="hidden" name="current" value={String(product.isActive)} />
                      <button className="text-xs text-yellow-400 hover:text-yellow-300 mr-4">{product.isActive ? "Disable" : "Enable"}</button>
                    </form>
                    <form action={deleteProduct} className="inline">
                      <input type="hidden" name="id" value={product.id} />
                      <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500">No products yet. Add one above or import the catalog from the CMS hub.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
