import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingHearts from '@/components/FloatingHearts'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Valentine All-in-One | Love Messages, Proposals & Compatibility',
  description: 'Create romantic messages, proposal pages, and calculate love compatibility. Free Valentine\'s Day tools for couples.',
  keywords: 'valentine, love message, proposal, compatibility calculator, romantic, couples',
  openGraph: {
    title: 'Valentine All-in-One Platform',
    description: 'Express your love with personalized messages and proposals',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valentine All-in-One Platform',
    description: 'Express your love with personalized messages and proposals',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  
  return (
    <html lang={locale}>
      <body className="antialiased min-h-screen flex flex-col">
        <FloatingHearts />
        <Navbar />
        <main className="flex-grow pt-16 md:pt-20 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
