import type { Metadata } from 'next'

const baseUrl = 'https://dripxthing.in'

export const metadata: Metadata = {
  title: 'Proposal Page Creator',
  description: 'Create a beautiful, shareable proposal page with a unique URL. Make the moment unforgettable! Choose from romantic, cute, or funny themes. Add photos and custom messages. Perfect for Valentine\'s Day proposals.',
  keywords: [
    'proposal page creator',
    'valentine proposal',
    'proposal website',
    'create proposal page',
    'romantic proposal',
    'love proposal',
    'valentine proposal page',
    'proposal generator',
    'online proposal',
    'proposal creator',
    'will you be my valentine',
  ],
  openGraph: {
    title: 'Proposal Page Creator | Create Beautiful Valentine Proposals',
    description: 'Create a beautiful, shareable proposal page with a unique URL. Make the moment unforgettable! Perfect for Valentine\'s Day.',
    url: `${baseUrl}/propose`,
    siteName: 'Valentine All-in-One',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Proposal Page Creator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proposal Page Creator | Create Beautiful Valentine Proposals',
    description: 'Create a beautiful, shareable proposal page with a unique URL. Make the moment unforgettable!',
    images: [`${baseUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/propose`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ProposeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
