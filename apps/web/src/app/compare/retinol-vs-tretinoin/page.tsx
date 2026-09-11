import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Retinol vs Tretinoin: What is the Difference & Which is Better? | Fasade',
  description: 'Understand the retinoid conversion pathway. Compare over-the-counter Retinol against prescription Tretinoin (Retin-A) for anti-aging, acne, and irritation.',
  alternates: { canonical: '/compare/retinol-vs-tretinoin' },
  openGraph: {
    title: 'Retinol vs Tretinoin: What is the Difference?',
    description: 'Compare OTC Retinol against prescription Tretinoin for anti-aging and acne.',
    type: 'article',
    authors: ['Raman Kumar Jha'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FasadeApp',
    title: 'Retinol vs Tretinoin: What is the Difference?',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Is Tretinoin better than Retinol?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Tretinoin is significantly stronger and works much faster than retinol because it is already in the active form (retinoic acid). However, "better" depends on your skin. Tretinoin is highly irritating and can damage a sensitive skin barrier, whereas Retinol is gentler and better for beginners.' },
    },
    {
      '@type': 'Question',
      'name': 'Can I switch from Retinol to Tretinoin?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, and this is the recommended path. Using an OTC retinol for 3-6 months "retinizes" the skin, building up retinoid receptors. This makes the eventual transition to prescription Tretinoin much smoother with less severe purging and peeling.' },
    },
    {
      '@type': 'Question',
      'name': 'How long does it take to see results from Tretinoin vs Retinol?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Tretinoin can show anti-acne results in 6-8 weeks and anti-aging results in 3-4 months. Retinol takes roughly twice as long: 12 weeks for texture/acne and 6 months for significant collagen production/anti-aging.' },
    }
  ],
};

