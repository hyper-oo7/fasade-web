import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Fade Dark Spots & Hyperpigmentation | The Complete Guide',
  description: 'The science-backed guide to fading dark spots, PIH, and melasma. Learn which ingredients actually work (Vitamin C, Niacinamide, Retinol) and how long it takes.',
  alternates: { canonical: '/concerns/how-to-fade-dark-spots' },
  openGraph: {
    title: 'How to Fade Dark Spots & Hyperpigmentation',
    description: 'The science-backed guide to fading dark spots, PIH, and melasma. Stop guessing and start treating.',
    type: 'article',
    authors: ['Raman Kumar Jha'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FasadeApp',
    title: 'How to Fade Dark Spots & Hyperpigmentation',
    description: 'The science-backed guide to fading dark spots, PIH, and melasma.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'How long does it take to fade dark spots?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Fading dark spots takes time due to the skin\'s natural renewal cycle. Fresh post-inflammatory hyperpigmentation (PIH) can start fading in 4-8 weeks. Older sun spots and melasma often require 12-24 weeks of consistent treatment with multiple brightening actives.' },
    },
    {
      '@type': 'Question',
      'name': 'What is the best ingredient for dark spots?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'There is no single "best" ingredient, as a multi-pathway approach is most effective. Vitamin C inhibits melanin production, Niacinamide blocks melanin transfer, and Retinol accelerates cell turnover to shed the pigmented cells faster.' },
    },
    {
      '@type': 'Question',
      'name': 'Why are my dark spots getting darker?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'The most common reasons dark spots get darker are insufficient UV protection (sun exposure triggers melanin) or irritation from over-exfoliation (inflammation causes more pigmentation, especially in skin of color).' },
    }
  ],
};

