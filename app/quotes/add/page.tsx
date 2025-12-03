import { addQuote } from './actions'
import prisma from '@/lib/prisma'
import QuoteFormWrapper from './quote-form-wrapper'

export default async function AddQuotePage({
  searchParams,
}: {
  searchParams: { bookId?: string }
}) {
  const books = await prisma.books.findMany({
    orderBy: {
      title: 'asc',
    },
  })

  const preselectedBookId = searchParams.bookId

  return (
    <QuoteFormWrapper
      action={addQuote}
      books={books}
      preselectedBookId={preselectedBookId}
    />
  )
}
