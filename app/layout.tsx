import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingHearts from '@/components/FloatingHearts'
import { cookies } from 'next/headers'
import { Toaster } from '@/components/Toaster'

const baseUrl = 'https://dripxthing.in'
const siteName = 'Valentine All-in-One'
const defaultDescription = 'Create romantic messages, proposal pages, and calculate love compatibility. Free Valentine\'s Day tools for couples. Express your love with personalized messages, stunning proposals, and discover your compatibility score.'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Valentine All-in-One | Love Messages, Proposals & Compatibility Calculator',
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    'valentine',
    'valentine\'s day',
    'love message generator',
    'romantic message',
    'proposal page',
    'proposal creator',
    'love proposal',
    'compatibility calculator',
    'love compatibility test',
    'romantic',
    'couples',
    'valentine proposal',
    'love message',
    'romantic message generator',
    'free valentine tools',
    'valentine\'s day 2026',
    'proposal website',
    'love test',
    'relationship compatibility',
    'valentine gift ideas',
  ],
  authors: [{ name: 'Valentine All-in-One' }],
  creator: 'Valentine All-in-One',
  publisher: 'Valentine All-in-One',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: siteName,
    title: 'Valentine All-in-One | Love Messages, Proposals & Compatibility',
    description: defaultDescription,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Valentine All-in-One - Express your love with personalized messages, proposals, and compatibility tests',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valentine All-in-One | Love Messages, Proposals & Compatibility',
    description: defaultDescription,
    images: [`${baseUrl}/og-image.jpg`],
    creator: '@valentineallinone',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'en-US': baseUrl,
      'hi-IN': `${baseUrl}/hi`,
    },
  },
  category: 'Romance',
  classification: 'Entertainment',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': siteName,
    'mobile-web-app-capable': 'yes',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  
  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteName,
    url: baseUrl,
    description: defaultDescription,
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Love Message Generator',
      'Proposal Page Creator',
      'Love Compatibility Calculator',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1000',
    },
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [],
  }

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
  
  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <FloatingHearts />
        <Navbar />
        <main className="flex-grow pt-36 sm:pt-40 md:pt-44 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