export default function RetinolVsTretinoinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="compare-page">
        <section className="compare-hero">
          <div className="compare-hero__inner">
            <div className="compare-badge">Ingredient Comparison</div>
            <h1><span className="compare-accent-1">Retinol</span> vs <span className="compare-accent-2">Tretinoin</span></h1>
            <p className="compare-hero__sub">
              The ultimate anti-aging and acne battle. Learn the retinoid conversion pathway, why one requires a prescription, and which one is right for your skin journey.
            </p>
            <p className="compare-byline">By <strong>Raman Kumar Jha</strong> · Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </section>

        <div className="compare-content">
          <section className="compare-section">
            <h2>The Retinoid Conversion Pathway</h2>
            <p>To understand the difference, you must understand how retinoids work. Your skin can only use Vitamin A in one specific form: <strong>Retinoic Acid</strong>.</p>
            <p>When you apply an over-the-counter (OTC) retinoid, your skin's enzymes must convert it into Retinoic Acid before it can do anything. The more conversion steps required, the weaker and gentler the ingredient becomes.</p>
            
            <div className="conversion-pathway">
              <div className="pathway-step">
                <strong>Retinyl Palmitate</strong>
                <span>(3 Conversions) • Weakest</span>
              </div>
              <div className="pathway-arrow">↓</div>
              <div className="pathway-step highlight-retinol">
                <strong><Link href="/blog/how-long-does-retinol-take-to-work">Retinol</Link></strong>
                <span>(2 Conversions) • Gold Standard OTC</span>
              </div>
              <div className="pathway-arrow">↓</div>
              <div className="pathway-step">
                <strong>Retinaldehyde (Retinal)</strong>
                <span>(1 Conversion) • Strongest OTC</span>
              </div>
              <div className="pathway-arrow">↓</div>
              <div className="pathway-step highlight-tretinoin">
                <strong>Retinoic Acid (Tretinoin)</strong>
                <span>(0 Conversions) • Prescription Only</span>
              </div>
            </div>
          </section>

          <section className="compare-section">
            <h2>Head-to-Head Comparison</h2>
            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="th-col-1">Retinol (OTC)</th>
                    <th className="th-col-2">Tretinoin (Prescription)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Bioavailability</strong></td>
                    <td>Requires 2 enzymatic conversions in the skin.</td>
                    <td>Active immediately. Binds directly to RAR receptors.</td>
                  </tr>
                  <tr>
                    <td><strong>Strength</strong></td>
                    <td>Gentle to moderate.</td>
                    <td>Roughly 20x more potent than Retinol.</td>
                  </tr>
                  <tr>
                    <td><strong>Timeline to Results</strong></td>
                    <td>12–24 weeks</td>
                    <td>6–12 weeks</td>
                  </tr>
                  <tr>
                    <td><strong>Irritation & Purging</strong></td>
                    <td>Mild peeling and purging (Weeks 2-6).</td>
                    <td>Severe peeling, redness, and purging ("The Tret Uglies").</td>
                  </tr>
                  <tr>
                    <td><strong>Best For</strong></td>
                    <td>Beginners, sensitive skin, anti-aging maintenance.</td>
                    <td>Severe acne, deep wrinkles, stubborn hyperpigmentation.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="compare-section">
            <h2>Which Should You Choose?</h2>
            
            <h3>Start with Retinol if:</h3>
            <ul>
              <li>You have never used a retinoid before.</li>
              <li>You have sensitive, dry, or rosacea-prone skin.</li>
              <li>Your primary goal is preventative anti-aging.</li>
              <li>You want to avoid severe peeling and downtime.</li>
            </ul>

            <h3>Graduate to Tretinoin if:</h3>
            <ul>
              <li>You have severe, persistent acne that OTC products haven't fixed.</li>
              <li>You have used a 1% Retinol for 6+ months and your skin is fully tolerant.</li>
              <li>You want to treat deep, existing wrinkles and severe photoaging.</li>
              <li>You are willing to endure a 4-8 week adjustment period of flaking skin.</li>
            </ul>
          </section>

          <section className="compare-section compare-faq">
            <h2>Frequently Asked Questions</h2>
            {faqSchema.mainEntity.map((qa) => (
              <details key={qa.name} className="compare-faq-item">
                <summary>{qa.name}</summary>
                <p>{qa.acceptedAnswer.text}</p>
              </details>
            ))}
          </section>

          <section className="compare-cta">
            <h2>Track the "Purge"</h2>
            <p>Both <Link href="/blog/how-long-does-retinol-take-to-work" style={{color: '#9ca3af', textDecoration: 'underline'}}>Retinol</Link> and Tretinoin cause a purging phase where skin looks worse before it gets better. Don't quit early. (Read more in our <Link href="/skincare-routine-timeline" style={{color: '#9ca3af', textDecoration: 'underline'}}>Skincare Timeline Guide</Link>). Track your 12-week retinization journey with Fasade.</p>
            <Link href="/#waitlist" className="compare-cta-btn">Join the Fasade Waitlist →</Link>
          </section>
        </div>
      </main>

      <style>{`
        /* Reusing the comparison page styles from Niacinamide vs Vit C */
        .compare-page { font-family: var(--font-inter), system-ui, sans-serif; color: #1a1a2e; }
        .compare-hero { background: #fafafa; padding: 80px 24px; text-align: center; border-bottom: 1px solid #e5e7eb; }
        .compare-hero__inner { max-width: 800px; margin: 0 auto; }
        .compare-badge { display: inline-block; background: #fff; border: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; font-weight: 600; padding: 5px 14px; border-radius: 99px; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
        .compare-hero h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; line-height: 1.15; margin: 0 0 20px; color: #111; }
        .compare-accent-1 { color: #2563eb; } /* Blue for Retinol */
        .compare-accent-2 { color: #dc2626; } /* Red for Tretinoin */
        .compare-hero__sub { font-size: 1.1rem; color: #4b5563; line-height: 1.6; margin: 0 0 16px; }
        .compare-byline { font-size: 13px; color: #9ca3af; }
        .compare-content { max-width: 800px; margin: 0 auto; padding: 60px 24px; }
        .compare-section { margin-bottom: 64px; }
        .compare-section h2 { font-size: 1.75rem; font-weight: 700; color: #111; margin: 0 0 20px; }
        .compare-section h3 { font-size: 1.25rem; font-weight: 600; color: #111; margin: 32px 0 12px; }
        .compare-section p { font-size: 1.05rem; line-height: 1.7; color: #4b5563; margin: 0 0 16px; }
        .compare-section ul { padding-left: 20px; margin-bottom: 16px; }
        .compare-section li { font-size: 1.05rem; color: #4b5563; margin-bottom: 12px; line-height: 1.6; }
        
        .conversion-pathway { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; text-align: center; margin: 32px 0; }
        .pathway-step { padding: 16px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .pathway-step strong { display: block; font-size: 1.1rem; color: #1e293b; margin-bottom: 4px; }
        .pathway-step span { font-size: 0.9rem; color: #64748b; }
        .pathway-arrow { font-size: 1.5rem; color: #94a3b8; margin: 8px 0; }
        .highlight-retinol { border-color: #93c5fd; background: #eff6ff; }
        .highlight-retinol strong { color: #2563eb; }
        .highlight-tretinoin { border-color: #fca5a5; background: #fef2f2; }
        .highlight-tretinoin strong { color: #dc2626; }

        .compare-table-wrapper { overflow-x: auto; border-radius: 12px; border: 1px solid #e5e7eb; margin-top: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .compare-table { width: 100%; border-collapse: collapse; background: #fff; }
        .compare-table th, .compare-table td { padding: 16px; font-size: 0.95rem; border-bottom: 1px solid #e5e7eb; text-align: left; }
        .compare-table th { background: #f9fafb; font-weight: 700; color: #111; }
        .th-col-1 { color: #2563eb !important; }
        .th-col-2 { color: #dc2626 !important; }
        .compare-table tr:last-child td { border-bottom: none; }
        .compare-faq-item { border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 12px; padding: 16px 20px; background: #fff; }
        .compare-faq-item summary { font-weight: 600; cursor: pointer; color: #111; font-size: 1.05rem; }
        .compare-faq-item p { margin: 12px 0 0; color: #4b5563; line-height: 1.6; }
        .compare-cta { background: #111; color: #fff; border-radius: 16px; padding: 48px 32px; text-align: center; }
        .compare-cta h2 { color: #fff; margin-bottom: 16px; }
        .compare-cta p { color: #9ca3af; margin-bottom: 24px; }
        .compare-cta-btn { display: inline-block; background: #fff; color: #111; font-weight: 700; padding: 14px 32px; border-radius: 8px; text-decoration: none; transition: background 0.2s; }
        .compare-cta-btn:hover { background: #f3f4f6; }
      `}</style>
    </>
  );
}
