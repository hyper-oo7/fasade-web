import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogs } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'How to Track Your Skincare Progress — The Complete Guide | Fasade',
  description: 'Learn the scientifically-backed method to track skincare progress, measure real results, and stop wasting money on products that aren\'t working for your skin.',
  alternates: { canonical: '/skin-tracker' },
  openGraph: {
    title: 'How to Track Your Skincare Progress — The Complete Guide',
    description: 'Stop guessing. Learn the science-backed method to measure real skincare results.',
    type: 'article',
    authors: ['Raman Kumar Jha'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FasadeApp',
    title: 'How to Track Your Skincare Progress — The Complete Guide',
    description: 'Stop guessing. Learn the science-backed method to measure real skincare results.',
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'How to Track Your Skincare Progress',
  'description': 'A step-by-step method to measure and document skin improvements from your skincare routine.',
  'author': {
    '@type': 'Person',
    '@id': 'https://www.fasade.online/#author',
    'name': 'Raman Kumar Jha',
  },
  'step': [
    {
      '@type': 'HowToStep',
      'position': 1,
      'name': 'Establish a baseline',
      'text': 'On Day 0, photograph your skin in consistent, natural sidelight with no makeup. Note your current concerns: oiliness, pigmentation, texture, redness, breakout frequency.',
    },
    {
      '@type': 'HowToStep',
      'position': 2,
      'name': 'Set a consistent tracking protocol',
      'text': 'Use the same camera, distance, lighting angle, and time of day every time. Morning light after cleansing (before any products) gives the most objective baseline.',
    },
    {
      '@type': 'HowToStep',
      'position': 3,
      'name': 'Track at standardised intervals',
      'text': 'Photograph and rate your primary concerns at Week 2, 4, 8, and 12. Avoid daily tracking — day-to-day fluctuations in lighting, sleep, hormones, and hydration create noise.',
    },
    {
      '@type': 'HowToStep',
      'position': 4,
      'name': 'Measure objectively, not by feel',
      'text': 'Rate each concern on a scale of 1–10. Track specific metrics: sebum midday, breakout count, pigmentation intensity, pore visibility. Numbers beat impressions.',
    },
    {
      '@type': 'HowToStep',
      'position': 5,
      'name': 'Compare systematically at 12 weeks',
      'text': 'Place Day 0 and Week 12 photos side by side. Look for measurable differences, not transformations. Consistent incremental improvement over 12 weeks is clinical success.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'How long should I track my skincare before deciding if it works?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'At minimum, 8 weeks for most actives. Retinoids and collagen-building peptides need 12–16 weeks. Hydrating ingredients can be evaluated in 2–4 weeks.' },
    },
    {
      '@type': 'Question',
      'name': 'What is the most common mistake people make when tracking skincare?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Tracking by memory and feel rather than photographs and consistent measurement. The brain is subject to confirmation bias and cannot accurately remember subtle skin changes over 8–12 weeks without a reference point.' },
    },
    {
      '@type': 'Question',
      'name': 'Should I take photos of my skin every day?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'No. Daily tracking introduces too much noise from lighting, hydration, sleep quality, and hormonal fluctuations. Track at Week 0, 2, 4, 8, and 12 for the most meaningful data.' },
    },
    {
      '@type': 'Question',
      'name': 'What app is best for tracking skincare progress?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Fasade is purpose-built for structured skincare progress tracking. It standardises your photo protocol, logs your routine, and makes it easy to compare skin over time. It\'s free to join the waitlist.' },
    },
  ],
};

const comparisonRows = [
  { feature: 'Baseline documentation', manual: 'Easy to forget Day 0 photo', fasade: 'Auto-prompted on Day 0' },
  { feature: 'Consistency of photos', manual: 'Different lighting/angle each time', fasade: 'Guided angle/lighting protocol' },
  { feature: 'Memory of past skin state', manual: 'Distorted by expectation bias', fasade: 'Side-by-side comparison in app' },
  { feature: 'Routine logging', manual: 'Spreadsheet or memory', fasade: 'Built-in routine log per day' },
  { feature: 'Reaction tracking', manual: 'Difficult to correlate', fasade: 'Product + reaction timeline' },
  { feature: '12-week progress review', manual: 'Rarely done objectively', fasade: 'Automatic progress summary' },
];

