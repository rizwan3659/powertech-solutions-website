"use client";

import { useState } from "react";
import { Loader2, DownloadCloud } from "lucide-react";

// Triggers the one-time import of the code catalog into the database.
export default function ImportCatalogButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function run() {
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/admin/import-catalog", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      const i = data.imported;
      setStatus("done");
      setMessage(`Imported ${i.categories} categories, ${i.subcategories} sub-categories, ${i.brands} brands, ${i.products} products.`);
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message);
    }
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 mb-8">
      <h2 className="text-sm font-semibold text-gray-200 mb-1">Import existing catalog</h2>
      <p className="text-xs text-gray-400 mb-3">
        Populate the database (categories, sub-categories, brands, products) from the built-in catalog so you can edit it here. Safe to run more than once.
      </p>
      <button
        onClick={run}
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-4 py-2 rounded text-sm"
      >
        {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4" />}
        {status === "loading" ? "Importing…" : "Import catalog"}
      </button>
      {message && (
        <p className={`text-xs mt-3 ${status === "error" ? "text-red-400" : "text-emerald-400"}`}>{message}</p>
      )}
    </div>
  );
}
