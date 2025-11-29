import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BooksPage() {
  const startTime = Date.now()
  const books = await prisma.books.findMany({
    orderBy: {
      publish_date: 'desc',
    },
  })
  const duration = Date.now() - startTime

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold">Books</h1>
            <p className="text-sm text-gray-500">
              Fetched {books.length} books in {duration}ms
            </p>
          </div>
          <Link
            href="/books/add"
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Add Book
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="flex space-x-4 p-4 bg-white/50 rounded-lg ring-1 ring-gray-900/5 hover:bg-white/70 transition-colors"
            >
              <Image
                src={book.image_url}
                alt={book.title}
                width={80}
                height={120}
                className="rounded ring-1 ring-gray-900/5 object-cover"
              />
              <div className="flex-1 space-y-2">
                <h2 className="font-semibold text-lg leading-tight">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <p className="text-xs text-gray-500">
                  Published: {new Date(book.publish_date).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {books.length === 0 && (
          <p className="text-center text-gray-500 py-8">No books found</p>
        )}
      </div>
    </main>
  )
}
