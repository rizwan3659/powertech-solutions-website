import { prisma } from "@/lib/prisma";
import AddVendorForm from "./AddVendorForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vendors | Admin Portal",
};

export default async function VendorsPage() {
  const vendors = await prisma.vendor.findMany({
    include: {
      invoices: true,
      payments: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vendor Management</h1>
          <p className="text-gray-500 mt-1">View and manage vendors, invoices, and payments.</p>
        </div>
        <AddVendorForm />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Name</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Contact</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">GST</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Outstanding Balance</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {vendors.map((vendor) => {
                const totalInvoiced = vendor.invoices.reduce((sum, inv) => sum + inv.amount, 0);
                const totalPaid = vendor.payments.reduce((sum, pay) => sum + pay.amount, 0);
                const outstanding = totalInvoiced - totalPaid;

                return (
                  <tr key={vendor.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">{vendor.name}</div>
                      {vendor.contactPerson && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{vendor.contactPerson}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900 dark:text-gray-200">{vendor.mobile}</div>
                      {vendor.email && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{vendor.email}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {vendor.gst || <span className="text-gray-400 italic">Not Provided</span>}
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      <span className={outstanding > 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}>
                        ₹{outstanding.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        vendor.status === 'Active' 
                          ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' 
                          : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                      }`}>
                        {vendor.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {vendors.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p>No vendors found.</p>
                      <p className="text-sm mt-1">Add your first vendor to get started.</p>
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
