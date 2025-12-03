import Link from 'next/link'

type BookFormProps = {
  action: (formData: FormData) => Promise<void>
  book?: {
    id: number
    title: string
    author: string
    imageUrl: string
    publishDate: Date
  }
  submitButtonText: string
  cancelHref: string
  title: string
  description: string
}

export default function BookForm({
  action,
  book,
  submitButtonText,
  cancelHref,
  title,
  description,
}: BookFormProps) {
  const formattedDate = book
    ? new Date(book.publishDate).toISOString().split('T')[0]
    : ''

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-2xl mx-auto w-full">
        <div className="space-y-1 mb-6">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <form action={action} className="space-y-6">
          {book && <input type="hidden" name="id" value={book.id} />}

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
              defaultValue={book?.title}
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
              defaultValue={book?.author}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Enter author name"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              required
              defaultValue={book?.imageUrl}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>

          <div>
            <label
              htmlFor="publishDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Publish Date
            </label>
            <input
              type="date"
              id="publishDate"
              name="publishDate"
              required
              defaultValue={formattedDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              {submitButtonText}
            </button>
            <Link
              href={cancelHref}
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
