'use client'

import QuoteForm from '@/components/quote-form'

type Book = {
  id: number
  title: string
  author: string
}

type QuoteFormWrapperProps = {
  action: (formData: FormData) => Promise<void>
  books: Book[]
  preselectedBookId?: string
}

export default function QuoteFormWrapper({
  action,
  books,
  preselectedBookId,
}: QuoteFormWrapperProps) {
  const wrappedAction = async (formData: FormData) => {
    if (preselectedBookId) {
      formData.append('redirect_to_book', 'true')
    }
    return action(formData)
  }

  const quote = preselectedBookId
    ? {
        id: 0,
        title: null,
        quote: '',
        page_number: 1,
        book_id: parseInt(preselectedBookId),
        latitude: null,
        longitude: null,
      }
    : undefined

  return (
    <QuoteForm
      action={wrappedAction}
      quote={quote}
      books={books}
      submitButtonText="Add Quote"
      cancelHref={preselectedBookId ? `/books/${preselectedBookId}` : '/quotes'}
      title="Add New Quote"
      description="Add a quote from a book to your collection"
    />
  )
}
