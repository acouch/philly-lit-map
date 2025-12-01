import { addQuote } from './actions'
import prisma from '@/lib/prisma'
import QuoteFormWrapper from './quote-form-wrapper'

export default async function AddQuotePage({
  searchParams,
}: {
  searchParams: { book_id?: string }
}) {
  const books = await prisma.books.findMany({
    orderBy: {
      title: 'asc',
    },
  })

  const preselectedBookId = searchParams.book_id

  return (
    <QuoteFormWrapper
      action={addQuote}
      books={books}
      preselectedBookId={preselectedBookId}
    />
  )
}
