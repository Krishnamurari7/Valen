import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Server-side Supabase client for metadata generation
const supabaseServer = createClient<Database>(supabaseUrl, supabaseAnonKey)

async function getProposal(slug: string) {
  const { data, error } = await supabaseServer
    .from('proposals')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const proposal = await getProposal(resolvedParams.slug)

  if (!proposal) {
    return {
      title: 'Proposal Not Found | Valentine All-in-One',
      description: 'This proposal page could not be found.',
    }
  }

  const baseUrl = 'https://dripxthing.in'
  const proposalUrl = `${baseUrl}/propose/${resolvedParams.slug}`
  const description = proposal.message || `${proposal.your_name} has something special to ask ${proposal.partner_name} on Valentine's Day. Will you be my Valentine?`

  return {
    title: `${proposal.your_name}'s Proposal to ${proposal.partner_name}`,
    description: description,
    keywords: [
      'valentine',
      'proposal',
      'love',
      'romantic',
      'valentine proposal',
      'will you be my valentine',
      proposal.your_name,
      proposal.partner_name,
    ],
    openGraph: {
      title: `${proposal.your_name}'s Proposal to ${proposal.partner_name}`,
      description: description,
      images: proposal.image_url 
        ? [
            {
              url: proposal.image_url,
              width: 1200,
              height: 630,
              alt: `Proposal from ${proposal.your_name} to ${proposal.partner_name}`,
            }
          ]
        : [
            {
              url: `${baseUrl}/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: 'Valentine Proposal',
            }
          ],
      type: 'website',
      url: proposalUrl,
      locale: 'en_US',
      siteName: 'Valentine All-in-One',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${proposal.your_name}'s Proposal to ${proposal.partner_name}`,
      description: description,
      images: proposal.image_url ? [proposal.image_url] : [`${baseUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: proposalUrl,
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
  }
}

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
