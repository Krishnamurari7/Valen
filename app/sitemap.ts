import { MetadataRoute } from 'next'

const baseUrl = 'https://dripxthing.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/love-message',
    '/propose',
    '/compatibility',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
