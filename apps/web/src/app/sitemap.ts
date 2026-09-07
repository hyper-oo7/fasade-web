import { MetadataRoute } from 'next'
import { getAllBlogs } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fasade.online'
  
  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Blog routes
  const blogs = getAllBlogs()
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.lastUpdated),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...blogRoutes]
}
