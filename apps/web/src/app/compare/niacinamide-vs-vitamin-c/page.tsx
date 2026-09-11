import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Niacinamide vs Vitamin C: Which is Better & Can You Mix Them? | Fasade',
  description: 'A head-to-head comparison of Niacinamide and Vitamin C. Learn the differences, which one is better for your skin concern, and how to layer them safely.',
  alternates: { canonical: '/compare/niacinamide-vs-vitamin-c' },
  openGraph: {
    title: 'Niacinamide vs Vitamin C: Which is Better?',
    description: 'Learn the differences, which one is better for your skin concern, and how to layer them safely.',
    type: 'article',
    authors: ['Raman Kumar Jha'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FasadeApp',
    title: 'Niacinamide vs Vitamin C: Which is Better?',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Can I use Niacinamide and Vitamin C together?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, you can use them together, but ideally not in the exact same step if your Vitamin C is L-ascorbic acid. L-ascorbic acid requires a very low pH (2.5-3.5), while Niacinamide is formulated around pH 5-6. The best approach is to use Vitamin C in the morning and Niacinamide at night, or wait 15 minutes between applying them.' },
    },
    {
      '@type': 'Question',
      'name': 'Which is better for acne scars: Niacinamide or Vitamin C?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'For red post-acne marks (PIE), Niacinamide is better due to its strong anti-inflammatory properties. For brown post-acne marks (PIH), using both is optimal: Vitamin C stops melanin production, while Niacinamide stops its transfer to the surface.' },
    },
    {
      '@type': 'Question',
      'name': 'Does Niacinamide cancel out Vitamin C?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'No. The myth that they cancel each other out comes from outdated research from the 1960s showing they form a complex (Niacinamide Ascorbate) at very high temperatures. At room temperature and normal skin pH, this is negligible.' },
    }
  ],
};

