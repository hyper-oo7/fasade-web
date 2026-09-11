import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getBlogBySlug, getAllBlogs } from '@/lib/blog'

export async function generateStaticParams() {
  const blogs = getAllBlogs()
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug)
  
  if (!blog) return {}
  
  return {
    title: `${blog.title} | Fasade`,
    description: blog.excerpt,
    authors: [{ name: 'Raman Kumar Jha', url: 'https://www.fasade.online' }],
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.datePublished || blog.lastUpdated,
      modifiedTime: blog.lastUpdated,
      authors: ['Raman Kumar Jha'],
      images: blog.coverImage ? [{ url: blog.coverImage, width: 1200, height: 630, alt: blog.altText || blog.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@FasadeApp',
      creator: '@FasadeApp',
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug)

  if (!blog) {
    notFound()
  }

  // Get related blogs (same category, excluding current)
  const allBlogs = getAllBlogs()
  const relatedBlogs = allBlogs
    .filter(b => b.category === blog.category && b.slug !== blog.slug)
    .slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.fasade.online/blog/${blog.slug}`
        },
        "headline": blog.title,
        "description": blog.excerpt,
        "image": blog.coverImage ? [{ "@type": "ImageObject", "url": blog.coverImage, "width": 1200, "height": 630 }] : [],
        "datePublished": blog.datePublished || blog.lastUpdated,
        "dateModified": blog.lastUpdated,
        "author": [{
            "@type": "Person",
            "@id": "https://www.fasade.online/#author",
            "name": "Raman Kumar Jha",
            "jobTitle": "Founder & Skincare Technology Researcher",
            "url": "https://www.fasade.online"
        }],
        "publisher": {
          "@type": "Organization",
          "name": "Fasade",
          "url": "https://www.fasade.online",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.fasade.online/favicon.svg"
          }
        },
        "inLanguage": "en-US",
        "wordCount": Math.round(blog.content.split(/\s+/).length)
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.fasade.online/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.fasade.online/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": blog.title,
            "item": `https://www.fasade.online/blog/${blog.slug}`
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-cream pt-24 pb-16 section-padding">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <Link href={`/blog#${blog.category.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block text-sm font-semibold tracking-wider text-rose-deep uppercase mb-4 hover:text-plum transition-colors">
              {blog.category}
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-charcoal/60 font-sans text-sm">
              <span>{blog.readTime} min read</span>
              <span>•</span>
              <span>Updated {new Date(blog.lastUpdated).toLocaleDateString()}</span>
            </div>
          </header>

          {blog.coverImage && (
            <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-lg relative">
              <Image
                src={blog.coverImage} 
                alt={blog.altText || blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="glass rounded-3xl p-8 md:p-12 mx-auto max-w-3xl prose prose-lg prose-headings:font-display prose-headings:text-charcoal prose-p:text-charcoal/80 prose-a:text-plum prose-a:no-underline hover:prose-a:underline prose-strong:text-charcoal prose-strong:font-semibold marker:text-rose-deep">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="max-w-7xl mx-auto mt-24 border-t border-blush pt-16">
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-display text-3xl md:text-4xl text-charcoal">Keep Reading</h2>
              <Link href="/blog" className="text-plum hover:text-rose-deep font-medium transition-colors hidden sm:block">
                View all articles &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                  <article className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    {related.coverImage && (
                      <div className="aspect-video w-full overflow-hidden bg-mist relative">
                        <Image
                          src={related.coverImage} 
                          alt={related.altText || related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-sm font-semibold tracking-wider text-rose-deep uppercase mb-3">
                        {related.category}
                      </div>
                      <h3 className="font-display text-xl text-charcoal mb-3 group-hover:text-plum transition-colors">
                        {related.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
