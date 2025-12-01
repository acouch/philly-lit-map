'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateQuote(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const quote = formData.get('quote') as string
  const page_number = formData.get('page_number') as string
  const book_id = formData.get('book_id') as string
  const latitude = formData.get('latitude') as string
  const longitude = formData.get('longitude') as string

  try {
    await prisma.quotes.update({
      where: { id: parseInt(id) },
      data: {
        title: title || null,
        quote,
        page_number: parseInt(page_number),
        book_id: parseInt(book_id),
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
  revalidatePath(`/books/${book_id}`)
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
