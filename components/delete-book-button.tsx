'use client'

import { deleteBook } from '@/app/books/[id]/actions'
import { useState } from 'react'

export default function DeleteBookButton({ bookId }: { bookId: number }) {
  const [isConfirming, setIsConfirming] = useState(false)

  if (isConfirming) {
    return (
      <div className="flex space-x-2">
        <form action={deleteBook}>
          <input type="hidden" name="id" value={bookId} />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
          >
            Confirm Delete
          </button>
        </form>
        <button
          onClick={() => setIsConfirming(false)}
          className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
    >
      Delete Book
    </button>
  )
}
