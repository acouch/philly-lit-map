import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-md mx-auto w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Book Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The book you're looking for doesn't exist.
        </p>
        <Link
          href="/books"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Back to Books
        </Link>
      </div>
    </main>
  )
}
