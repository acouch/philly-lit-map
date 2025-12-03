import prisma from '@/lib/prisma'
import BooksList from '@/components/books-list'

export const dynamic = 'force-dynamic'

export default async function BooksPage() {
  const startTime = Date.now()
  const books = await prisma.book.findMany({
    orderBy: {
      publishDate: 'desc',
    },
  })
  const duration = Date.now() - startTime

  return <BooksList books={books} duration={duration} />
}
