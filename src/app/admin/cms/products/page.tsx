import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export default async function ProductsPage() {
  const products = await prisma.cmsProduct.findMany({
    orderBy: { createdAt: 'desc' }
  })

  async function createProduct(formData: FormData) {
    'use server'
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const imageUrl = formData.get('imageUrl') as string

    if (!name || !description || !category) return

    await prisma.cmsProduct.create({
      data: {
        name,
        description,
        category,
        imageUrl,
      }
    })

    revalidatePath('/admin/cms/products')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">CMS - Products</h1>

      {/* Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Create Product</h2>
        <form action={createProduct} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <input name="name" required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
              <input name="category" required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea name="description" required rows={3} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
            <input name="imageUrl" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
            Add Product
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-700">
                <th className="p-4 text-gray-300 font-medium whitespace-nowrap">Image</th>
                <th className="p-4 text-gray-300 font-medium">Name & Description</th>
                <th className="p-4 text-gray-300 font-medium">Category</th>
                <th className="p-4 text-gray-300 font-medium">Status</th>
                <th className="p-4 text-gray-300 font-medium">Date Added</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="p-4">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded bg-gray-800" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-500">No Img</div>
                    )}
                  </td>
                  <td className="p-4 text-gray-100">
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-xs text-gray-400 truncate max-w-xs">{product.description}</div>
                  </td>
                  <td className="p-4 text-gray-300">{product.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${product.isActive ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm whitespace-nowrap">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
