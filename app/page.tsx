import prisma from '@/lib/prisma'
import HomeMapWithSidebar from '@/components/home-map-with-sidebar'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const quotes = await prisma.quote.findMany({
    include: {
      books: true,
    },
    orderBy: {
      id: 'desc',
    },
  })

  const books = await prisma.book.findMany({
    orderBy: {
      title: 'asc',
    },
  })

  return (
    <main className="w-full h-screen">
      <HomeMapWithSidebar quotes={quotes} books={books} />
    </main>
  )
}
