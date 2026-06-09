"use client";

import { useState } from "react";
import { Loader2, X, UploadCloud } from "lucide-react";

// Reusable admin image uploader. Uploads to Vercel Blob via /api/admin/upload
// and renders hidden inputs (name=`name`) holding the resulting URL(s), so it
// works inside a normal server-action <form>.
export default function ImageUploader({
  name,
  multiple = false,
  initial = [],
}: {
  name: string;
  multiple?: boolean;
  initial?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(initial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError("");
    setUploading(true);
    try {
      const list = multiple ? Array.from(files) : [files[0]];
      const uploaded: string[] = [];
      for (const file of list) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        uploaded.push(data.url);
      }
      setUrls((prev) => (multiple ? [...prev, ...uploaded] : uploaded));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }

  function remove(url: string) {
    setUrls((prev) => prev.filter((u) => u !== url));
  }

  return (
    <div>
      {/* Hidden inputs submitted with the form */}
      {urls.map((u) => (
        <input key={u} type="hidden" name={name} value={u} />
      ))}

      <label className="flex items-center gap-2 cursor-pointer text-sm bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded px-3 py-2 text-gray-200 w-fit">
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
        {uploading ? "Uploading…" : multiple ? "Upload images" : "Upload image"}
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading}
        />
      </label>

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {urls.map((u) => (
            <div key={u} className="relative w-16 h-16 rounded border border-gray-600 bg-gray-900 overflow-hidden">
              <img src={u} alt="" className="w-full h-full object-contain" />
              <button
                type="button"
                onClick={() => remove(u)}
                className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5 text-white hover:bg-red-600"
                aria-label="Remove"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
