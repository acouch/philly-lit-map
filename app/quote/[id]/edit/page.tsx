import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { updateQuote } from '../actions'
import QuoteForm from '@/components/quote-form'

export default async function EditQuotePage({
  params,
}: {
  params: { id: string }
}) {
  const quote = await prisma.quotes.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  const books = await prisma.books.findMany({
    orderBy: {
      title: 'asc',
    },
  })

  if (!quote) {
    notFound()
  }

  return (
    <QuoteForm
      action={updateQuote}
      quote={quote}
      books={books}
      submitButtonText="Update Quote"
      cancelHref={`/quote/${quote.id}`}
      title="Edit Quote"
      description="Update the quote information below"
    />
  )
}
