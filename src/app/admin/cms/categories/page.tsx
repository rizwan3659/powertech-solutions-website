import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";

export const metadata = { title: "Categories | Admin Portal" };

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

export default async function CategoriesAdmin() {
  const categories = await prisma.productCategory.findMany({
    orderBy: [{ parentSlug: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });
  const mains = categories.filter((c) => !c.parentSlug);

  async function createCategory(formData: FormData) {
    "use server";
    const name = (formData.get("name") as string)?.trim();
    const parentSlug = (formData.get("parentSlug") as string)?.trim() || null;
    const description = (formData.get("description") as string)?.trim() || null;
    const imageUrl = (formData.get("imageUrl") as string)?.trim() || null;
    const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10) || 0;
    if (!name) return;
    const slug = slugify((formData.get("slug") as string)?.trim() || name);
    if (!slug) return;

    await prisma.productCategory.upsert({
      where: { slug },
      update: { name, parentSlug, description, imageUrl, sortOrder },
      create: { name, slug, parentSlug, description, imageUrl, sortOrder },
    });
    revalidatePath("/admin/cms/categories");
  }

  async function toggleCategory(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    await prisma.productCategory.update({ where: { id }, data: { isActive: !current } });
    revalidatePath("/admin/cms/categories");
  }

  async function deleteCategory(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.productCategory.delete({ where: { id } });
    revalidatePath("/admin/cms/categories");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-100">CMS — Categories</h1>
        <Link href="/admin/cms" className="text-sm text-indigo-400 hover:text-indigo-300">← Back to CMS</Link>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Add / Update Category</h2>
        <p className="text-xs text-gray-400 mb-4">
          Leave “Parent” empty for a main category. Select a parent to create a sub-category.
        </p>
        <form action={createCategory} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name *</label>
              <input name="name" required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100" placeholder="Batteries" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
              <input name="slug" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100" placeholder="auto from name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Parent (for sub-category)</label>
              <select name="parentSlug" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100">
                <option value="">— Main category —</option>
                {mains.map((m) => (
                  <option key={m.slug} value={m.slug}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea name="description" rows={2} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Sort Order</label>
              <input name="sortOrder" type="number" defaultValue={0} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Image</label>
              <ImageUploader name="imageUrl" />
            </div>
          </div>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Save Category</button>
        </form>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700">
              <th className="p-4 text-gray-300 font-medium">Image</th>
              <th className="p-4 text-gray-300 font-medium">Name</th>
              <th className="p-4 text-gray-300 font-medium">Type</th>
              <th className="p-4 text-gray-300 font-medium">Slug</th>
              <th className="p-4 text-gray-300 font-medium">Status</th>
              <th className="p-4 text-gray-300 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="p-4">
                  {c.imageUrl ? <img src={c.imageUrl} alt={c.name} className="w-10 h-10 object-contain bg-gray-900 rounded" /> : <div className="w-10 h-10 bg-gray-700 rounded" />}
                </td>
                <td className="p-4 text-gray-100 font-medium">{c.name}</td>
                <td className="p-4 text-gray-400 text-sm">{c.parentSlug ? `Sub of ${c.parentSlug}` : "Main"}</td>
                <td className="p-4 text-gray-400 text-sm">{c.slug}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${c.isActive ? "bg-green-900 text-green-300" : "bg-gray-700 text-gray-400"}`}>
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 text-right whitespace-nowrap">
                  <form action={toggleCategory} className="inline">
                    <input type="hidden" name="id" value={c.id} />
                    <input type="hidden" name="current" value={String(c.isActive)} />
                    <button className="text-xs text-yellow-400 hover:text-yellow-300 mr-4">{c.isActive ? "Disable" : "Enable"}</button>
                  </form>
                  <form action={deleteCategory} className="inline">
                    <input type="hidden" name="id" value={c.id} />
                    <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">No categories yet. Add one or import the catalog from the CMS hub.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
