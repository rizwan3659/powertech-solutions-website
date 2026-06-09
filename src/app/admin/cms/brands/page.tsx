import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";

export const metadata = { title: "Brands | Admin Portal" };

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

export default async function BrandsAdmin() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });

  async function createBrand(formData: FormData) {
    "use server";
    const name = (formData.get("name") as string)?.trim();
    const logoUrl = (formData.get("logoUrl") as string)?.trim() || null;
    if (!name) return;
    const slug = slugify((formData.get("slug") as string)?.trim() || name);
    if (!slug) return;

    await prisma.brand.upsert({
      where: { slug },
      update: { name, logoUrl },
      create: { name, slug, logoUrl },
    });
    revalidatePath("/admin/cms/brands");
  }

  async function toggleBrand(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    await prisma.brand.update({ where: { id }, data: { isActive: !current } });
    revalidatePath("/admin/cms/brands");
  }

  async function deleteBrand(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.brand.delete({ where: { id } });
    revalidatePath("/admin/cms/brands");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-100">CMS — Brands</h1>
        <Link href="/admin/cms" className="text-sm text-indigo-400 hover:text-indigo-300">← Back to CMS</Link>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Add / Update Brand</h2>
        <form action={createBrand} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name *</label>
              <input name="name" required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100" placeholder="Amaron" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
              <input name="slug" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100" placeholder="auto from name" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Logo</label>
            <ImageUploader name="logoUrl" />
          </div>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Save Brand</button>
        </form>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700">
              <th className="p-4 text-gray-300 font-medium">Logo</th>
              <th className="p-4 text-gray-300 font-medium">Name</th>
              <th className="p-4 text-gray-300 font-medium">Slug</th>
              <th className="p-4 text-gray-300 font-medium">Status</th>
              <th className="p-4 text-gray-300 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="p-4">
                  {b.logoUrl ? <img src={b.logoUrl} alt={b.name} className="w-10 h-10 object-contain bg-gray-900 rounded" /> : <div className="w-10 h-10 bg-gray-700 rounded" />}
                </td>
                <td className="p-4 text-gray-100 font-medium">{b.name}</td>
                <td className="p-4 text-gray-400 text-sm">{b.slug}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${b.isActive ? "bg-green-900 text-green-300" : "bg-gray-700 text-gray-400"}`}>
                    {b.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 text-right whitespace-nowrap">
                  <form action={toggleBrand} className="inline">
                    <input type="hidden" name="id" value={b.id} />
                    <input type="hidden" name="current" value={String(b.isActive)} />
                    <button className="text-xs text-yellow-400 hover:text-yellow-300 mr-4">{b.isActive ? "Disable" : "Enable"}</button>
                  </form>
                  <form action={deleteBrand} className="inline">
                    <input type="hidden" name="id" value={b.id} />
                    <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No brands yet. Add one or import the catalog from the CMS hub.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
