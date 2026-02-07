import type { Metadata } from 'next'

const baseUrl = 'https://dripxthing.in'

export const metadata: Metadata = {
  title: 'Love Compatibility Calculator',
  description: 'Discover your compatibility percentage! Enter your names and optional birthdates for a fun calculation. Download and share your compatibility results. Free love compatibility test for couples.',
  keywords: [
    'love compatibility calculator',
    'compatibility test',
    'relationship compatibility',
    'love test',
    'couple compatibility',
    'compatibility percentage',
    'valentine compatibility',
    'love match calculator',
    'compatibility checker',
    'relationship test',
  ],
  openGraph: {
    title: 'Love Compatibility Calculator | Test Your Relationship Compatibility',
    description: 'Discover your compatibility percentage! Enter your names and optional birthdates for a fun calculation. Download and share your results.',
    url: `${baseUrl}/compatibility`,
    siteName: 'Valentine All-in-One',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Love Compatibility Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Love Compatibility Calculator | Test Your Relationship Compatibility',
    description: 'Discover your compatibility percentage! Enter your names and optional birthdates for a fun calculation.',
    images: [`${baseUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/compatibility`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CompatibilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
