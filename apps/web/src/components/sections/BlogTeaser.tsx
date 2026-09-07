"use client";
import { motion } from 'framer-motion'
import { SectionWrapper } from '../layout/SectionWrapper'
import { Button } from '../ui/Button'
import { ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

export function BlogTeaser() {
  return (
    <SectionWrapper id="knowledge-base" className="bg-sand/30 overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start"
          >
            <div className="mb-6 flex items-center gap-2 rounded-full border border-plum/20 bg-plum/5 px-4 py-2 text-sm font-medium text-plum">
              <BookOpen size={16} />
              <span>Skincare Science</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal sm:text-4xl md:text-5xl">
              150+ Clinical Guides. <br /> Zero Guesswork.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70 max-w-xl">
              Stop guessing if your routine is working. Dive into our comprehensive knowledge base exploring timelines, ingredient combinations, and the latest in regenerative biotech like PDRN and Ectoin.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/blog">
                <Button size="lg" className="group">
                  Explore the Knowledge Base
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-md"
          >
            <div className="relative rounded-2xl bg-white p-6 shadow-xl ring-1 ring-charcoal/5">
              <div className="mb-6 border-b border-sand pb-4">
                <h3 className="font-display text-lg font-semibold text-charcoal">Trending Topics</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'How Long Does Retinol Take to Work?',
                  'PDRN vs Peptides: What\'s Better?',
                  'Can You Use Niacinamide With Vitamin C?',
                  'Best Ingredients for Skin Longevity'
                ].map((topic, i) => (
                  <li key={i} className="flex items-center gap-3 text-charcoal/80 transition-colors hover:text-plum cursor-pointer">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sand/50 text-xs font-medium text-charcoal">
                      {i + 1}
                    </div>
                    <Link href="/blog" className="text-sm font-medium">
                      {topic}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 rounded-xl bg-plum/5 p-4">
                <p className="text-sm text-plum font-medium">
                  Categories include: Timelines, Combinations, Longevity, Microbiome, and more.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
