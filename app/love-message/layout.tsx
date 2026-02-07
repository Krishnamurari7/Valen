import type { Metadata } from 'next'

const baseUrl = 'https://dripxthing.in'

export const metadata: Metadata = {
  title: 'Love Message Generator',
  description: 'Create the perfect romantic message in seconds. Generate personalized love messages with just a few clicks. Choose from romantic, cute, funny, or emotional moods. Free Valentine\'s Day message generator.',
  keywords: [
    'love message generator',
    'romantic message generator',
    'valentine message',
    'love message',
    'romantic message',
    'valentine card message',
    'love letter generator',
    'romantic text generator',
    'valentine\'s day message',
    'sweet message generator',
  ],
  openGraph: {
    title: 'Love Message Generator | Create Perfect Romantic Messages',
    description: 'Create the perfect romantic message in seconds. Generate personalized love messages with just a few clicks.',
    url: `${baseUrl}/love-message`,
    siteName: 'Valentine All-in-One',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Love Message Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Love Message Generator | Create Perfect Romantic Messages',
    description: 'Create the perfect romantic message in seconds. Generate personalized love messages with just a few clicks.',
    images: [`${baseUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/love-message`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LoveMessageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
