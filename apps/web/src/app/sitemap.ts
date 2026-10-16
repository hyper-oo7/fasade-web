import { MetadataRoute } from 'next'
import { getAllBlogs } from '@/lib/blog'

const BASE_URL = 'https://www.fasade.online'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getAllBlogs()

  // ── Homepage ────────────────────────────────────
  const homeEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 1.0,
    },
  ]

  // ── Blog index ──────────────────────────────────
  const blogIndexEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.9,
    },
  ]

  // ── Blog posts ──────────────────────────────────
  const blogPostEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.lastUpdated),
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: 0.8,
  }))

  // ── Standalone SEO pages ────────────────────────
  const standalonePages = [
    '/skin-tracker', 
    '/skincare-routine-timeline', 
    '/ingredient-guide',
    '/concerns/how-to-fade-dark-spots',
    '/concerns/how-to-clear-acne',
    '/compare/niacinamide-vs-vitamin-c',
    '/compare/retinol-vs-tretinoin'
  ]
  const standaloneEntries: MetadataRoute.Sitemap = standalonePages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.85,
  }))

  return [...homeEntries, ...blogIndexEntries, ...standaloneEntries, ...blogPostEntries]
}
