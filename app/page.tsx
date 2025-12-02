import prisma from '@/lib/prisma'
import HomeMapWithSidebar from '@/components/home-map-with-sidebar'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const quotes = await prisma.quotes.findMany({
    include: {
      books: true,
    },
    orderBy: {
      id: 'desc',
    },
  })

  const books = await prisma.books.findMany({
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
