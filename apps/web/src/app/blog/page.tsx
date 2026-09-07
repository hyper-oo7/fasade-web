import { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getAllBlogs } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Skincare Science & Timeline Guide | Fasade',
  description: 'Understand exactly how long your skincare takes to work, how to mix ingredients, and why your routine might not be working.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogIndex() {
  const blogs = getAllBlogs()
  
  // Group blogs by category
  const groupedBlogs = blogs.reduce((acc, blog) => {
    if (!acc[blog.category]) acc[blog.category] = []
    acc[blog.category].push(blog)
    return acc
  }, {} as Record<string, typeof blogs>)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-24 pb-16 section-padding">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16">
            <h1 className="font-display text-4xl md:text-6xl text-charcoal mb-4">
              The Science of <span className="text-gradient">Results</span>
            </h1>
            <p className="text-xl text-charcoal/70 max-w-2xl font-sans">
              Stop guessing. Learn exactly when to expect results, how to combine ingredients, and how to optimize your routine for your unique skin barrier.
            </p>
          </header>

          <div className="space-y-24">
            {Object.entries(groupedBlogs).map(([category, categoryBlogs]) => (
              <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
                <h2 className="font-display text-3xl md:text-4xl text-plum mb-8 border-b border-blush pb-4">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryBlogs.map((blog) => (
                    <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group block">
                      <article className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                        {blog.coverImage && (
                          <div className="aspect-video w-full overflow-hidden bg-mist">
                            <img 
                              src={blog.coverImage} 
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="text-sm font-semibold tracking-wider text-rose-deep uppercase mb-3">
                            {blog.category}
                          </div>
                          <h3 className="font-display text-2xl text-charcoal mb-3 group-hover:text-plum transition-colors">
                            {blog.title}
                          </h3>
                          <p className="text-charcoal/70 font-sans text-sm line-clamp-3 mb-4">
                            {blog.excerpt}
                          </p>
                          <div className="mt-auto text-sm text-charcoal/50 font-medium">
                            {blog.readTime} min read
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
