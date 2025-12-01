import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'

export const metadata = {
  metadataBase: new URL('https://postgres-prisma.vercel.app'),
  title: 'Philly Lit Map',
  description: 'A literay map of philadelphia',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Header />
        {children}
      </body>
    </html>
  )
}
