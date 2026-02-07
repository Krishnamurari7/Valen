import { MetadataRoute } from 'next'

const baseUrl = 'https://dripxthing.in'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Valentine All-in-One',
    short_name: 'Valentine',
    description: 'Create romantic messages, proposal pages, and calculate love compatibility. Free Valentine\'s Day tools for couples.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#E63946',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['entertainment', 'lifestyle', 'romance'],
    lang: 'en',
    dir: 'ltr',
  }
}
