import Link from "next/link";
import { Package, FileText, Image as ImageIcon, HelpCircle, FolderTree, Tag } from "lucide-react";
import ImportCatalogButton from "@/components/admin/ImportCatalogButton";

const sections = [
  { href: "/admin/cms/categories", title: "Categories", desc: "Main & sub category management", icon: FolderTree },
  { href: "/admin/cms/brands", title: "Brands", desc: "Manage brands and logos", icon: Tag },
  { href: "/admin/cms/products", title: "Products", desc: "Manage products & multiple images", icon: Package },
  { href: "/admin/cms/pages", title: "Pages", desc: "Create & edit unlimited CMS pages", icon: FileText },
  { href: "/admin/cms/banners", title: "Banners & Ads", desc: "Manage promotional banners", icon: ImageIcon },
  { href: "/admin/cms/faqs", title: "FAQs", desc: "Manage frequently asked questions", icon: HelpCircle },
];

export const metadata = { title: "Content (CMS) | Admin Portal" };

export default function CmsHubPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2 text-gray-100">Content Management</h1>
      <p className="text-gray-400 mb-6 text-sm">Manage the public-facing content of your website.</p>

      <ImportCatalogButton />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group bg-gray-800 border border-gray-700 hover:border-indigo-500 rounded-lg p-6 transition-colors"
          >
            <s.icon className="w-8 h-8 text-indigo-400 mb-4" />
            <h2 className="text-lg font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors">
              {s.title}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
