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
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-4xl mx-auto w-full">
        <BookForm
          action={updateBook}
          book={book}
          submitButtonText="Update Book"
          cancelHref={`/books/${book.id}`}
          title="Edit Book"
          description="Update the book information below"
        />
      </div>
    </main>
  )
}
