import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = { title: "Banners & Ads | Admin Portal" };

function parseDate(v: FormDataEntryValue | null): Date | null {
  const s = (v as string)?.trim();
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

export default async function CmsBannersAdmin() {
  const banners = await prisma.cmsBanner.findMany({ orderBy: { id: "desc" } });

  async function createBanner(formData: FormData) {
    "use server";
    const title = (formData.get("title") as string)?.trim();
    const imageUrl = (formData.get("imageUrl") as string)?.trim();
    const linkUrl = (formData.get("linkUrl") as string)?.trim() || null;
    if (!title || !imageUrl) return;

    await prisma.cmsBanner.create({
      data: {
        title,
        imageUrl,
        linkUrl,
        startDate: parseDate(formData.get("startDate")),
        endDate: parseDate(formData.get("endDate")),
      },
    });
    revalidatePath("/admin/cms/banners");
  }

  async function toggleBanner(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    await prisma.cmsBanner.update({ where: { id }, data: { isActive: !current } });
    revalidatePath("/admin/cms/banners");
  }

  async function deleteBanner(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.cmsBanner.delete({ where: { id } });
    revalidatePath("/admin/cms/banners");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-100">CMS — Banners &amp; Ads</h1>
        <Link href="/admin/cms" className="text-sm text-indigo-400 hover:text-indigo-300">
          ← Back to CMS
        </Link>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Add Banner</h2>
        <p className="text-xs text-gray-400 mb-4">
          Active banners appear as a strip at the top of the site. Use the start/end dates to schedule a
          promotion (leave blank for always-on).
        </p>
        <form action={createBanner} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Title / Text *</label>
              <input name="title" required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Monsoon Offer — 10% off all UPS!" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Image URL *</label>
              <input name="imageUrl" required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="/products/logo.png or https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Link URL</label>
              <input name="linkUrl" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="/products" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Start</label>
                <input type="date" name="startDate" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">End</label>
                <input type="date" name="endDate" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors">
            Add Banner
          </button>
        </form>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700">
              <th className="p-4 text-gray-300 font-medium">Preview</th>
              <th className="p-4 text-gray-300 font-medium">Title</th>
              <th className="p-4 text-gray-300 font-medium">Schedule</th>
              <th className="p-4 text-gray-300 font-medium">Status</th>
              <th className="p-4 text-gray-300 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((b) => (
              <tr key={b.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                <td className="p-4">
                  {b.imageUrl ? (
                    <img src={b.imageUrl} alt={b.title} className="w-16 h-10 object-contain bg-gray-900 rounded" />
                  ) : (
                    <div className="w-16 h-10 bg-gray-700 rounded" />
                  )}
                </td>
                <td className="p-4 text-gray-100">{b.title}</td>
                <td className="p-4 text-gray-400 text-xs">
                  {b.startDate ? new Date(b.startDate).toLocaleDateString() : "—"} →{" "}
                  {b.endDate ? new Date(b.endDate).toLocaleDateString() : "—"}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${b.isActive ? "bg-green-900 text-green-300" : "bg-gray-700 text-gray-400"}`}>
                    {b.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 text-right whitespace-nowrap">
                  <form action={toggleBanner} className="inline">
                    <input type="hidden" name="id" value={b.id} />
                    <input type="hidden" name="current" value={String(b.isActive)} />
                    <button className="text-xs text-yellow-400 hover:text-yellow-300 mr-4">
                      {b.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </form>
                  <form action={deleteBanner} className="inline">
                    <input type="hidden" name="id" value={b.id} />
                    <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {banners.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No banners yet. Add one above.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
