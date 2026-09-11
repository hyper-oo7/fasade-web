import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Clear Acne: The Complete Science-Backed Guide | Fasade',
  description: 'Understand the 4 stages of acne formation and the exact ingredients (BHA, Benzoyl Peroxide, Retinoids) required to treat them. Stop the breakout cycle.',
  alternates: { canonical: '/concerns/how-to-clear-acne' },
  openGraph: {
    title: 'How to Clear Acne: The Complete Science-Backed Guide',
    description: 'Understand the 4 stages of acne formation and the exact ingredients required to treat them.',
    type: 'article',
    authors: ['Raman Kumar Jha'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FasadeApp',
    title: 'How to Clear Acne: The Complete Science-Backed Guide',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'How long does it take for acne to clear up?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'A full acne treatment cycle takes 8-12 weeks. Surface inflammation can reduce in 1-2 weeks, but clearing the underlying microcomedones (clogged pores) takes roughly 3 cell turnover cycles (about 3 months).' },
    },
    {
      '@type': 'Question',
      'name': 'Should I use Benzoyl Peroxide or Salicylic Acid?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Use Salicylic Acid (BHA) for blackheads, whiteheads, and oily skin, as it clears inside the pore. Use Benzoyl Peroxide for inflamed, red, angry pimples, as it kills the acne-causing bacteria rapidly.' },
    },
    {
      '@type': 'Question',
      'name': 'Why is my acne getting worse after starting treatment?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'If you started a Retinoid or BHA, this is likely a "purge" — the rapid cell turnover is bringing pre-existing clogged pores to the surface faster. This lasts 2-6 weeks. If it lasts longer, it may be irritation, not a purge.' },
    }
  ],
};

