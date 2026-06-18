import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { useScrollToSection } from '../../hooks/useScrollToSection'

const navLinks = [
  { label: 'How It Works', id: 'solution' },
  { label: 'Features', id: 'features' },
  { label: 'Research', id: 'research' },
  { label: 'FAQ', id: 'faq' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollTo = useScrollToSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id: string) => {
    scrollTo(id)
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12"
        aria-label="Main navigation"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-2xl font-semibold tracking-tight text-plum"
          aria-label="Fasade home"
        >
          Fasade
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="text-sm font-medium text-charcoal/70 transition-colors hover:text-plum"
            >
              {link.label}
            </button>
          ))}
          <Button size="sm" onClick={() => handleNav('waitlist')}>
            Join Waitlist
          </Button>
        </div>

        <button
          className="rounded-lg p-2 text-plum md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-t border-white/40 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-charcoal/80 hover:bg-blush/50"
                >
                  {link.label}
                </button>
              ))}
              <Button
                fullWidth
                size="md"
                className="mt-2"
                onClick={() => handleNav('waitlist')}
              >
                Join Waitlist
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
