'use client'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import Loading from './loading'
import Alert from './alert'
import { useRouter } from 'next/navigation'

export default function SignupForm() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  // const [imageUrl, setImageUrl] = useState<string>("");
  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const {
    data: session,
    isPending, //loading state
    //  error: sessionError,
    //    refetch, //refetch the session
  } = authClient.useSession()

  const cancelHandler = () => {
    setEmail('')
    setName('')
    setPassword('')
    setError('')
  }

  const submitHandler = async () => {
    await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        //   image, // User image URL (optional)
        callbackURL: '/dashboard', // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          router.push('/dashboard')
        },
        onError: (ctx) => {
          setLoading(false)
          setError(ctx.error.message)
        },
      }
    )
  }
  if (session) {
    router.push('/dashboard')
  }
  if (isPending) {
    return (
      <div className="p-8 flex justify-center">
        <Loading color="black" size="16" text="" />
      </div>
    )
  }
  return (
    <div className="space-y-6">
      {error && <Alert text={error} />}
      <p className="text-sm text-gray-500">
        Welcome to Philly Lit Map! Create a user below to start adding books and
        quotes to the site!
      </p>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="My name is..."
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="myname@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="12345 or whatever you use for your luggage"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          disabled={loading}
          onClick={submitHandler}
          type="submit"
          className="flex-1 inline-flex justify-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          {loading ? <Loading text="Loading..." size="4" /> : 'Submit'}
        </button>
        <button
          onClick={cancelHandler}
          className="flex-1 bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-center border border-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
