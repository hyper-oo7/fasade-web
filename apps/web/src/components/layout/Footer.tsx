"use client";
import { useScrollToSection } from '../../hooks/useScrollToSection'

export function Footer() {
  const scrollTo = useScrollToSection()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-blush bg-white px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-2xl font-semibold text-plum">Fasade</p>
          <p className="mt-1 text-sm text-charcoal/60">Track Your Skincare Progress.</p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-12 md:gap-24">
          <nav className="flex flex-col items-center md:items-start gap-4" aria-label="Product navigation">
            <h3 className="font-display text-lg font-semibold text-charcoal mb-2">Product</h3>
            {[
              { label: 'How It Works', id: 'solution' },
              { label: 'Features', id: 'features' },
              { label: 'Research', id: 'research' },
              { label: 'Waitlist', id: 'waitlist' },
              { label: 'FAQ', id: 'faq' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-charcoal/60 transition-colors hover:text-plum"
              >
                {link.label}
              </button>
            ))}
          </nav>
          
          <nav className="flex flex-col items-center md:items-start gap-4" aria-label="Knowledge Base navigation">
            <h3 className="font-display text-lg font-semibold text-charcoal mb-2">Knowledge Base</h3>
            {[
              { label: 'Timelines (How Long?)', path: '/blog#timeline' },
              { label: 'Specific Concerns', path: '/blog#concern' },
              { label: 'Ingredient Mixing', path: '/blog#mixing' },
              { label: 'Comparisons', path: '/blog#comparison' },
              { label: 'Troubleshooting', path: '/blog#troubleshooting' },
              { label: 'View All 100+ Guides', path: '/blog', className: 'text-plum font-medium mt-2' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.path}
                className={`text-sm transition-colors hover:text-plum ${link.className || 'text-charcoal/60'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-blush pt-8 text-center">
        <p className="text-xs text-charcoal/40">
          © {year} Fasade. All rights reserved. Cosmetic guidance only — not medical advice.
        </p>
      </div>
    </footer>
  )
}

