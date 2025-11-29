'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addBook(formData: FormData) {
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const image_url = formData.get('image_url') as string
  const publish_date = formData.get('publish_date') as string

  await prisma.books.create({
    data: {
      title,
      author,
      image_url,
      publish_date: new Date(publish_date),
    },
  })

  revalidatePath('/books')
  redirect('/books')
}
