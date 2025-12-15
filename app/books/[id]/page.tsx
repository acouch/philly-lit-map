import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import QuotesMap from '@/components/quotes-map'
import DeleteBookButton from '@/components/delete-book-button'

export const dynamic = 'force-dynamic'

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await prisma.book.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      quotes: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  if (!book) {
    notFound()
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div>
        <Link
          href="/books"
          className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back to Books
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <Image
                src={book.imageUrl}
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
                    {new Date(book.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              <div className="pt-6 mt-6 flex space-x-4">
                <Link
                  href={`/books/${book.id}/edit`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Edit Book
                </Link>
                <DeleteBookButton bookId={book.id} />
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Quotes from this book
              </h2>
              <Link
                href={`/quotes/add?bookId=${book.id}`}
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
                      className="block p-4 hover:bg-white transition-colors"
                    >
                      {quote.title && (
                        <h3 className="font-semibold mb-2">{quote.title}</h3>
                      )}

                      <blockquote className="relative">
                        <svg
                          className="absolute -top-2 -start-6 w-16 h-16 text-gray-400 dark:text-neutral-700"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                            fill="currentColor"
                          />
                        </svg>

                        <div className="relative z-10 pl-12">{quote.quote}</div>
                      </blockquote>
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

        <div>
          <QuotesMap quotes={book.quotes || []} />
        </div>
      </div>
    </main>
  )
}
