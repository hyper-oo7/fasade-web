import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogs } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Skincare Routine Timeline: How Long Every Ingredient Takes to Work | Fasade',
  description: 'The complete guide to skincare timelines. Discover exactly how long retinol, vitamin C, niacinamide, peptides, AHAs, and 20+ other ingredients take to deliver visible results.',
  alternates: { canonical: '/skincare-routine-timeline' },
  openGraph: {
    title: 'Skincare Routine Timeline: How Long Every Ingredient Takes to Work',
    description: 'The master reference for skincare timelines — retinol, vitamin C, peptides, AHAs, and 20+ ingredients.',
    type: 'article',
    authors: ['Raman Kumar Jha'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FasadeApp',
    title: 'Skincare Routine Timeline: How Long Every Ingredient Takes to Work',
    description: 'The master reference for skincare timelines — retinol, vitamin C, peptides, AHAs, and 20+ ingredients.',
  },
};

const masterTimeline = [
  { ingredient: 'Ceramides', concern: 'Barrier repair, dryness', weeks: '1–2', category: 'Barrier', slug: 'how-long-does-ceramide-take-to-repair-skin', difficulty: 'easy' },
  { ingredient: 'Hyaluronic Acid', concern: 'Hydration, plumping', weeks: '1–2', category: 'Hydration', slug: 'how-long-does-hyaluronic-acid-take-to-work', difficulty: 'easy' },
  { ingredient: 'Ectoin', concern: 'Redness, barrier sensitivity', weeks: '1–2', category: 'Barrier', slug: 'how-long-does-ectoin-take-to-work', difficulty: 'easy' },
  { ingredient: 'Benzoyl Peroxide', concern: 'Active acne, inflammation', weeks: '1–4', category: 'Acne', slug: 'how-long-does-benzoyl-peroxide-take-to-work', difficulty: 'medium' },
  { ingredient: 'Salicylic Acid', concern: 'Pores, blackheads, oily skin', weeks: '4–8', category: 'Acne', slug: 'how-long-does-salicylic-acid-take-to-work', difficulty: 'easy' },
  { ingredient: 'Azelaic Acid', concern: 'Rosacea, PIH, acne', weeks: '4–8', category: 'Brightening', slug: 'how-long-does-azelaic-acid-take-to-work', difficulty: 'easy' },
  { ingredient: 'Niacinamide', concern: 'Oiliness, pigmentation, redness', weeks: '4–8', category: 'Multi-benefit', slug: 'how-long-does-niacinamide-take-to-work', difficulty: 'easy' },
  { ingredient: 'Glycolic Acid', concern: 'Texture, dullness, mild PIH', weeks: '4–8', category: 'Exfoliation', slug: 'how-long-does-glycolic-acid-take-to-work', difficulty: 'medium' },
  { ingredient: 'Vitamin C', concern: 'Brightening, dark spots, glow', weeks: '4–12', category: 'Brightening', slug: 'how-long-does-vitamin-c-take-to-work', difficulty: 'medium' },
  { ingredient: 'Tranexamic Acid', concern: 'Melasma, PIH, uneven tone', weeks: '4–16', category: 'Brightening', slug: 'how-long-does-tranexamic-acid-take-to-work', difficulty: 'easy' },
  { ingredient: 'Bakuchiol', concern: 'Anti-aging, fine lines (retinol alt)', weeks: '8–12', category: 'Anti-aging', slug: 'how-long-does-bakuchiol-take-to-work', difficulty: 'easy' },
  { ingredient: 'Kojic Acid', concern: 'Sun spots, hyperpigmentation', weeks: '8–12', category: 'Brightening', slug: 'how-long-does-kojic-acid-take-to-work', difficulty: 'medium' },
  { ingredient: 'Snail Mucin', concern: 'Texture, scarring, barrier', weeks: '6–12', category: 'Repair', slug: 'how-long-does-snail-mucin-take-to-work', difficulty: 'easy' },
  { ingredient: 'Peptides', concern: 'Collagen, firmness, fine lines', weeks: '8–12', category: 'Anti-aging', slug: 'how-long-do-peptides-take-to-work', difficulty: 'easy' },
  { ingredient: 'Copper Peptides', concern: 'Collagen remodeling, firmness', weeks: '12–24', category: 'Anti-aging', slug: 'how-long-do-copper-peptides-take-to-work', difficulty: 'medium' },
  { ingredient: 'Retinal', concern: 'Anti-aging, acne, texture', weeks: '4–12', category: 'Anti-aging', slug: 'how-long-does-retinal-take-to-work', difficulty: 'hard' },
  { ingredient: 'Retinol', concern: 'Anti-aging, acne, dark spots', weeks: '12–24', category: 'Anti-aging', slug: 'how-long-does-retinol-take-to-work', difficulty: 'hard' },
  { ingredient: 'PDRN', concern: 'Elasticity, scar remodeling', weeks: '6–12', category: 'Biotech', slug: 'how-long-does-pdrn-take-to-work', difficulty: 'medium' },
];

