import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://motifax.netlify.app/', // Replace with your Netlify URL
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}