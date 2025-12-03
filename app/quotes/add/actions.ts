'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addQuote(formData: FormData) {
  const title = formData.get('title') as string
  const quote = formData.get('quote') as string
  const pageNumber = formData.get('pageNumber') as string
  const bookId = formData.get('bookId') as string
  const latitude = formData.get('latitude') as string
  const longitude = formData.get('longitude') as string
  const redirect_to_book = formData.get('redirect_to_book') as string
  try {
    await prisma.quotes.create({
      data: {
        title: title || null,
        quote,
        pageNumber: parseInt(pageNumber),
        bookId: parseInt(bookId),
        userId: 1,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
      },
    })
  } catch (error) {
    console.error('Failed to add quote:', error)
    throw new Error('Failed to add quote')
  }
  revalidatePath('/quotes')
  revalidatePath(`/books/${bookId}`)

  if (redirect_to_book === 'true') {
    redirect(`/books/${bookId}`)
  } else {
    redirect('/quotes')
  }
}
