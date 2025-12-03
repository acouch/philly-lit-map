'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateQuote(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const quote = formData.get('quote') as string
  const pageNumber = formData.get('pageNumber') as string
  const bookId = formData.get('bookId') as string
  const latitude = formData.get('latitude') as string
  const longitude = formData.get('longitude') as string

  try {
    await prisma.quote.update({
      where: { id: parseInt(id) },
      data: {
        title: title || null,
        quote,
        pageNumber: parseInt(pageNumber),
        bookId: parseInt(bookId),
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
      },
    })
  } catch (error) {
    console.error('Failed to update quote:', error)
    throw new Error('Failed to update quote')
  }

  revalidatePath(`/quote/${id}`)
  revalidatePath('/quotes')
  revalidatePath(`/books/${bookId}`)
  redirect(`/quote/${id}`)
}

export async function deleteQuote(formData: FormData) {
  const id = formData.get('id') as string

  try {
    await prisma.quotes.delete({
      where: { id: parseInt(id) },
    })
  } catch (error) {
    console.error('Failed to delete quote:', error)
    throw new Error('Failed to delete quote')
  }

  revalidatePath('/quotes')
  redirect('/quotes')
}
