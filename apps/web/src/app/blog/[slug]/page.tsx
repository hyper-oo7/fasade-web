import { Metadata } from 'next'
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
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      images: blog.coverImage ? [blog.coverImage] : [],
    }
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug)

  if (!blog) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.coverImage ? [blog.coverImage] : [],
    "datePublished": blog.lastUpdated,
    "dateModified": blog.lastUpdated,
    "author": [{
        "@type": "Organization",
        "name": "Fasade",
        "url": "https://www.fasade.online"
    }]
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
            <div className="text-sm font-semibold tracking-wider text-rose-deep uppercase mb-4">
              {blog.category}
            </div>
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
            <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-lg">
              <img 
                src={blog.coverImage} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="glass rounded-3xl p-8 md:p-12 mx-auto max-w-3xl prose prose-lg prose-headings:font-display prose-headings:text-charcoal prose-p:text-charcoal/80 prose-a:text-plum prose-a:no-underline hover:prose-a:underline prose-strong:text-charcoal prose-strong:font-semibold marker:text-rose-deep">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
