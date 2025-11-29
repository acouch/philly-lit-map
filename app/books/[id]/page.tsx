import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function BookPage({
  params,
}: {
  params: { id: string }
}) {
  const book = await prisma.books.findUnique({
    where: {
      id: parseInt(params.id),
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
      </div>
    </main>
  )
}
