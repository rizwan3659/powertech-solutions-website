import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const totalLeads = await prisma.lead.count();
  const openTickets = await prisma.serviceTicket.count({
    where: { status: "Open" },
  });
  const activeAmcs = await prisma.aMCContract.count({
    where: { status: "Active" },
  });

  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-zinc-400 mt-1">Welcome to the PowerTech Admin Portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* KPI Cards */}
        <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6 flex flex-col">
          <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Total Leads</h2>
          <div className="text-4xl font-bold text-indigo-400">{totalLeads}</div>
          <Link href="/admin/leads" className="mt-auto pt-4 text-sm text-indigo-400 hover:text-indigo-300 font-medium">View all leads &rarr;</Link>
        </div>

        <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6 flex flex-col">
          <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Open Service Tickets</h2>
          <div className="text-4xl font-bold text-orange-400">{openTickets}</div>
          <div className="mt-auto pt-4 text-sm text-orange-400 hover:text-orange-300 font-medium cursor-pointer">Manage tickets &rarr;</div>
        </div>

        <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6 flex flex-col">
          <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Active AMC Contracts</h2>
          <div className="text-4xl font-bold text-emerald-400">{activeAmcs}</div>
          <div className="mt-auto pt-4 text-sm text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer">View contracts &rarr;</div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-800">
          <h3 className="text-lg font-medium text-zinc-100">Recent Leads</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-950/50 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 text-zinc-300">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-100">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 text-zinc-300">
                    {lead.mobile}
                  </td>
                  <td className="px-6 py-4 text-zinc-300">
                    {lead.enquiryType}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {lead.stage}
                    </span>
                  </td>
                </tr>
              ))}
              {recentLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    No recent leads found.
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
