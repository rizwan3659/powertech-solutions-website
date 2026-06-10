import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = { title: "CMS Pages | Admin Portal" };

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default async function CmsPagesAdmin() {
  const pages = await prisma.cmsPage.findMany({ orderBy: { updatedAt: "desc" } });

  async function createPage(formData: FormData) {
    "use server";
    const title = (formData.get("title") as string)?.trim();
    const rawSlug = (formData.get("slug") as string)?.trim();
    const body = (formData.get("body") as string) ?? "";
    const seoTitle = (formData.get("seoTitle") as string)?.trim() || null;
    const seoDesc = (formData.get("seoDesc") as string)?.trim() || null;

    if (!title) return;
    const slug = slugify(rawSlug || title);
    if (!slug) return;

    await prisma.cmsPage.upsert({
      where: { slug },
      update: { title, body, seoTitle, seoDesc },
      create: { slug, title, body, seoTitle, seoDesc },
    });
    revalidatePath("/admin/cms/pages");
    revalidatePath(`/${slug}`);
  }

  async function togglePublish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    const page = await prisma.cmsPage.update({
      where: { id },
      data: { isPublished: !current },
    });
    revalidatePath("/admin/cms/pages");
    revalidatePath(`/${page.slug}`);
  }

  async function deletePage(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const page = await prisma.cmsPage.delete({ where: { id } });
    revalidatePath("/admin/cms/pages");
    revalidatePath(`/${page.slug}`);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-100">CMS — Pages</h1>
        <Link href="/admin/cms" className="text-sm text-indigo-400 hover:text-indigo-300">
          ← Back to CMS
        </Link>
      </div>

      {/* Create / update form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Create / Update Page</h2>
        <p className="text-xs text-gray-400 mb-4">
          The page is published at <code className="text-indigo-300">/your-slug</code>. Body accepts HTML
          (e.g. &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;&lt;li&gt;, &lt;a&gt;). Saving an existing slug updates it.
        </p>
        <form action={createPage} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Title *</label>
              <input name="title" required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Warranty Policy" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Slug (URL)</label>
              <input name="slug" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="warranty-policy (auto from title if blank)" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Body (HTML)</label>
            <textarea name="body" rows={6} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="<h2>Section</h2><p>Content...</p>" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">SEO Title</label>
              <input name="seoTitle" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">SEO Description</label>
              <input name="seoDesc" className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors">
            Save Page
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700">
              <th className="p-4 text-gray-300 font-medium">Title</th>
              <th className="p-4 text-gray-300 font-medium">URL</th>
              <th className="p-4 text-gray-300 font-medium">Status</th>
              <th className="p-4 text-gray-300 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                <td className="p-4 text-gray-100 font-medium">{p.title}</td>
                <td className="p-4">
                  <a href={`/${p.slug}`} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                    /{p.slug}
                  </a>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${p.isPublished ? "bg-green-900 text-green-300" : "bg-gray-700 text-gray-400"}`}>
                    {p.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4 text-right whitespace-nowrap">
                  <form action={togglePublish} className="inline">
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="current" value={String(p.isPublished)} />
                    <button className="text-xs text-yellow-400 hover:text-yellow-300 mr-4">
                      {p.isPublished ? "Unpublish" : "Publish"}
                    </button>
                  </form>
                  <form action={deletePage} className="inline">
                    <input type="hidden" name="id" value={p.id} />
                    <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">No pages yet. Create one above.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
