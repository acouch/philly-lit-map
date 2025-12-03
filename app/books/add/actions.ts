'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addBook(formData: FormData) {
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const imageUrl = formData.get('imageUrl') as string
  const publishDate = formData.get('publishDate') as string

  await prisma.book.create({
    data: {
      title,
      author,
      imageUrl,
      publishDate: new Date(publishDate),
      userId: 1,
    },
  })

  revalidatePath('/books')
  redirect('/books')
}