const categoryColors: Record<string, string> = {
  Barrier: '#ecfdf5',
  Hydration: '#eff6ff',
  Acne: '#fff7ed',
  Brightening: '#fdf4ff',
  'Multi-benefit': '#f0f9ff',
  Exfoliation: '#fffbeb',
  'Anti-aging': '#f5f3ff',
  Repair: '#fef2f2',
  Biotech: '#f0fdf4',
};

const difficultyLabel: Record<string, { label: string; color: string }> = {
  easy: { label: 'Beginner-friendly', color: '#059669' },
  medium: { label: 'Moderate', color: '#d97706' },
  hard: { label: 'Advanced', color: '#dc2626' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'How long does a skincare routine take to work?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Most active ingredients require 4–12 weeks to show visible results. Hydrating ingredients work within days. Anti-aging actives like retinol require 3–6 months. The key is completing a minimum 12-week period before evaluating effectiveness.' },
    },
    {
      '@type': 'Question',
      'name': 'What skincare ingredient works the fastest?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Hyaluronic acid and ceramides show measurable results within 1–7 days for hydration and barrier comfort. Benzoyl peroxide reduces bacterial load within 24–48 hours. AHAs produce a visible "glow" effect within 1–3 uses due to immediate exfoliation.' },
    },
    {
      '@type': 'Question',
      'name': 'How long should I wait before adding a new product to my routine?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Wait 2 weeks minimum between introducing new products. This allows you to identify which product is responsible for any reaction or improvement. Introducing multiple products simultaneously makes it impossible to troubleshoot.' },
    },
    {
      '@type': 'Question',
      'name': 'Is it normal to not see results after 4 weeks?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'For most actives (retinol, peptides, brighteners), yes — 4 weeks is too early for meaningful results. The minimum clinical assessment window for most ingredients is 8 weeks, with full effects appearing at 12+ weeks.' },
    },
  ],
};

