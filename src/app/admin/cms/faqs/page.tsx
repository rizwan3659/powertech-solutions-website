import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const dynamic = "force-dynamic";

export default async function FaqsPage() {
  const faqs = await prisma.cmsFaq.findMany({
    orderBy: { sortOrder: 'asc' }
  })

  async function createFaq(formData: FormData) {
    'use server'
    const question = formData.get('question') as string
    const answer = formData.get('answer') as string
    const category = formData.get('category') as string
    const sortOrder = parseInt(formData.get('sortOrder') as string) || 0

    if (!question || !answer || !category) return

    await prisma.cmsFaq.create({
      data: {
        question,
        answer,
        category,
        sortOrder,
      }
    })

    revalidatePath('/admin/cms/faqs')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">CMS - FAQs</h1>

      {/* Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Add FAQ</h2>
        <form action={createFaq} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">Question</label>
              <input name="question" required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">Answer</label>
              <textarea name="answer" required rows={3} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
              <input name="category" required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Sort Order</label>
              <input name="sortOrder" type="number" defaultValue={0} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
            Add FAQ
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-700">
                <th className="p-4 text-gray-300 font-medium">Question & Answer</th>
                <th className="p-4 text-gray-300 font-medium w-48">Category</th>
                <th className="p-4 text-gray-300 font-medium w-32">Sort Order</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="p-4 text-gray-100">
                    <div className="font-semibold text-lg">{faq.question}</div>
                    <div className="text-sm text-gray-400 mt-1 max-w-2xl">{faq.answer}</div>
                  </td>
                  <td className="p-4 text-gray-300">
                    <span className="bg-gray-700 px-2 py-1 rounded text-sm text-gray-200">
                      {faq.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 font-mono">
                    {faq.sortOrder}
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">No FAQs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
