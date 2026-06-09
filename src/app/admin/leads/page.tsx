import { prisma } from "@/lib/prisma";
import AddLeadForm from "./AddLeadForm";

export default async function LeadsManagementPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lead Management</h1>
          <p className="text-gray-500 mt-1">View and manage customer inquiries and leads.</p>
        </div>
        <AddLeadForm />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Name / Company</th>
                <th className="px-6 py-4 font-medium">Contact Info</th>
                <th className="px-6 py-4 font-medium">Enquiry Type</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {leads.map((lead) => {
                let priorityColors = "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
                if (lead.priority === "Hot") priorityColors = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
                if (lead.priority === "Warm") priorityColors = "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
                if (lead.priority === "Cold") priorityColors = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

                return (
                  <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">{lead.name}</div>
                      {lead.company && <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{lead.company}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900 dark:text-gray-200">{lead.mobile}</div>
                      {lead.email && <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{lead.email}</div>}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {lead.enquiryType}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {lead.leadSource}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${priorityColors}`}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                        {lead.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p>No leads found.</p>
                      <p className="text-sm mt-1">Use the “Add New Lead” button above to get started.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
