import prisma from '@/lib/prisma'
import BooksList from '@/components/books-list'

export const dynamic = 'force-dynamic'

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    orderBy: {
      publishDate: 'desc',
    },
  })

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-4xl mx-auto w-full">
        <BooksList books={books} />
      </div>
    </main>
  )
}
