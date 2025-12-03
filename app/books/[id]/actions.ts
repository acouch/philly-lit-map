'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateBook(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const imageUrl = formData.get('imageUrl') as string
  const publishDate = formData.get('publishDate') as string

  try {
    await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        imageUrl,
        publishDate: new Date(publishDate),
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
    await prisma.book.delete({
      where: { id: parseInt(id) },
    })
  } catch (error) {
    console.error('Failed to delete book:', error)
    throw new Error('Failed to delete book')
  }

  revalidatePath('/books')
  redirect('/books')
}
