import prisma from '@/lib/prisma'
import AllQuotesMap from '@/components/all-quotes-map'

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
    <main className="w-full min-h-screen">
      <AllQuotesMap quotes={quotes} />
    </main>
  )
}