export default async function SkincareRoutineTimelinePage() {
  const blogs = await Promise.resolve(getAllBlogs());
  const timelineBlogs = blogs.filter((b) => b.category === 'Timeline');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="timeline-page">
        {/* Hero */}
        <section className="tl-hero">
          <div className="tl-hero__inner">
            <div className="tl-badge">Complete Reference Guide</div>
            <h1>
              Skincare Routine Timeline:<br />
              <span className="tl-accent">How Long Every Ingredient Takes</span>
            </h1>
            <p className="tl-hero__sub">
              The master reference for skincare timelines. Discover exactly how long every active ingredient
              takes to deliver visible results — so you can evaluate your routine with evidence, not guesswork.
            </p>
            <p className="tl-byline">
              By <strong>Raman Kumar Jha</strong>, Founder & Skincare Technology Researcher ·{' '}
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </section>

        <div className="tl-content">

          {/* The 28-day cycle explainer */}
          <section className="tl-section">
            <h2>Why Skincare Takes Weeks, Not Days</h2>
            <p>
              Every skincare result is governed by the same biological constraint: your skin&apos;s natural
              renewal cycle. Keratinocytes are born in the basal layer of the epidermis and take approximately
              28 days to migrate to the surface and shed. This means that even if an ingredient produces an
              instantaneous cellular effect, you will not see that effect on the surface of your skin for
              nearly a full month.
            </p>
            <p>
              For anti-aging actives that work by stimulating collagen in the dermis, add another layer:
              fibroblasts need 6–8 weeks to produce measurable new collagen, and that collagen needs to
              remodel for another 4–8 weeks before it affects skin texture at the surface.
            </p>
            <div className="tl-cycle-diagram">
              {[
                { week: 'Week 1–2', event: 'Active ingredient penetrates and begins cellular signaling', icon: '🧬' },
                { week: 'Week 2–4', event: 'First cellular responses occur (increased turnover, barrier changes)', icon: '⚡' },
                { week: 'Week 4–8', event: 'Treated cells reach the surface — first visible changes', icon: '👁️' },
                { week: 'Week 8–12', event: 'Full first treatment cycle complete — clinical assessment window', icon: '📊' },
                { week: 'Month 3–6', event: 'Structural changes (collagen, elastin) become measurable', icon: '🏛️' },
              ].map((item) => (
                <div key={item.week} className="tl-cycle-item">
                  <span className="tl-cycle-icon">{item.icon}</span>
                  <div>
                    <strong>{item.week}</strong>
                    <span>{item.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Master timeline table */}
          <section className="tl-section">
            <h2>The Complete Skincare Ingredient Timeline</h2>
            <p>
              Sorted by speed of visible results — from fastest to slowest. Click any ingredient for the
              full clinical breakdown.
            </p>
            <div className="tl-table-wrapper">
              <table className="tl-table">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Primary Concern</th>
                    <th>Results Timeline</th>
                    <th>Difficulty</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {masterTimeline.map((row) => (
                    <tr key={row.ingredient}>
                      <td>
                        <strong>{row.ingredient}</strong>
                        <span className="tl-category-pill" style={{ background: categoryColors[row.category] || '#f9fafb' }}>
                          {row.category}
                        </span>
                      </td>
                      <td className="tl-concern">{row.concern}</td>
                      <td className="tl-weeks"><strong>{row.weeks} weeks</strong></td>
                      <td>
                        <span
                          className="tl-difficulty"
                          style={{ color: difficultyLabel[row.difficulty]?.color }}
                        >
                          {difficultyLabel[row.difficulty]?.label}
                        </span>
                      </td>
                      <td>
                        <Link href={`/blog/${row.slug}`} className="tl-read-link">
                          Full guide →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Routine progression guide */}
          <section className="tl-section">
            <h2>How to Build a Routine by Timeline</h2>
            <p>
              The most common mistake is introducing high-difficulty actives (retinol, strong AHAs) before
              the barrier is strong enough to handle them. Here is the evidence-based progression:
            </p>
            <div className="tl-stages">
              {[
                {
                  stage: 'Stage 1: Foundation',
                  duration: 'Weeks 1–8',
                  desc: 'Build a healthy barrier before introducing actives. Introduce: gentle cleanser, ceramide moisturiser, SPF 50+. This is the step most people skip and then wonder why retinol is destroying their skin.',
                  products: ['Ceramide moisturiser', 'Gentle pH-balanced cleanser', 'SPF 50+ (non-negotiable)'],
                  color: '#ecfdf5',
                },
                {
                  stage: 'Stage 2: First Actives',
                  duration: 'Weeks 8–20',
                  desc: 'With a stable barrier, introduce low-risk, high-benefit actives one at a time, spaced 2 weeks apart.',
                  products: ['Niacinamide 5%', 'Vitamin C serum (AM)', 'Hyaluronic acid serum'],
                  color: '#eff6ff',
                },
                {
                  stage: 'Stage 3: Targeted Treatment',
                  duration: 'Month 4–6',
                  desc: 'Once tolerating Stage 2, introduce targeted treatments for your primary concerns.',
                  products: ['Retinol 0.1–0.25% (2x/week PM)', 'Salicylic acid (if acne-prone)', 'Peptide serum (AM)'],
                  color: '#f5f3ff',
                },
                {
                  stage: 'Stage 4: Advanced',
                  duration: 'Month 6+',
                  desc: 'For experienced users with a stable, tolerant skin barrier. Push concentrations and add specialist actives.',
                  products: ['Retinol 0.5–1%', 'Glycolic acid 8–10% (2x/week)', 'Copper peptides (AM)'],
                  color: '#fff7ed',
                },
              ].map((s) => (
                <div key={s.stage} className="tl-stage" style={{ borderLeft: `4px solid`, borderLeftColor: s.products.length > 0 ? '#6d28d9' : '#e5e7eb', background: s.color }}>
                  <div className="tl-stage-header">
                    <strong>{s.stage}</strong>
                    <span className="tl-stage-duration">{s.duration}</span>
                  </div>
                  <p>{s.desc}</p>
                  <ul>
                    {s.products.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Deep-dive links */}
          <section className="tl-section">
            <h2>Deep-Dive Timeline Guides</h2>
            <p>Every ingredient below has a dedicated clinical guide with exact timelines, mechanisms, and tracking protocols.</p>
            <div className="tl-blog-grid">
              {timelineBlogs.map((blog) => (
                <Link key={blog.slug} href={`/blog/${blog.slug}`} className="tl-blog-card">
                  <span className="tl-blog-card__cat">{blog.category}</span>
                  <strong>{blog.title}</strong>
                  <span className="tl-blog-card__arrow">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="tl-section tl-faq">
            <h2>Frequently Asked Questions</h2>
            {faqSchema.mainEntity.map((qa) => (
              <details key={qa.name} className="tl-faq-item">
                <summary>{qa.name}</summary>
                <p>{qa.acceptedAnswer.text}</p>
              </details>
            ))}
          </section>

          {/* CTA */}
          <section className="tl-cta">
            <h2>Track Your Timeline Progress</h2>
            <p>Know exactly where you are in your skincare journey with Fasade&apos;s structured progress tracking.</p>
            <Link href="/#waitlist" className="tl-cta-btn">Join the Waitlist — Free →</Link>
          </section>

        </div>
      </main>

      <style>{`
        .timeline-page { font-family: var(--font-inter), system-ui, sans-serif; color: #1a1a2e; }
        .tl-hero {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
          color: #fff; padding: 80px 24px; text-align: center;
        }
        .tl-hero__inner { max-width: 840px; margin: 0 auto; }
        .tl-badge {
          display: inline-block; background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2); color: #c7d2fe;
          font-size: 13px; font-weight: 500; padding: 5px 14px;
          border-radius: 99px; margin-bottom: 24px; letter-spacing: 0.06em;
        }
        .tl-hero h1 { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 800; line-height: 1.15; margin: 0 0 20px; }
        .tl-accent { background: linear-gradient(90deg,#a5b4fc,#67e8f9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .tl-hero__sub { font-size: 1.1rem; color: #a5b4fc; line-height: 1.6; margin: 0 0 12px; }
        .tl-byline { font-size: 13px; color: rgba(255,255,255,0.45); margin: 0; }
        .tl-content { max-width: 860px; margin: 0 auto; padding: 60px 24px; }
        .tl-section { margin-bottom: 72px; }
        .tl-section h2 { font-size: 1.75rem; font-weight: 700; color: #0f0c29; margin: 0 0 16px; letter-spacing: -0.01em; }
        .tl-section p { font-size: 1.04rem; line-height: 1.75; color: #374151; margin: 0 0 16px; }
        .tl-cycle-diagram { margin: 28px 0; display: flex; flex-direction: column; gap: 2px; }
        .tl-cycle-item {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 16px 20px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;
        }
        .tl-cycle-icon { font-size: 1.5rem; flex-shrink: 0; }
        .tl-cycle-item strong { display: block; font-size: 0.9rem; color: #6d28d9; margin-bottom: 4px; }
        .tl-cycle-item span { font-size: 0.95rem; color: #374151; }
        .tl-table-wrapper { overflow-x: auto; border-radius: 12px; border: 1px solid #e5e7eb; margin-top: 20px; }
        .tl-table { width: 100%; border-collapse: collapse; }
        .tl-table th, .tl-table td { padding: 12px 16px; font-size: 0.9rem; border-bottom: 1px solid #f3f4f6; text-align: left; }
        .tl-table th { background: #f9fafb; font-weight: 600; color: #374151; }
        .tl-table tr:hover { background: #fafafa; }
        .tl-category-pill {
          display: inline-block; font-size: 11px; font-weight: 500;
          padding: 2px 8px; border-radius: 99px; margin-left: 8px; color: #374151;
        }
        .tl-concern { color: #6b7280; font-size: 0.88rem; }
        .tl-weeks strong { color: #1a1a2e; }
        .tl-difficulty { font-size: 0.85rem; font-weight: 600; }
        .tl-read-link { color: #6d28d9; font-weight: 500; text-decoration: none; white-space: nowrap; }
        .tl-read-link:hover { text-decoration: underline; }
        .tl-stages { display: flex; flex-direction: column; gap: 16px; margin-top: 24px; }
        .tl-stage { padding: 24px; border-radius: 12px; border-left-width: 4px; border-left-style: solid; border-left-color: #6d28d9; }
        .tl-stage-header { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
        .tl-stage-header strong { font-size: 1.05rem; color: #1a1a2e; }
        .tl-stage-duration { font-size: 12px; color: #6b7280; background: rgba(0,0,0,0.06); padding: 3px 10px; border-radius: 99px; }
        .tl-stage p { font-size: 0.95rem; color: #374151; margin: 0 0 12px; line-height: 1.6; }
        .tl-stage ul { margin: 0; padding-left: 20px; }
        .tl-stage li { font-size: 0.93rem; color: #374151; margin-bottom: 4px; }
        .tl-blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; margin-top: 20px; }
        .tl-blog-card {
          display: flex; flex-direction: column; gap: 6px;
          padding: 16px 20px; background: #fafafa; border: 1px solid #e5e7eb;
          border-radius: 10px; text-decoration: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .tl-blog-card:hover { border-color: #a78bfa; box-shadow: 0 4px 16px rgba(167,139,250,0.15); }
        .tl-blog-card__cat { font-size: 11px; color: #6d28d9; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .tl-blog-card strong { font-size: 0.93rem; color: #1a1a2e; line-height: 1.4; }
        .tl-blog-card__arrow { font-size: 0.85rem; color: #9ca3af; margin-top: auto; }
        .tl-faq-item { border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 12px; padding: 16px 20px; }
        .tl-faq-item summary { font-weight: 600; cursor: pointer; color: #1a1a2e; }
        .tl-faq-item p { margin: 12px 0 0; color: #374151; font-size: 0.97rem; line-height: 1.6; }
        .tl-cta { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: #fff; border-radius: 20px; padding: 56px 40px; text-align: center; }
        .tl-cta h2 { font-size: 2rem; font-weight: 800; color: #fff; margin: 0 0 12px; }
        .tl-cta p { color: #a5b4fc; font-size: 1.05rem; margin: 0 0 28px; }
        .tl-cta-btn { display: inline-block; background: linear-gradient(90deg,#7c3aed,#2563eb); color: #fff; font-weight: 600; font-size: 1rem; padding: 14px 32px; border-radius: 8px; text-decoration: none; transition: opacity 0.2s; }
        .tl-cta-btn:hover { opacity: 0.88; }
      `}</style>
    </>
  );
}
