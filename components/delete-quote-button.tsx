'use client'

import { deleteQuote } from '@/app/quote/[id]/actions'
import { useState } from 'react'

export default function DeleteQuoteButton({ quoteId }: { quoteId: number }) {
  const [isConfirming, setIsConfirming] = useState(false)

  if (isConfirming) {
    return (
      <div className="flex space-x-2">
        <form action={deleteQuote}>
          <input type="hidden" name="id" value={quoteId} />
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
      Delete Quote
    </button>
  )
}
