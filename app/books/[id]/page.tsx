import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await prisma.books.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      quotes: {
        orderBy: {
          page_number: 'asc',
        },
      },
    },
  })

  if (!book) {
    notFound()
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-3xl mx-auto w-full">
        <Link
          href="/books"
          className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back to Books
        </Link>

        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <div className="flex-shrink-0">
            <Image
              src={book.image_url}
              alt={book.title}
              width={240}
              height={360}
              className="rounded-lg ring-1 ring-gray-900/5 object-cover shadow-lg"
            />
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600">by {book.author}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  Published:
                </span>
                <span className="text-sm text-gray-600">
                  {new Date(book.publish_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  Book ID:
                </span>
                <span className="text-sm text-gray-600">{book.id}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Quotes from this book
            </h2>
            <Link
              href={`/quotes/add?book_id=${book.id}`}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
            >
              Add Quote
            </Link>
          </div>
          {book.quotes && book.quotes.length > 0 && (
            <ul className="space-y-4">
              {book.quotes.map((quote) => (
                <li key={quote.id}>
                  <Link
                    href={`/quote/${quote.id}`}
                    className="block p-4 bg-white/70 rounded-lg ring-1 ring-gray-900/5 hover:bg-white transition-colors"
                  >
                    {quote.title && (
                      <h3 className="font-semibold mb-2">{quote.title}</h3>
                    )}
                    <blockquote className="text-gray-700 italic text-sm mb-2">
                      {`"${quote.quote}"`}
                    </blockquote>
                    <p className="text-xs text-gray-500">
                      Page {quote.page_number}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {(!book.quotes || book.quotes.length === 0) && (
            <p className="text-center text-gray-500 py-8">
              No quotes yet. Be the first to add one!
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
