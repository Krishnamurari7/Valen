import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function generateSlug(yourName: string, partnerName: string): string {
  const sanitize = (str: string) => 
    str.toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 20)
  
  const slug = `${sanitize(yourName)}-for-${sanitize(partnerName)}`
  const uniqueId = Date.now().toString(36).slice(-4)
  
  return `${slug}-${uniqueId}`
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

export async function shareContent(data: ShareData): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share(data)
      return true
    } catch (err) {
      // User cancelled or error
      return false
    }
  }
  return false
}

export function getWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function getTwitterShareUrl(text: string, url?: string): string {
  let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  if (url) tweetUrl += `&url=${encodeURIComponent(url)}`
  return tweetUrl
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const themeGradients = {
  romantic: 'from-rose-500 via-pink-500 to-red-500',
  cute: 'from-pink-300 via-rose-300 to-fuchsia-300',
  funny: 'from-amber-400 via-orange-400 to-pink-400'
} as const

export const themeBgColors = {
  romantic: 'bg-rose-50',
  cute: 'bg-pink-50',
  funny: 'bg-amber-50'
} as const
