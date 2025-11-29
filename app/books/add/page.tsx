import { addBook } from './actions'
import Link from 'next/link'

export default function AddBookPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-2xl mx-auto w-full">
        <div className="space-y-1 mb-6">
          <h1 className="text-3xl font-semibold">Add New Book</h1>
          <p className="text-sm text-gray-500">
            Fill in the details to add a book to the collection
          </p>
        </div>

        <form action={addBook} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Enter author name"
            />
          </div>

          <div>
            <label
              htmlFor="image_url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image URL
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>

          <div>
            <label
              htmlFor="publish_date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Publish Date
            </label>
            <input
              type="date"
              id="publish_date"
              name="publish_date"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Add Book
            </button>
            <Link
              href="/books"
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
