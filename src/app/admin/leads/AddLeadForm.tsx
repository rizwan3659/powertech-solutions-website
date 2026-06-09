"use client";

import { useState } from "react";
import { addLead } from "./actions";

const INPUT =
  "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white";
const LABEL = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function AddLeadForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError("");
    setSaving(true);
    try {
      await addLead(formData);
      setIsOpen(false);
    } catch (e: any) {
      setError(e?.message || "Failed to add lead");
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
      >
        Add New Lead
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Lead</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <form action={handleSubmit} className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>Name *</label>
              <input type="text" name="name" required className={INPUT} placeholder="Customer name" />
            </div>
            <div>
              <label className={LABEL}>Company</label>
              <input type="text" name="company" className={INPUT} placeholder="Company name" />
            </div>
            <div>
              <label className={LABEL}>Mobile *</label>
              <input type="tel" name="mobile" required className={INPUT} placeholder="Phone number" />
            </div>
            <div>
              <label className={LABEL}>Email</label>
              <input type="email" name="email" className={INPUT} placeholder="email@example.com" />
            </div>
            <div>
              <label className={LABEL}>City</label>
              <input type="text" name="city" className={INPUT} placeholder="City" />
            </div>
            <div>
              <label className={LABEL}>Enquiry Type</label>
              <select name="enquiryType" className={INPUT} defaultValue="UPS">
                <option>UPS</option>
                <option>Battery</option>
                <option>Voltage Stabilizer</option>
                <option>Power Backup</option>
                <option>AMC</option>
                <option>Service</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={LABEL}>Lead Source</label>
              <select name="leadSource" className={INPUT} defaultValue="Website">
                <option>Website</option>
                <option>IndiaMART</option>
                <option>Referral</option>
                <option>Phone</option>
                <option>Walk-in</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={LABEL}>Priority</label>
              <select name="priority" className={INPUT} defaultValue="Warm">
                <option>Hot</option>
                <option>Warm</option>
                <option>Cold</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={LABEL}>Message / Notes</label>
              <textarea name="message" rows={3} className={INPUT} placeholder="Enquiry details..." />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:bg-blue-600/50"
            >
              {saving ? "Saving..." : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
