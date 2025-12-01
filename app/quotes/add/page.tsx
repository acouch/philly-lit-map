import { addQuote } from './actions'
import Link from 'next/link'
import prisma from '@/lib/prisma'

export default async function AddQuotePage() {
  const books = await prisma.books.findMany({
    orderBy: {
      title: 'asc',
    },
  })

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-2xl mx-auto w-full">
        <div className="space-y-1 mb-6">
          <h1 className="text-3xl font-semibold">Add New Quote</h1>
          <p className="text-sm text-gray-500">
            Add a quote from a book to your collection
          </p>
        </div>

        <form action={addQuote} className="space-y-6">
          <div>
            <label
              htmlFor="book_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Book
            </label>
            <select
              id="book_id"
              name="book_id"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="">Select a book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title (Optional)
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Optional title for this quote"
            />
          </div>

          <div>
            <label
              htmlFor="quote"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quote
            </label>
            <textarea
              id="quote"
              name="quote"
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              placeholder="Enter the quote text"
            />
          </div>

          <div>
            <label
              htmlFor="page_number"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Page Number
            </label>
            <input
              type="number"
              id="page_number"
              name="page_number"
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Page number"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Add Quote
            </button>
            <Link
              href="/quotes"
              className="flex-1 bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-center border border-gray-300"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
