import { MetadataRoute } from 'next'
import { getAllBlogs } from '@/lib/blog'
import { locales } from '@/i18n/routing'

const BASE_URL = 'https://www.fasade.online'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

function buildAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [
        locale === 'en' ? 'x-default' : locale,
        locale === 'en' ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`,
      ])
    ) as Record<string, string>,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getAllBlogs()

  // ── Homepage ────────────────────────────────────
  const homeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: locale === 'en' ? 1 : 0.9,
    alternates: buildAlternates('/'),
  }))

  // ── Blog index ──────────────────────────────────
  const blogIndexEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: locale === 'en' ? `${BASE_URL}/blog` : `${BASE_URL}/${locale}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily' as ChangeFrequency,
    priority: locale === 'en' ? 0.9 : 0.8,
    alternates: buildAlternates('/blog'),
  }))

  // ── Blog posts ──────────────────────────────────
  const blogPostEntries: MetadataRoute.Sitemap = blogs.flatMap((blog) =>
    locales.map((locale) => ({
      url:
        locale === 'en'
          ? `${BASE_URL}/blog/${blog.slug}`
          : `${BASE_URL}/${locale}/blog/${blog.slug}`,
      lastModified: new Date(blog.lastUpdated),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: locale === 'en' ? 0.8 : 0.7,
      alternates: buildAlternates(`/blog/${blog.slug}`),
    }))
  )

  // ── Standalone SEO pages ────────────────────────
  const standalonePages = ['/skin-tracker', '/skincare-routine-timeline', '/ingredient-guide']
  const standaloneEntries: MetadataRoute.Sitemap = standalonePages.flatMap((path) =>
    locales.map((locale) => ({
      url: locale === 'en' ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: locale === 'en' ? 0.85 : 0.75,
      alternates: buildAlternates(path),
    }))
  )

  return [...homeEntries, ...blogIndexEntries, ...standaloneEntries, ...blogPostEntries]
}