export default function SkinTrackerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="skin-tracker-page">
        {/* Hero */}
        <section className="tracker-hero">
          <div className="tracker-hero__inner">
            <div className="tracker-badge">Guide · 8 min read</div>
            <h1 className="tracker-hero__title">
              How to Track Your<br />
              <span className="tracker-accent">Skincare Progress</span>
            </h1>
            <p className="tracker-hero__sub">
              The scientifically-backed method to measure real results, stop wasting money on products that don&apos;t work, and build a routine with evidence — not guesswork.
            </p>
            <p className="tracker-hero__byline">
              By <strong>Raman Kumar Jha</strong>, Founder & Skincare Technology Researcher · Updated{' '}
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <Link href="/#waitlist" className="tracker-cta-btn">
              Start Tracking Free →
            </Link>
          </div>
        </section>

        <div className="tracker-content">

          {/* Why tracking matters */}
          <section className="tracker-section">
            <h2>Why Your Memory Can&apos;t Be Trusted for Skincare</h2>
            <p>
              The human visual system is remarkable at detecting instantaneous differences but terrible at tracking
              slow, incremental change. A study in cognitive psychology found that humans reliably overestimate change
              when it occurs suddenly, and <em>underestimate</em> it when it occurs gradually — exactly the pattern
              of skincare results.
            </p>
            <p>
              This is why clinical trials never rely on patient self-report alone. They use standardised photography
              under controlled lighting, validated rating scales (GAIS, IGA, VISIA imaging), and blinded assessors.
              Without this framework, the data is meaningless.
            </p>
            <p>
              For everyday skincare users, the consequence is constant frustration: you cannot tell whether a product
              is working, you abandon products that <em>are</em> producing results (too slowly to notice without a
              reference), and you continue with products that are ineffective because you don&apos;t have a baseline
              to compare against.
            </p>

            <div className="tracker-stat-row">
              <div className="tracker-stat">
                <span className="tracker-stat__num">68%</span>
                <span className="tracker-stat__label">of people abandon skincare before the clinical minimum timeframe</span>
              </div>
              <div className="tracker-stat">
                <span className="tracker-stat__num">8–12 wks</span>
                <span className="tracker-stat__label">required for most actives to show measurable results</span>
              </div>
              <div className="tracker-stat">
                <span className="tracker-stat__num">&lt;5%</span>
                <span className="tracker-stat__label">of people document skincare progress systematically</span>
              </div>
            </div>
          </section>

          {/* Step by step */}
          <section className="tracker-section">
            <h2>The 5-Step Skincare Tracking Protocol</h2>

            {[
              {
                num: '01',
                title: 'Establish a baseline on Day 0',
                body: `Before you start any new product or routine, document your skin exactly as it is. Use natural window light with the sun to your side (not behind or in front of you). No makeup. No filters. Take three photos: front-facing, left profile, right profile.

Write down (or log in Fasade) your primary concerns rated 1–10:
- **Oiliness:** How oily does your skin feel by midday?
- **Breakouts:** How many active spots currently?
- **Pigmentation:** How visible are dark spots/marks?
- **Texture:** How rough does skin feel to the touch?
- **Redness:** Overall redness level?`,
              },
              {
                num: '02',
                title: 'Photograph consistently — same everything',
                body: `Consistency in photography is more important than quality. A blurry photo taken every time in the same conditions beats a sharp photo taken differently each time.

Standardise these variables:
- **Time:** Always photograph in the morning, after cleansing, before any products
- **Lighting:** Same window, same time of day, or dedicate a specific lamp
- **Distance:** Arm's length or use a phone stand
- **Angle:** Front + both profiles at the same tilt
- **Skin state:** Same "blank" skin — no makeup, no products`,
              },
              {
                num: '03',
                title: 'Track at intervals, not daily',
                body: `Daily tracking is counterproductive. Skin fluctuates too much between days based on hydration, sleep, hormones, stress, and even what you ate. These fluctuations mask the underlying trend.

Track at these intervals:
- **Week 0:** Baseline (mandatory)
- **Week 2:** First check — note any reaction or purging, not results
- **Week 4:** First meaningful assessment for fast-acting ingredients
- **Week 8:** Primary evaluation point for most actives
- **Week 12:** Full clinical-equivalent evaluation`,
              },
              {
                num: '04',
                title: 'Rate numerically, not by impression',
                body: `Subjective impressions ("my skin looks better") are unreliable. Numerical ratings force specificity and create comparable data across weeks.

For each concern, use a 1–10 scale:
- 1 = completely clear / no issue
- 5 = moderate / noticeable concern
- 10 = severe / major problem

Record the number at each checkpoint. Compare Week 0 → Week 12 numerically. A 3-point improvement on any metric over 12 weeks is clinically significant.`,
              },
              {
                num: '05',
                title: 'Review comparatively — photos side by side',
                body: `At Week 12, open your Week 0 and Week 12 photos side by side. Do not look at them sequentially — comparison requires simultaneous viewing.

Look specifically at your primary concern metric. If you rated oiliness 8/10 at Week 0 and 5/10 at Week 12, with photos supporting the reduction — that product is working. If ratings are unchanged and photos show no difference — the product is not effective for you.

This is the only honest way to evaluate skincare.`,
              },
            ].map((step) => (
              <div key={step.num} className="tracker-step">
                <div className="tracker-step__num">{step.num}</div>
                <div className="tracker-step__body">
                  <h3>{step.title}</h3>
                  {step.body.split('\n\n').map((para, i) => (
                    <p key={i} style={{ whiteSpace: 'pre-line' }}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Comparison table */}
          <section className="tracker-section">
            <h2>Manual Tracking vs Fasade: What&apos;s the Difference?</h2>
            <p>
              You can implement the above protocol with a notebook and camera roll. Many people do. But the
              friction of doing it consistently is the reason 95%+ of people don&apos;t track at all. Fasade is
              designed to remove that friction.
            </p>
            <div className="tracker-comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Manual Tracking</th>
                    <th className="th-fasade">Fasade</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td><strong>{row.feature}</strong></td>
                      <td className="td-manual">{row.manual}</td>
                      <td className="td-fasade">{row.fasade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* When to stop a product */}
          <section className="tracker-section">
            <h2>When to Actually Stop a Product</h2>
            <p>
              With a proper tracking protocol, the decision to stop or continue a product becomes data-driven:
            </p>
            <div className="tracker-decision-grid">
              {[
                { icon: '✅', label: 'Continue', text: 'Numerical ratings improving + photos confirm positive change over 8+ weeks' },
                { icon: '⏳', label: 'Wait', text: 'Less than 8 weeks elapsed. Most actives haven\'t reached their minimum assessment window yet.' },
                { icon: '⚠️', label: 'Reduce frequency', text: 'Irritation, flaking, or sensitivity appearing. Barrier may need support. Reduce to 2–3x per week.' },
                { icon: '🛑', label: 'Stop', text: 'Active irritation, rash, burning at rest, or 12 weeks elapsed with zero measurable improvement.' },
              ].map((d) => (
                <div key={d.label} className="tracker-decision-card">
                  <span className="tracker-decision-icon">{d.icon}</span>
                  <strong>{d.label}</strong>
                  <p>{d.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="tracker-section tracker-faq">
            <h2>Frequently Asked Questions</h2>
            {faqSchema.mainEntity.map((qa) => (
              <details key={qa.name} className="tracker-faq-item">
                <summary>{qa.name}</summary>
                <p>{qa.acceptedAnswer.text}</p>
              </details>
            ))}
          </section>

          {/* CTA */}
          <section className="tracker-cta-section">
            <h2>Start Tracking Your Routine</h2>
            <p>
              Fasade is built for exactly this — structured, scientific skincare tracking without the spreadsheet.
              Join the waitlist for early access.
            </p>
            <Link href="/#waitlist" className="tracker-cta-btn">
              Join the Waitlist — Free →
            </Link>
          </section>

        </div>
      </main>

      <style>{`
        .skin-tracker-page {
          font-family: var(--font-inter), system-ui, sans-serif;
          color: #1a1a2e;
          background: #fff;
        }
        .tracker-hero {
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          color: #fff;
          padding: 80px 24px;
          text-align: center;
        }
        .tracker-hero__inner {
          max-width: 760px;
          margin: 0 auto;
        }
        .tracker-badge {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          color: #e0d7ff;
          font-size: 13px;
          letter-spacing: 0.08em;
          font-weight: 500;
          padding: 6px 16px;
          border-radius: 99px;
          margin-bottom: 24px;
        }
        .tracker-hero__title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 20px;
          letter-spacing: -0.02em;
        }
        .tracker-accent {
          background: linear-gradient(90deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tracker-hero__sub {
          font-size: 1.15rem;
          color: #c4b5fd;
          line-height: 1.6;
          margin: 0 0 12px;
        }
        .tracker-hero__byline {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin: 0 0 28px;
        }
        .tracker-cta-btn {
          display: inline-block;
          background: linear-gradient(90deg, #7c3aed, #2563eb);
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .tracker-cta-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .tracker-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 60px 24px;
        }
        .tracker-section {
          margin-bottom: 72px;
        }
        .tracker-section h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0f0c29;
          margin: 0 0 20px;
          letter-spacing: -0.01em;
        }
        .tracker-section p {
          font-size: 1.05rem;
          line-height: 1.75;
          color: #374151;
          margin: 0 0 16px;
        }
        .tracker-stat-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin: 32px 0;
        }
        .tracker-stat {
          background: linear-gradient(135deg, #f5f3ff, #ede9fe);
          border: 1px solid #ddd6fe;
          border-radius: 12px;
          padding: 24px 20px;
          text-align: center;
        }
        .tracker-stat__num {
          display: block;
          font-size: 2.25rem;
          font-weight: 800;
          color: #6d28d9;
          letter-spacing: -0.02em;
        }
        .tracker-stat__label {
          display: block;
          font-size: 13px;
          color: #5b21b6;
          margin-top: 8px;
          line-height: 1.4;
        }
        .tracker-step {
          display: flex;
          gap: 24px;
          margin-bottom: 40px;
          padding: 28px;
          background: #fafafa;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }
        .tracker-step__num {
          font-size: 2rem;
          font-weight: 900;
          color: #ddd6fe;
          line-height: 1;
          flex-shrink: 0;
          width: 52px;
        }
        .tracker-step__body h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 12px;
        }
        .tracker-step__body p {
          font-size: 0.97rem;
          color: #374151;
          margin: 0 0 12px;
        }
        .tracker-comparison-table {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-top: 24px;
        }
        .tracker-comparison-table table {
          width: 100%;
          border-collapse: collapse;
        }
        .tracker-comparison-table th, .tracker-comparison-table td {
          padding: 14px 18px;
          font-size: 0.93rem;
          border-bottom: 1px solid #e5e7eb;
          text-align: left;
        }
        .tracker-comparison-table th {
          background: #f9fafb;
          font-weight: 600;
          color: #111;
        }
        .th-fasade { color: #6d28d9 !important; }
        .td-manual { color: #9ca3af; }
        .td-fasade { color: #059669; font-weight: 500; }
        .tracker-decision-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 24px;
        }
        .tracker-decision-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #fff;
        }
        .tracker-decision-icon {
          display: block;
          font-size: 1.75rem;
          margin-bottom: 8px;
        }
        .tracker-decision-card strong {
          display: block;
          font-size: 1rem;
          margin-bottom: 8px;
          color: #111;
        }
        .tracker-decision-card p {
          font-size: 0.9rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.5;
        }
        .tracker-faq-item {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 12px;
          padding: 16px 20px;
        }
        .tracker-faq-item summary {
          font-weight: 600;
          cursor: pointer;
          color: #1a1a2e;
          font-size: 1rem;
        }
        .tracker-faq-item p {
          margin: 12px 0 0;
          color: #374151;
          font-size: 0.97rem;
          line-height: 1.6;
        }
        .tracker-cta-section {
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 100%);
          color: #fff;
          border-radius: 20px;
          padding: 56px 40px;
          text-align: center;
        }
        .tracker-cta-section h2 {
          font-size: 2rem;
          font-weight: 800;
          color: #fff !important;
          margin: 0 0 12px;
        }
        .tracker-cta-section p {
          color: #c4b5fd;
          font-size: 1.05rem;
          margin: 0 0 28px;
        }
        @media (max-width: 600px) {
          .tracker-step { flex-direction: column; }
          .tracker-step__num { width: auto; font-size: 1.5rem; }
        }
      `}</style>
    </>
  );
}
