"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Banner = {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string | null;
};

// Client-side promotional banner strip shown at the very top of the site.
// Fetches active banners from the API so it never blocks static rendering of
// the pages it sits above. Dismissible per session.
export default function PromoBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/public/banners")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (active && Array.isArray(data)) setBanners(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (dismissed || banners.length === 0) return null;

  // Show the most recent active banner.
  const banner = banners[0];

  const content = (
    <div className="flex items-center justify-center gap-3 px-4 py-2 text-center">
      {banner.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={banner.imageUrl} alt="" className="h-6 w-auto object-contain" />
      )}
      <span className="text-xs md:text-sm font-medium tracking-wide">{banner.title}</span>
    </div>
  );

  return (
    <div className="relative bg-gray-900 text-white">
      {banner.linkUrl ? (
        <a href={banner.linkUrl} className="block hover:bg-gray-800 transition-colors">
          {content}
        </a>
      ) : (
        content
      )}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
      >
        <X size={16} />
      </button>
    </div>
  );
}
