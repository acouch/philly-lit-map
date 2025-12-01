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

  return (
    <main className="w-full h-screen">
      <HomeMapWithSidebar quotes={quotes} />
    </main>
  )
}
