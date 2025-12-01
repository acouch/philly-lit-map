import { addBook } from './actions'
import BookForm from '@/components/book-form'

export default function AddBookPage() {
  return (
    <BookForm
      action={addBook}
      submitButtonText="Add Book"
      cancelHref="/books"
      title="Add New Book"
      description="Fill in the details to add a book to the collection"
    />
  )
}
