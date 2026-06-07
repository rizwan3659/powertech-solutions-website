import { prisma } from "@/lib/prisma";

export default async function AccountsFinanceDashboard() {
  // Fetch KPIs
  const [customerInvoicesUnpaid, vendorInvoicesPending] = await Promise.all([
    prisma.customerInvoice.aggregate({
      _sum: { amount: true },
      where: { status: "Unpaid" },
    }),
    prisma.vendorInvoice.aggregate({
      _sum: { amount: true },
      where: { status: "Pending" },
    })
  ]);

  const totalPendingReceivables = customerInvoicesUnpaid._sum.amount || 0;
  const totalVendorOutstanding = vendorInvoicesPending._sum.amount || 0;

  // Fetch Recent Invoices
  const [recentCustomerInvoices, recentVendorInvoices] = await Promise.all([
    prisma.customerInvoice.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { customer: true },
    }),
    prisma.vendorInvoice.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { vendor: true },
    })
  ]);

  // Helper for currency
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-white">Finance Dashboard</h1>
          <p className="text-gray-400 mt-2">Overview of accounts and billing</p>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm hover:border-blue-500/50 transition-colors">
            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Pending Receivables</h2>
            <div className="text-4xl font-bold text-blue-400">
              {formatCurrency(totalPendingReceivables)}
            </div>
            <p className="text-xs text-gray-500 mt-2">From unpaid customer invoices</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm hover:border-red-500/50 transition-colors">
            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Vendor Outstanding</h2>
            <div className="text-4xl font-bold text-red-400">
              {formatCurrency(totalVendorOutstanding)}
            </div>
            <p className="text-xs text-gray-500 mt-2">From pending vendor invoices</p>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Customer Invoices */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Recent Customer Invoices</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-800/50 text-gray-400">
                  <tr>
                    <th className="px-6 py-3 font-medium">Invoice #</th>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium text-right">Amount</th>
                    <th className="px-6 py-3 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {recentCustomerInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No recent customer invoices found.</td>
                    </tr>
                  ) : (
                    recentCustomerInvoices.map(invoice => (
                      <tr key={invoice.id} className="hover:bg-gray-800/20 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-200">{invoice.invoiceNumber}</td>
                        <td className="px-6 py-4">{invoice.customer?.name || 'N/A'}</td>
                        <td className="px-6 py-4">{new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</td>
                        <td className="px-6 py-4 text-right font-medium">{formatCurrency(invoice.amount)}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${invoice.status === 'Paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                            {invoice.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vendor Invoices */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Recent Vendor Invoices</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-800/50 text-gray-400">
                  <tr>
                    <th className="px-6 py-3 font-medium">Invoice #</th>
                    <th className="px-6 py-3 font-medium">Vendor</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium text-right">Amount</th>
                    <th className="px-6 py-3 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {recentVendorInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No recent vendor invoices found.</td>
                    </tr>
                  ) : (
                    recentVendorInvoices.map(invoice => (
                      <tr key={invoice.id} className="hover:bg-gray-800/20 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-200">{invoice.invoiceNumber}</td>
                        <td className="px-6 py-4">{invoice.vendor?.name || 'N/A'}</td>
                        <td className="px-6 py-4">{new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</td>
                        <td className="px-6 py-4 text-right font-medium">{formatCurrency(invoice.amount)}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${invoice.status === 'Paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                            {invoice.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
