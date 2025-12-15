import prisma from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function QuotesPage() {
  const startTime = Date.now()
  const quotes = await prisma.quote.findMany({
    include: {
      books: true,
      user: true,
    },
    orderBy: {
      id: 'desc',
    },
  })
  const duration = Date.now() - startTime

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Quotes</h1>
          <p className="text-sm text-gray-500">
            Fetched {quotes.length} quotes in {duration}ms
          </p>
        </div>
        <Link
          href="/quotes/add"
          className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Add Quote
        </Link>
      </div>

      <ul className="space-y-6">
        {quotes.map((quote) => (
          <li key={quote.id}>
            <Link
              href={`/quote/${quote.id}`}
              className="block p-6 bg-white/50 rounded-lg ring-1 ring-gray-900/5 hover:bg-white/70 transition-colors"
            >
              {quote.title && (
                <h2 className="text-lg font-semibold mb-2">{quote.title}</h2>
              )}
              <blockquote className="text-gray-700 italic mb-3">
                {`"${quote.quote}"`}
              </blockquote>
              <div className="text-sm text-gray-600">
                <p>
                  From <span className="font-medium">{quote.books.title}</span>{' '}
                  by {quote.books.author}
                </p>
                <p>Page {quote.pageNumber}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {quotes.length === 0 && (
        <p className="text-center text-gray-500 py-8">No quotes found</p>
      )}
    </>
  )
}
