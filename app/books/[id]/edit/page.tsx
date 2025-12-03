import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { updateBook } from '../actions'
import BookForm from '@/components/book-form'

export default async function EditBookPage({
  params,
}: {
  params: { id: string }
}) {
  const book = await prisma.book.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  if (!book) {
    notFound()
  }

  return (
    <BookForm
      action={updateBook}
      book={book}
      submitButtonText="Update Book"
      cancelHref={`/books/${book.id}`}
      title="Edit Book"
      description="Update the book information below"
    />
  )
}