export default function ClearAcnePage() {
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
            <h1>How to <span className="pillar-accent">Clear Acne</span></h1>
            <p className="pillar-hero__sub">
              Acne is not caused by "dirty skin." It is a multi-stage inflammatory disease. Learn the 4 stages of a breakout and the exact clinical ingredients needed to break the cycle.
            </p>
            <p className="pillar-byline">By <strong>Raman Kumar Jha</strong> · Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </section>

        <div className="pillar-content">
          <section className="pillar-section">
            <h2>The 4 Stages of Acne (The Pathogenesis)</h2>
            <p>Every single pimple goes through the same four stages. To clear acne completely, your routine must address all four steps.</p>
            
            <div className="pillar-grid">
              <div className="pillar-card">
                <h3>1. Excess Sebum Production</h3>
                <p><strong>The problem:</strong> Sebaceous glands overproduce oil, often triggered by hormones.</p>
                <p><strong>The solution:</strong> <Link href="/blog/how-long-does-niacinamide-take-to-work">Niacinamide</Link> (reduces sebum), <Link href="/compare/retinol-vs-tretinoin">Retinoids</Link> (normalize gland activity).</p>
              </div>
              <div className="pillar-card">
                <h3>2. Hyperkeratinization</h3>
                <p><strong>The problem:</strong> Dead skin cells don't shed properly and stick together, creating a plug (microcomedone).</p>
                <p><strong>The solution:</strong> <Link href="/blog/how-long-does-salicylic-acid-take-to-work">Salicylic Acid (BHA)</Link>, Retinoids (accelerate shedding).</p>
              </div>
              <div className="pillar-card">
                <h3>3. Bacterial Overgrowth</h3>
                <p><strong>The problem:</strong> <em>C. acnes</em> bacteria feed on the trapped oil in the oxygen-deprived pore and multiply.</p>
                <p><strong>The solution:</strong> <Link href="/blog/how-long-does-benzoyl-peroxide-take-to-work">Benzoyl Peroxide</Link> (kills bacteria), Azelaic Acid.</p>
              </div>
              <div className="pillar-card">
                <h3>4. Inflammation</h3>
                <p><strong>The problem:</strong> Your immune system attacks the bacteria, causing a red, swollen, painful bump.</p>
                <p><strong>The solution:</strong> <Link href="/blog/how-long-does-azelaic-acid-take-to-work">Azelaic Acid</Link>, Centella Asiatica, Ice (for immediate swelling).</p>
              </div>
            </div>
          </section>

          <section className="pillar-section">
            <h2>The Purge vs. Irritation</h2>
            <p>When you start a strong acne treatment (like Retinol or Salicylic Acid), your skin may get worse before it gets better. This is called a purge. (Check our <Link href="/skincare-routine-timeline" style={{color: '#2563eb', textDecoration: 'underline'}}>Skincare Timeline Guide</Link> for exact purge timelines).</p>
            <ul>
              <li><strong>A Purge:</strong> Occurs in areas you normally break out. It consists of existing clogs coming to the surface rapidly. Lasts 2–6 weeks. Keep pushing through.</li>
              <li><strong>Irritation:</strong> Breakouts in new areas, severe redness, burning, stinging, or tiny red bumps (contact dermatitis). Stop immediately and repair your barrier.</li>
            </ul>
          </section>

          <section className="pillar-section">
            <h2>The Acne-Clearing Protocol</h2>
            <p>Start with this simple, evidence-based routine. Do not add 5 new products at once.</p>
            <div className="pillar-routine">
              <div className="routine-step">
                <strong>AM Routine:</strong>
                <ul>
                  <li>Gentle Cleanser (Not harsh scrubs)</li>
                  <li><strong>Niacinamide or Azelaic Acid</strong> (For oil control and inflammation)</li>
                  <li>Lightweight Moisturizer</li>
                  <li><strong>SPF</strong> (Prevents acne marks from turning brown)</li>
                </ul>
              </div>
              <div className="routine-step">
                <strong>PM Routine:</strong>
                <ul>
                  <li>Double Cleanse (Removes SPF and oil)</li>
                  <li><strong>Salicylic Acid (BHA) OR Benzoyl Peroxide</strong> (Alternate nights or pick one based on acne type)</li>
                  <li>Barrier-Repair Moisturizer</li>
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
            <h2>Track Your Clear Skin Journey</h2>
            <p>Acne takes 8-12 weeks to clear. Without tracking, you might abandon a working product during the purge phase. Track your progress with Fasade.</p>
            <Link href="/#waitlist" className="pillar-cta-btn">Join the Fasade Waitlist →</Link>
          </section>
        </div>
      </main>

      <style>{`
        /* Same CSS as dark spots page for consistency */
        .pillar-page { font-family: var(--font-inter), system-ui, sans-serif; color: #1a1a2e; }
        .pillar-hero { background: linear-gradient(135deg, #1e3a8a 0%, #172554 100%); color: #fff; padding: 80px 24px; text-align: center; }
        .pillar-hero__inner { max-width: 800px; margin: 0 auto; }
        .pillar-badge { display: inline-block; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #bfdbfe; font-size: 13px; font-weight: 500; padding: 5px 14px; border-radius: 99px; margin-bottom: 24px; }
        .pillar-hero h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; line-height: 1.15; margin: 0 0 20px; }
        .pillar-accent { background: linear-gradient(90deg, #93c5fd, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .pillar-hero__sub { font-size: 1.1rem; color: #bfdbfe; line-height: 1.6; margin: 0 0 16px; }
        .pillar-byline { font-size: 13px; color: rgba(255,255,255,0.5); }
        .pillar-content { max-width: 800px; margin: 0 auto; padding: 60px 24px; }
        .pillar-section { margin-bottom: 64px; }
        .pillar-section h2 { font-size: 1.75rem; font-weight: 700; color: #1e3a8a; margin: 0 0 16px; }
        .pillar-section p { font-size: 1.05rem; line-height: 1.7; color: #4b5563; margin: 0 0 16px; }
        .pillar-section ul { padding-left: 20px; margin-bottom: 16px; }
        .pillar-section li { font-size: 1.05rem; color: #4b5563; margin-bottom: 8px; line-height: 1.6; }
        .pillar-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 24px; }
        .pillar-card { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 24px; }
        .pillar-card h3 { font-size: 1.15rem; color: #1e3a8a; margin: 0 0 12px; }
        .pillar-card p { font-size: 0.95rem; margin: 0 0 8px; }
        .pillar-routine { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-top: 24px; }
        .routine-step strong { display: block; margin-bottom: 12px; color: #2563eb; }
        .pillar-faq-item { border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 12px; padding: 16px 20px; }
        .pillar-faq-item summary { font-weight: 600; cursor: pointer; color: #1e3a8a; }
        .pillar-faq-item p { margin: 12px 0 0; color: #4b5563; line-height: 1.6; }
        .pillar-cta { background: linear-gradient(135deg, #1e3a8a 0%, #172554 100%); color: #fff; border-radius: 16px; padding: 48px 32px; text-align: center; }
        .pillar-cta h2 { color: #fff; margin-bottom: 16px; }
        .pillar-cta p { color: #bfdbfe; margin-bottom: 24px; }
        .pillar-cta-btn { display: inline-block; background: #93c5fd; color: #172554; font-weight: 700; padding: 14px 32px; border-radius: 8px; text-decoration: none; transition: opacity 0.2s; }
        .pillar-cta-btn:hover { opacity: 0.9; }
        @media (max-width: 600px) { .pillar-routine { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
