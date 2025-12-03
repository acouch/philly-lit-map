import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DeleteQuoteButton from '@/components/delete-quote-button'

export const dynamic = 'force-dynamic'

export default async function QuotePage({
  params,
}: {
  params: { id: string }
}) {
  const quote = await prisma.quote.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      books: true,
      user: true,
    },
  })

  if (!quote) {
    notFound()
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-3xl mx-auto w-full">
        <Link
          href="/quotes"
          className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back to Quotes
        </Link>

        <div className="mt-6 space-y-8">
          {quote.title && (
            <h1 className="text-3xl font-bold text-gray-900">{quote.title}</h1>
          )}

          <blockquote className="text-xl text-gray-700 italic border-l-4 border-gray-900 pl-6 py-2">
            {`"${quote.quote}"`}
          </blockquote>

          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">Page:</span>
              <span className="text-gray-600">{quote.pageNumber}</span>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-6 flex space-x-4">
            <Link
              href={`/quote/${quote.id}/edit`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Edit Quote
            </Link>
            <DeleteQuoteButton quoteId={quote.id} />
          </div>

          <div className="border-t border-gray-300 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              From the book:
            </h2>
            <Link
              href={`/books/${quote.books.id}`}
              className="flex space-x-4 p-4 bg-white/70 rounded-lg ring-1 ring-gray-900/5 hover:bg-white transition-colors"
            >
              <Image
                src={quote.books.imageUrl}
                alt={quote.books.title}
                width={80}
                height={120}
                className="rounded ring-1 ring-gray-900/5 object-cover"
              />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-lg leading-tight">
                  {quote.books.title}
                </h3>
                <p className="text-sm text-gray-600">by {quote.books.author}</p>
                <p className="text-xs text-gray-500">
                  Published:{' '}
                  {new Date(quote.books.publishDate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
