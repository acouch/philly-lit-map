import Link from 'next/link'

type Book = {
  id: number
  title: string
  author: string
}

type QuoteFormProps = {
  action: (formData: FormData) => Promise<void>
  quote?: {
    id: number
    title: string | null
    quote: string
    pageNumber: number | null
    bookId: number
    latitude: number | null
    longitude: number | null
  }
  books: Book[]
  submitButtonText: string
  cancelHref: string
  title: string
  description: string
}

export default function QuoteForm({
  action,
  quote,
  books,
  submitButtonText,
  cancelHref,
  title,
  description,
}: QuoteFormProps) {
  return (
    <>
      <div className="space-y-1 mb-6">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <form action={action} className="space-y-6">
        {quote && <input type="hidden" name="id" value={quote.id} />}

        <div>
          <label
            htmlFor="bookId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Book
          </label>
          <select
            id="bookId"
            name="bookId"
            required
            defaultValue={quote?.bookId}
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
            defaultValue={quote?.title || ''}
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
            defaultValue={quote?.quote}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            placeholder="Enter the quote text"
          />
        </div>

        <div>
          <label
            htmlFor="pageNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Page Number
          </label>
          <input
            type="number"
            id="pageNumber"
            name="pageNumber"
            required
            min="1"
            defaultValue={quote ? (quote.pageNumber ?? undefined) : undefined}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="Page number"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Latitude (Optional)
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              step="any"
              defaultValue={quote?.latitude || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="e.g., 39.9526"
            />
          </div>

          <div>
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Longitude (Optional)
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              step="any"
              defaultValue={quote?.longitude || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="e.g., -75.1652"
            />
          </div>
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
    </>
  )
}
