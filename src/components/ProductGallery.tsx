"use client";

import { useState } from "react";

// Product image gallery: a large main image with selectable thumbnails.
// Falls back to a single image when only one is provided.
export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const valid = images.filter(Boolean);
  const [active, setActive] = useState(valid[0] || "");

  if (valid.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-100 rounded-lg aspect-square flex items-center justify-center p-8">
        <img
          src="https://placehold.co/600?text=No+Image"
          alt={alt}
          className="object-contain w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="sticky top-24">
      <div className="bg-gray-50 border border-gray-100 rounded-lg aspect-square flex items-center justify-center p-8">
        <img src={active} alt={alt} className="object-contain w-full h-full mix-blend-multiply" />
      </div>

      {valid.length > 1 && (
        <div className="flex gap-2 mt-3">
          {valid.map((img) => (
            <button
              key={img}
              onClick={() => setActive(img)}
              className={`w-16 h-16 rounded-md border bg-gray-50 flex items-center justify-center p-1.5 transition-colors ${
                active === img ? "border-red-600" : "border-gray-200 hover:border-gray-400"
              }`}
              aria-label="View image"
            >
              <img src={img} alt={alt} className="object-contain w-full h-full mix-blend-multiply" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
