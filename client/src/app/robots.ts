import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const crawable: MetadataRoute.Robots = {
    rules: {
      userAgent: '*',
      allow: '*',
    },
    sitemap: process.env.URL + '/sitemap.xml',
  }

  const notCrawable: MetadataRoute.Robots = {
    rules: {
      userAgent: '*',
      disallow: '*',
    },
  }

  return process.env.ENVIRONMENT === 'production' ? crawable : notCrawable
}