export default function NiacinamideVsVitaminCPage() {
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
            <h1><span className="compare-accent-1">Niacinamide</span> vs <span className="compare-accent-2">Vitamin C</span></h1>
            <p className="compare-hero__sub">
              Two of the most popular brightening ingredients in skincare. Discover the science behind how they work, which is better for your specific concerns, and the truth about mixing them.
            </p>
            <p className="compare-byline">By <strong>Raman Kumar Jha</strong> · Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </section>

        <div className="compare-content">
          <section className="compare-section">
            <h2>Head-to-Head Comparison</h2>
            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="th-col-1">Niacinamide (Vitamin B3)</th>
                    <th className="th-col-2">Vitamin C (L-Ascorbic Acid)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Primary Mechanism</strong></td>
                    <td><Link href="/blog/how-long-does-niacinamide-take-to-work">Blocks melanin transfer; Reduces sebum; Anti-inflammatory</Link></td>
                    <td><Link href="/blog/how-long-does-vitamin-c-take-to-work">Inhibits melanin production; Neutralizes free radicals (UV)</Link></td>
                  </tr>
                  <tr>
                    <td><strong>Best For</strong></td>
                    <td>Oily skin, large pores, redness, sensitive skin</td>
                    <td>Sun spots, dullness, collagen support, aging prevention</td>
                  </tr>
                  <tr>
                    <td><strong>Optimal pH</strong></td>
                    <td>pH 5.0 – 6.0 (Skin-neutral)</td>
                    <td>pH 2.5 – 3.5 (Highly acidic)</td>
                  </tr>
                  <tr>
                    <td><strong>Stability</strong></td>
                    <td>Extremely stable. Not affected by light or air.</td>
                    <td>Highly unstable. Oxidizes quickly in light/air.</td>
                  </tr>
                  <tr>
                    <td><strong>Irritation Potential</strong></td>
                    <td>Very low. Often used to soothe irritation.</td>
                    <td>Moderate to High. The low pH can sting sensitive skin.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="compare-section">
            <h2>The "Don't Mix Them" Myth</h2>
            <p>For years, beauty blogs claimed you cannot mix Niacinamide and Vitamin C because they "cancel each other out" or turn into nicotinic acid, causing flushing.</p>
            <p><strong>The Truth:</strong> This myth is based on a 1960s study using unsterilized, pure ingredients heated to extreme temperatures. In modern cosmetic formulations, at room temperature, the formation of nicotinic acid is negligible. They do not cancel each other out.</p>
            <p><strong>The Real Issue (pH):</strong> The only real concern is pH. L-ascorbic acid needs a very low pH to penetrate the skin. Niacinamide is formulated at a higher pH. Layering them directly on top of each other can temporarily alter the pH, making the Vitamin C slightly less effective or causing mild stinging.</p>
          </section>

          <section className="compare-section">
            <h2>How to Use Them Together (The Right Way)</h2>
            <p>Because they target hyperpigmentation through completely different pathways (Vitamin C stops the factory; Niacinamide stops the delivery truck), using them together is the ultimate brightening strategy.</p>
            <ul>
              <li><strong>The AM/PM Method (Best for Beginners):</strong> Use Vitamin C in the morning (for UV antioxidant protection) and Niacinamide at night (to repair the barrier).</li>
              <li><strong>The Wait Method:</strong> Apply Vitamin C on bare skin. Wait 10-15 minutes for it to absorb and the skin's pH to neutralize. Then apply Niacinamide.</li>
              <li><strong>Use a Derivative:</strong> If you use a Vitamin C derivative (like Ascorbyl Glucoside or THD Ascorbate), it operates at a similar pH to Niacinamide, so they can be layered immediately.</li>
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
            <h2>Track Your Brightening Results</h2>
            <p>Both <Link href="/blog/how-long-does-niacinamide-take-to-work" style={{color: '#9ca3af', textDecoration: 'underline'}}>Niacinamide</Link> and <Link href="/blog/how-long-does-vitamin-c-take-to-work" style={{color: '#9ca3af', textDecoration: 'underline'}}>Vitamin C</Link> take 8-12 weeks to show significant fading of dark spots. (See the <Link href="/skincare-routine-timeline" style={{color: '#9ca3af', textDecoration: 'underline'}}>Full Skincare Timeline</Link>). Don't rely on your memory—track your progress objectively.</p>
            <Link href="/#waitlist" className="compare-cta-btn">Join the Fasade Waitlist →</Link>
          </section>
        </div>
      </main>

      <style>{`
        .compare-page { font-family: var(--font-inter), system-ui, sans-serif; color: #1a1a2e; }
        .compare-hero { background: #fafafa; padding: 80px 24px; text-align: center; border-bottom: 1px solid #e5e7eb; }
        .compare-hero__inner { max-width: 800px; margin: 0 auto; }
        .compare-badge { display: inline-block; background: #fff; border: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; font-weight: 600; padding: 5px 14px; border-radius: 99px; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
        .compare-hero h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; line-height: 1.15; margin: 0 0 20px; color: #111; }
        .compare-accent-1 { color: #059669; }
        .compare-accent-2 { color: #d97706; }
        .compare-hero__sub { font-size: 1.1rem; color: #4b5563; line-height: 1.6; margin: 0 0 16px; }
        .compare-byline { font-size: 13px; color: #9ca3af; }
        .compare-content { max-width: 800px; margin: 0 auto; padding: 60px 24px; }
        .compare-section { margin-bottom: 64px; }
        .compare-section h2 { font-size: 1.75rem; font-weight: 700; color: #111; margin: 0 0 20px; }
        .compare-section p { font-size: 1.05rem; line-height: 1.7; color: #4b5563; margin: 0 0 16px; }
        .compare-section ul { padding-left: 20px; margin-bottom: 16px; }
        .compare-section li { font-size: 1.05rem; color: #4b5563; margin-bottom: 12px; line-height: 1.6; }
        .compare-table-wrapper { overflow-x: auto; border-radius: 12px; border: 1px solid #e5e7eb; margin-top: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .compare-table { width: 100%; border-collapse: collapse; background: #fff; }
        .compare-table th, .compare-table td { padding: 16px; font-size: 0.95rem; border-bottom: 1px solid #e5e7eb; text-align: left; }
        .compare-table th { background: #f9fafb; font-weight: 700; color: #111; }
        .th-col-1 { color: #059669 !important; }
        .th-col-2 { color: #d97706 !important; }
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
