'use client'
import { authClient } from '@/lib/auth-client' // import the auth client

export default function ClientAuthWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    //    refetch, //refetch the session
  } = authClient.useSession()

  return (
    <>
      wrapped: {session} {isPending} {error}
      {children}
    </>
  )
}