export default function DarkSpotsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="pillar-page">
        <section className="pillar-hero">
          <div className="pillar-hero__inner">
            <div className="pillar-badge">Ultimate Concern Guide</div>
            <h1>How to Fade<br /><span className="pillar-accent">Dark Spots & Hyperpigmentation</span></h1>
            <p className="pillar-hero__sub">
              Dark spots are stubborn, but the science of fading them is well understood. Learn the four types of hyperpigmentation, the melanin pathway, and the exact ingredients you need.
            </p>
            <p className="pillar-byline">By <strong>Raman Kumar Jha</strong> · Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </section>

        <div className="pillar-content">
          <section className="pillar-section">
            <h2>The Four Types of Dark Spots</h2>
            <p>Before you can treat hyperpigmentation, you must identify what type you have. The treatment timeline and preferred ingredients vary significantly between them.</p>
            <div className="pillar-grid">
              <div className="pillar-card">
                <h3>1. Post-Inflammatory Hyperpigmentation (PIH)</h3>
                <p><strong>What it is:</strong> Flat brown, red, or pink marks left behind after a pimple, wound, or burn heals.</p>
                <p><strong>Timeline:</strong> 4–12 weeks</p>
                <p><strong>Best for this:</strong> Niacinamide, Azelaic Acid, Vitamin C</p>
              </div>
              <div className="pillar-card">
                <h3>2. Sun Spots (Lentigines)</h3>
                <p><strong>What it is:</strong> Small, defined brown spots caused by accumulated UV exposure over years.</p>
                <p><strong>Timeline:</strong> 12–16 weeks</p>
                <p><strong>Best for this:</strong> Vitamin C, Retinoids, Kojic Acid</p>
              </div>
              <div className="pillar-card">
                <h3>3. Melasma</h3>
                <p><strong>What it is:</strong> Larger, symmetrical patches of brown or grayish pigmentation, often triggered by hormones and UV.</p>
                <p><strong>Timeline:</strong> 16–24+ weeks (requires ongoing management)</p>
                <p><strong>Best for this:</strong> Tranexamic Acid, Azelaic Acid</p>
              </div>
              <div className="pillar-card">
                <h3>4. Post-Inflammatory Erythema (PIE)</h3>
                <p><strong>What it is:</strong> Red or purplish marks from dilated blood vessels after inflammation, not melanin.</p>
                <p><strong>Timeline:</strong> 8–12 weeks</p>
                <p><strong>Best for this:</strong> Niacinamide, Centella Asiatica, time</p>
              </div>
            </div>
          </section>

          <section className="pillar-section">
            <h2>The Science: How to Block Melanin</h2>
            <p>Melanin is the pigment that gives skin its color. When triggered by UV light, hormones, or inflammation, your melanocytes (pigment factories) overproduce melanin. This melanin is packaged into parcels (melanosomes) and sent to your upper skin cells (keratinocytes).</p>
            <p>To effectively fade dark spots, you need a "multi-pathway" routine that attacks this process at different stages (see our <Link href="/ingredient-guide" style={{color: '#c05621', textDecoration: 'underline'}}>Master Ingredient Guide</Link> for more details):</p>
            <ul>
              <li><strong>Step 1: Inhibit Production.</strong> Ingredients like <Link href="/blog/how-long-does-vitamin-c-take-to-work"><em>Vitamin C</em></Link>, <em>Kojic Acid</em>, and <Link href="/blog/how-long-does-azelaic-acid-take-to-work"><em>Azelaic Acid</em></Link> inhibit the tyrosinase enzyme, preventing new melanin from being made.</li>
              <li><strong>Step 2: Block Transfer.</strong> <Link href="/blog/how-long-does-niacinamide-take-to-work"><em>Niacinamide</em></Link> prevents the melanin parcels from being transferred into the visible skin cells.</li>
              <li><strong>Step 3: Accelerate Shedding.</strong> <Link href="/blog/how-long-does-retinol-take-to-work"><em>Retinol</em></Link> and <Link href="/blog/how-long-does-glycolic-acid-take-to-work"><em>AHAs (Glycolic Acid)</em></Link> speed up cell turnover, shedding the already-pigmented cells faster.</li>
            </ul>
          </section>

          <section className="pillar-section">
            <h2>The Gold Standard Brightening Routine</h2>
            <p>For stubborn hyperpigmentation, this is the clinical standard routine:</p>
            <div className="pillar-routine">
              <div className="routine-step">
                <strong>AM Routine:</strong>
                <ul>
                  <li>Gentle Cleanser</li>
                  <li><strong>Vitamin C Serum</strong> (Inhibits production + protects against UV oxidation)</li>
                  <li><strong>SPF 50+</strong> (Mandatory. UV exposure reverses all progress)</li>
                </ul>
              </div>
              <div className="routine-step">
                <strong>PM Routine:</strong>
                <ul>
                  <li>Double Cleanse</li>
                  <li><strong>Niacinamide Serum</strong> (Blocks transfer)</li>
                  <li><strong>Retinol</strong> (Accelerates shedding)</li>
                  <li>Moisturizer</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="pillar-section pillar-faq">
            <h2>Frequently Asked Questions</h2>
            {faqSchema.mainEntity.map((qa) => (
              <details key={qa.name} className="pillar-faq-item">
                <summary>{qa.name}</summary>
                <p>{qa.acceptedAnswer.text}</p>
              </details>
            ))}
          </section>

          <section className="pillar-cta">
            <h2>Track Your Fading Progress</h2>
            <p>Because dark spots fade so slowly (over 12+ weeks), your memory will play tricks on you. Track your hyperpigmentation scientifically with Fasade.</p>
            <Link href="/#waitlist" className="pillar-cta-btn">Join the Fasade Waitlist →</Link>
          </section>
        </div>
      </main>

      <style>{`
        .pillar-page { font-family: var(--font-inter), system-ui, sans-serif; color: #1a1a2e; }
        .pillar-hero { background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%); color: #fff; padding: 80px 24px; text-align: center; }
        .pillar-hero__inner { max-width: 800px; margin: 0 auto; }
        .pillar-badge { display: inline-block; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #e2e8f0; font-size: 13px; font-weight: 500; padding: 5px 14px; border-radius: 99px; margin-bottom: 24px; }
        .pillar-hero h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; line-height: 1.15; margin: 0 0 20px; }
        .pillar-accent { background: linear-gradient(90deg, #fbd38d, #f6ad55); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .pillar-hero__sub { font-size: 1.1rem; color: #e2e8f0; line-height: 1.6; margin: 0 0 16px; }
        .pillar-byline { font-size: 13px; color: rgba(255,255,255,0.5); }
        .pillar-content { max-width: 800px; margin: 0 auto; padding: 60px 24px; }
        .pillar-section { margin-bottom: 64px; }
        .pillar-section h2 { font-size: 1.75rem; font-weight: 700; color: #1a202c; margin: 0 0 16px; }
        .pillar-section p { font-size: 1.05rem; line-height: 1.7; color: #4a5568; margin: 0 0 16px; }
        .pillar-section ul { padding-left: 20px; margin-bottom: 16px; }
        .pillar-section li { font-size: 1.05rem; color: #4a5568; margin-bottom: 8px; line-height: 1.6; }
        .pillar-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 24px; }
        .pillar-card { background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
        .pillar-card h3 { font-size: 1.15rem; color: #2d3748; margin: 0 0 12px; }
        .pillar-card p { font-size: 0.95rem; margin: 0 0 8px; }
        .pillar-routine { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #fffaf0; border: 1px solid #feebc8; border-radius: 12px; padding: 24px; margin-top: 24px; }
        .routine-step strong { display: block; margin-bottom: 12px; color: #c05621; }
        .pillar-faq-item { border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 12px; padding: 16px 20px; }
        .pillar-faq-item summary { font-weight: 600; cursor: pointer; color: #2d3748; }
        .pillar-faq-item p { margin: 12px 0 0; color: #4a5568; line-height: 1.6; }
        .pillar-cta { background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%); color: #fff; border-radius: 16px; padding: 48px 32px; text-align: center; }
        .pillar-cta h2 { color: #fff; margin-bottom: 16px; }
        .pillar-cta p { color: #e2e8f0; margin-bottom: 24px; }
        .pillar-cta-btn { display: inline-block; background: #fbd38d; color: #1a202c; font-weight: 700; padding: 14px 32px; border-radius: 8px; text-decoration: none; transition: opacity 0.2s; }
        .pillar-cta-btn:hover { opacity: 0.9; }
        @media (max-width: 600px) { .pillar-routine { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
