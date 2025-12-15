import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    const { user } = session
    return (
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          whatup {user.name}!
        </h1>
        <p>Time to get back to work</p>
      </div>
    )
  } else {
    return (
      <div>
        What are you doing here. You must be{' '}
        <Link href="/login">logged in!</Link>
      </div>
    )
  }
}
