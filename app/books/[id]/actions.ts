'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateBook(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const image_url = formData.get('image_url') as string
  const publish_date = formData.get('publish_date') as string

  try {
    await prisma.books.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        image_url,
        publish_date: new Date(publish_date),
      },
    })
  } catch (error) {
    console.error('Failed to update book:', error)
    throw new Error('Failed to update book')
  }

  revalidatePath(`/books/${id}`)
  revalidatePath('/books')
  redirect(`/books/${id}`)
}

export async function deleteBook(formData: FormData) {
  const id = formData.get('id') as string

  try {
    await prisma.books.delete({
      where: { id: parseInt(id) },
    })
  } catch (error) {
    console.error('Failed to delete book:', error)
    throw new Error('Failed to delete book')
  }

  revalidatePath('/books')
  redirect('/books')
}
