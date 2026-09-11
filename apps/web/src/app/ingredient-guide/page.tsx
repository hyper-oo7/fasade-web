import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogs } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Skincare Ingredient Guide: What Every Active Ingredient Does | Fasade',
  description: 'The complete skincare ingredient reference. Learn what retinol, niacinamide, vitamin C, hyaluronic acid, AHAs, peptides, and 30+ other ingredients do, how to use them, and what to combine.',
  alternates: { canonical: '/ingredient-guide' },
  openGraph: {
    title: 'Skincare Ingredient Guide: What Every Active Ingredient Does',
    description: 'The complete reference for 30+ skincare ingredients — mechanisms, timelines, and combination rules.',
    type: 'article',
    authors: ['Raman Kumar Jha'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FasadeApp',
    title: 'Skincare Ingredient Guide: What Every Active Ingredient Does',
    description: 'The complete reference for 30+ skincare ingredients — mechanisms, timelines, and combination rules.',
  },
};

const ingredients = [
  {
    name: 'Retinol',
    emoji: '⭐',
    category: 'Anti-aging · Acne',
    tagline: 'The gold standard for anti-aging and acne',
    mechanism: 'Converts to retinoic acid in skin, binding to nuclear receptors to upregulate collagen synthesis and accelerate cell turnover.',
    concerns: ['Fine lines & wrinkles', 'Acne & congestion', 'Hyperpigmentation', 'Skin texture'],
    timeline: '4–16 weeks',
    difficulty: 'Advanced',
    diffColor: '#dc2626',
    canCombine: ['Niacinamide (buffer)', 'Peptides (AM)', 'Ceramides (moisturiser after)'],
    avoid: ['Benzoyl peroxide (same night)', 'AHAs/BHAs (same night)', 'Vitamin C (same step)'],
    slug: 'how-long-does-retinol-take-to-work',
  },
  {
    name: 'Niacinamide',
    emoji: '✨',
    category: 'Multi-benefit',
    tagline: 'The universal skin-balancing vitamin',
    mechanism: 'Inhibits melanosome transfer to reduce pigmentation. Upregulates ceramide synthesis. Suppresses sebaceous gland activity.',
    concerns: ['Oiliness & sebum', 'Large pores', 'Hyperpigmentation', 'Skin barrier', 'Redness'],
    timeline: '4–12 weeks',
    difficulty: 'Beginner',
    diffColor: '#059669',
    canCombine: ['Retinol (buffer layer)', 'Vitamin C (separate step)', 'Hyaluronic acid', 'Salicylic acid'],
    avoid: ['High-concentration L-ascorbic acid in same step (theoretical concern)'],
    slug: 'how-long-does-niacinamide-take-to-work',
  },
  {
    name: 'Vitamin C (L-Ascorbic Acid)',
    emoji: '☀️',
    category: 'Brightening · Antioxidant',
    tagline: 'The most studied brightener and antioxidant',
    mechanism: 'Inhibits tyrosinase at its copper-binding site to reduce melanin synthesis. Acts as co-factor for collagen-stabilising enzymes. Neutralises UV-induced ROS.',
    concerns: ['Dark spots', 'Dullness & glow', 'Fine lines', 'UV protection (with SPF)', 'Collagen support'],
    timeline: '4–12 weeks',
    difficulty: 'Moderate',
    diffColor: '#d97706',
    canCombine: ['SPF (synergistic UV protection)', 'Vitamin E + ferulic acid (stabilises)','Niacinamide (separate step)'],
    avoid: ['Retinol (same step — pH mismatch)', 'Benzoyl peroxide (oxidises vitamin C)', 'Copper peptides (same step)'],
    slug: 'how-long-does-vitamin-c-take-to-work',
  },
  {
    name: 'Hyaluronic Acid',
    emoji: '💧',
    category: 'Hydration',
    tagline: 'The most effective topical humectant',
    mechanism: 'Draws and holds up to 1,000× its weight in water. High MW HA films on surface; low MW HA penetrates epidermis for sustained hydration.',
    concerns: ['Dehydration', 'Dullness', 'Fine lines (dehydration)', 'Sensitive / reactive skin'],
    timeline: 'Hours–4 weeks',
    difficulty: 'Beginner',
    diffColor: '#059669',
    canCombine: ['Everything — works as base layer under any serum', 'Niacinamide', 'Ceramides', 'Retinol (apply first)'],
    avoid: ['Dry climates without occlusive — will draw moisture from skin instead of air'],
    slug: 'how-long-does-hyaluronic-acid-take-to-work',
  },
  {
    name: 'Salicylic Acid (BHA)',
    emoji: '🔬',
    category: 'Acne · Exfoliation',
    tagline: 'The only oil-soluble exfoliant — pore-clearing specialist',
    mechanism: 'Oil-soluble keratolytic that dissolves the sebum-cell mixture inside follicles. Anti-inflammatory properties calm active papules.',
    concerns: ['Acne & breakouts', 'Blackheads & whiteheads', 'Oily skin', 'Congested pores'],
    timeline: '4–12 weeks',
    difficulty: 'Beginner',
    diffColor: '#059669',
    canCombine: ['Niacinamide (sebum control)', 'Benzoyl peroxide (different nights)', 'Hyaluronic acid (rehydrate after)'],
    avoid: ['Retinol on same night (over-irritation)', 'Glycolic acid same step (pH stacking)'],
    slug: 'how-long-does-salicylic-acid-take-to-work',
  },
  {
    name: 'Glycolic Acid (AHA)',
    emoji: '🧪',
    category: 'Exfoliation · Brightening',
    tagline: 'The smallest AHA with the deepest penetration',
    mechanism: 'Loosens ionic bonds between corneocytes, accelerating desquamation. At >10%, stimulates fibroblast activity and collagen synthesis.',
    concerns: ['Dull texture', 'Mild hyperpigmentation', 'Fine lines', 'Rough skin'],
    timeline: '4–12 weeks',
    difficulty: 'Moderate',
    diffColor: '#d97706',
    canCombine: ['Vitamin C (different nights)', 'Retinol (alternate nights)', 'Hyaluronic acid (after)'],
    avoid: ['Retinol same night', 'BHAs same step at high strength', 'SPF (use next AM — photosensitising)'],
    slug: 'how-long-does-glycolic-acid-take-to-work',
  },
  {
    name: 'Benzoyl Peroxide',
    emoji: '⚗️',
    category: 'Acne',
    tagline: 'The fastest-acting bactericidal acne treatment',
    mechanism: 'Releases free radical oxygen, destroying C. acnes bacteria. No resistance can develop. Mild comedolytic activity.',
    concerns: ['Inflammatory acne', 'Cystic spots', 'Bacterial congestion'],
    timeline: '1–8 weeks',
    difficulty: 'Moderate',
    diffColor: '#d97706',
    canCombine: ['Moisturiser (essential — very drying)', 'Hyaluronic acid (before)'],
    avoid: ['Retinol (oxidises both)', 'Vitamin C same step', 'Wear white clothes — bleaches fabric'],
    slug: 'how-long-does-benzoyl-peroxide-take-to-work',
  },
  {
    name: 'Ceramides',
    emoji: '🛡️',
    category: 'Barrier · Repair',
    tagline: 'The skin barrier\'s structural foundation',
    mechanism: 'Sphingolipids that constitute ~50% of stratum corneum lipid matrix. Replenish the lamellar bodies that prevent TEWL.',
    concerns: ['Damaged barrier', 'Dry / flaky skin', 'Sensitive reactive skin', 'Eczema-prone'],
    timeline: '1–8 weeks',
    difficulty: 'Beginner',
    diffColor: '#059669',
    canCombine: ['Everything — use as moisturiser/barrier layer after all actives', 'Hyaluronic acid', 'Niacinamide'],
    avoid: ['Nothing — universally compatible'],
    slug: 'how-long-does-ceramide-take-to-repair-skin',
  },
  {
    name: 'Azelaic Acid',
    emoji: '🌾',
    category: 'Brightening · Acne · Anti-inflammatory',
    tagline: 'The gentle triple-threat for acne, pigmentation, and rosacea',
    mechanism: 'Inhibits tyrosinase selectively in hyperactive melanocytes. Bacteriostatic against C. acnes. Reduces inflammatory markers in rosacea.',
    concerns: ['Rosacea & redness', 'Post-acne marks (PIH)', 'Melasma', 'Pregnancy-safe brightening'],
    timeline: '4–16 weeks',
    difficulty: 'Beginner',
    diffColor: '#059669',
    canCombine: ['Niacinamide', 'Tranexamic acid', 'Hyaluronic acid', 'SPF'],
    avoid: ['Nothing significant at standard OTC concentrations'],
    slug: 'how-long-does-azelaic-acid-take-to-work',
  },
  {
    name: 'Peptides',
    emoji: '🔗',
    category: 'Anti-aging',
    tagline: 'Biological signals that trigger collagen synthesis',
    mechanism: 'Signal peptides mimic collagen fragments to stimulate fibroblasts. Carrier peptides deliver copper. Neurotransmitter peptides reduce expression lines.',
    concerns: ['Fine lines', 'Collagen loss', 'Skin firmness', 'Elasticity', 'Expression lines'],
    timeline: '8–16 weeks',
    difficulty: 'Beginner',
    diffColor: '#059669',
    canCombine: ['Niacinamide', 'Hyaluronic acid', 'Retinol (use peptides AM, retinol PM)', 'SPF'],
    avoid: ['AHAs/BHAs in same step (pH degrades peptide bonds)', 'Vitamin C high concentration same step'],
    slug: 'how-long-do-peptides-take-to-work',
  },
  {
    name: 'Tranexamic Acid',
    emoji: '🎯',
    category: 'Brightening',
    tagline: 'The most effective melasma treatment available OTC',
    mechanism: 'Blocks plasmin-mediated prostaglandin synthesis, interrupting the inflammation-to-melanin signaling pathway. Especially effective for PIH and melasma.',
    concerns: ['Melasma', 'Post-inflammatory hyperpigmentation', 'Uneven skin tone'],
    timeline: '4–16 weeks',
    difficulty: 'Beginner',
    diffColor: '#059669',
    canCombine: ['Niacinamide (synergistic, different pathways)', 'Vitamin C (triple brightening stack)', 'Azelaic acid', 'SPF'],
    avoid: ['Nothing significant'],
    slug: 'how-long-does-tranexamic-acid-take-to-work',
  },
  {
    name: 'Bakuchiol',
    emoji: '🌿',
    category: 'Anti-aging (Retinol alternative)',
    tagline: 'Plant-derived retinol alternative for sensitive skin',
    mechanism: 'Upregulates same genes as retinol (collagen, elastin, fibrillin) through a different receptor pathway, without binding RARs that cause irritation.',
    concerns: ['Anti-aging', 'Fine lines', 'Sensitive skin', 'Pregnancy-safe retinol alternative'],
    timeline: '8–12 weeks',
    difficulty: 'Beginner',
    diffColor: '#059669',
    canCombine: ['Niacinamide', 'Vitamin C (can use AM — photostable)', 'Hyaluronic acid', 'Peptides'],
    avoid: ['Nothing significant — the main advantage over retinol'],
    slug: 'how-long-does-bakuchiol-take-to-work',
  },
];

const compatibilityMatrix = [
  { a: 'Vitamin C', b: 'Niacinamide', status: 'caution', note: 'Use in separate AM/PM steps or different formulations' },
  { a: 'Retinol', b: 'AHAs/BHAs', status: 'avoid', note: 'Use on alternate nights. Combined use causes severe irritation.' },
  { a: 'Retinol', b: 'Benzoyl Peroxide', status: 'avoid', note: 'BPO oxidises and degrades retinol. Use on different nights.' },
  { a: 'Retinol', b: 'Niacinamide', status: 'great', note: 'Niacinamide reduces retinol irritation. Layer niacinamide after retinol.' },
  { a: 'Vitamin C', b: 'Vitamin E + Ferulic', status: 'great', note: 'Classic antioxidant synergy — dramatically increases stability and efficacy.' },
  { a: 'Salicylic Acid', b: 'Niacinamide', status: 'great', note: 'Complementary sebum control. Use salicylic PM, niacinamide AM+PM.' },
  { a: 'Peptides', b: 'AHAs', status: 'caution', note: 'AHA pH (3.5) can hydrolyse peptide bonds. Use in separate steps or routines.' },
  { a: 'Copper Peptides', b: 'Vitamin C', status: 'avoid', note: 'Vitamin C is copper-chelating — it can deactivate copper peptide complexes.' },
  { a: 'Hyaluronic Acid', b: 'Everything', status: 'great', note: 'HA is universally compatible. Use as the base layer under any serum.' },
];

const statusStyle: Record<string, { color: string; label: string; bg: string }> = {
  great: { color: '#059669', label: '✅ Great', bg: '#ecfdf5' },
  caution: { color: '#d97706', label: '⚠️ Caution', bg: '#fffbeb' },
  avoid: { color: '#dc2626', label: '🚫 Avoid', bg: '#fef2f2' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Can I use retinol and vitamin C together?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Not in the same step. Vitamin C (L-ascorbic acid) functions at pH 2.5–3.5, while retinol is stable at pH 5–6. Using them together creates pH incompatibility. Use vitamin C in the morning and retinol at night.' },
    },
    {
      '@type': 'Question',
      'name': 'What skincare ingredients should never be mixed?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'Never combine: Retinol + benzoyl peroxide (BPO oxidises retinol), Retinol + AHAs on the same night (severe irritation), Vitamin C + copper peptides (vitamin C chelates the copper), Physical sunscreen + certain acids (can cause pilling and reduce SPF efficacy).' },
    },
    {
      '@type': 'Question',
      'name': 'What skincare ingredients work best together?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'High-synergy combinations include: Vitamin C + Vitamin E + Ferulic acid (antioxidant trifecta), Niacinamide + Salicylic acid (oily/acne skin), Retinol + Niacinamide (anti-aging with irritation buffer), Tranexamic acid + Niacinamide + Vitamin C (triple brightening).' },
    },
    {
      '@type': 'Question',
      'name': 'How many skincare ingredients can I use at once?',
      'acceptedAnswer': { '@type': 'Answer', 'text': 'For beginners, 3–4 is ideal: a cleanser, one active serum, a moisturiser, and SPF. Advanced users can layer more, but introduce one new ingredient every 2 weeks. More ingredients = harder to identify reactions and results.' },
    },
  ],
};

export default async function IngredientGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="ingredient-guide">
        {/* Hero */}
        <section className="ig-hero">
          <div className="ig-hero__inner">
            <div className="ig-badge">Complete Reference · 30+ Ingredients</div>
            <h1>
              Skincare Ingredient Guide:<br />
              <span className="ig-accent">What Every Active Ingredient Does</span>
            </h1>
            <p className="ig-sub">
              The complete reference for active skincare ingredients. Mechanisms, timelines, combination rules, and
              clinical evidence — for every key ingredient in modern skincare.
            </p>
            <p className="ig-byline">
              By <strong>Raman Kumar Jha</strong>, Founder & Skincare Technology Researcher ·{' '}
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </section>

        <div className="ig-content">

          {/* Ingredient cards */}
          <section className="ig-section">
            <h2>Ingredient Reference</h2>
            <p>Each card includes the mechanism, best uses, timeline, combination rules, and a link to the full clinical guide.</p>

            <div className="ig-grid">
              {ingredients.map((ing) => (
                <div key={ing.name} className="ig-card">
                  <div className="ig-card__header">
                    <span className="ig-card__emoji">{ing.emoji}</span>
                    <div>
                      <h3 className="ig-card__name">{ing.name}</h3>
                      <span className="ig-card__category">{ing.category}</span>
                    </div>
                    <span className="ig-card__diff" style={{ color: ing.diffColor }}>{ing.difficulty}</span>
                  </div>
                  <p className="ig-card__tagline">{ing.tagline}</p>
                  <div className="ig-card__mech">
                    <strong>How it works:</strong> {ing.mechanism}
                  </div>
                  <div className="ig-card__concerns">
                    <strong>Best for:</strong>
                    <div className="ig-tags">
                      {ing.concerns.map((c) => (
                        <span key={c} className="ig-tag">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div className="ig-card__meta">
                    <div>
                      <span className="ig-meta-label">Timeline</span>
                      <span className="ig-meta-val">{ing.timeline}</span>
                    </div>
                  </div>
                  <details className="ig-card__combos">
                    <summary>Combinations</summary>
                    <div className="ig-combo-section">
                      <div>
                        <span className="ig-combo-label ig-combo-good">✅ Works with</span>
                        <ul>{ing.canCombine.map((c) => <li key={c}>{c}</li>)}</ul>
                      </div>
                      <div>
                        <span className="ig-combo-label ig-combo-bad">🚫 Avoid mixing with</span>
                        <ul>{ing.avoid.map((a) => <li key={a}>{a}</li>)}</ul>
                      </div>
                    </div>
                  </details>
                  <Link href={`/blog/${ing.slug}`} className="ig-card__link">
                    Full clinical guide →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Compatibility matrix */}
          <section className="ig-section">
            <h2>Ingredient Compatibility Matrix</h2>
            <p>The most common combinations — and whether they are recommended, require caution, or should be avoided.</p>
            <div className="ig-matrix-table">
              <table>
                <thead>
                  <tr>
                    <th>Ingredient A</th>
                    <th>+ Ingredient B</th>
                    <th>Status</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {compatibilityMatrix.map((row) => (
                    <tr key={`${row.a}-${row.b}`} style={{ background: statusStyle[row.status]?.bg }}>
                      <td><strong>{row.a}</strong></td>
                      <td><strong>{row.b}</strong></td>
                      <td style={{ color: statusStyle[row.status]?.color, fontWeight: 600 }}>
                        {statusStyle[row.status]?.label}
                      </td>
                      <td className="ig-matrix-note">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="ig-section ig-faq">
            <h2>Frequently Asked Questions</h2>
            {faqSchema.mainEntity.map((qa) => (
              <details key={qa.name} className="ig-faq-item">
                <summary>{qa.name}</summary>
                <p>{qa.acceptedAnswer.text}</p>
              </details>
            ))}
          </section>

          {/* CTA */}
          <section className="ig-cta">
            <h2>Track Your Ingredients Over Time</h2>
            <p>Knowing what an ingredient does is only the start. Knowing whether it&apos;s working <em>for your skin</em> requires tracking. Fasade makes that easy.</p>
            <Link href="/#waitlist" className="ig-cta-btn">Join the Waitlist — Free →</Link>
          </section>

        </div>
      </main>

      <style>{`
        .ingredient-guide { font-family: var(--font-inter), system-ui, sans-serif; color: #1a1a2e; }
        .ig-hero { background: linear-gradient(135deg, #14532d 0%, #166534 40%, #14532d 100%); color: #fff; padding: 80px 24px; text-align: center; }
        .ig-hero__inner { max-width: 840px; margin: 0 auto; }
        .ig-badge { display: inline-block; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #bbf7d0; font-size: 13px; font-weight: 500; padding: 5px 14px; border-radius: 99px; margin-bottom: 24px; }
        .ig-hero h1 { font-size: clamp(1.8rem,4vw,3rem); font-weight: 800; line-height: 1.15; margin: 0 0 20px; }
        .ig-accent { background: linear-gradient(90deg,#86efac,#67e8f9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ig-sub { font-size: 1.1rem; color: #bbf7d0; line-height: 1.6; margin: 0 0 12px; }
        .ig-byline { font-size: 13px; color: rgba(255,255,255,0.45); }
        .ig-content { max-width: 1060px; margin: 0 auto; padding: 60px 24px; }
        .ig-section { margin-bottom: 72px; }
        .ig-section h2 { font-size: 1.75rem; font-weight: 700; color: #0f0c29; margin: 0 0 16px; }
        .ig-section > p { font-size: 1.04rem; line-height: 1.75; color: #374151; margin: 0 0 24px; }
        .ig-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }
        .ig-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 14px; transition: box-shadow 0.2s; }
        .ig-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
        .ig-card__header { display: flex; align-items: flex-start; gap: 12px; }
        .ig-card__emoji { font-size: 1.75rem; flex-shrink: 0; }
        .ig-card__name { font-size: 1.1rem; font-weight: 700; color: #1a1a2e; margin: 0 0 4px; }
        .ig-card__category { font-size: 11px; color: #6b7280; font-weight: 500; }
        .ig-card__diff { font-size: 11px; font-weight: 700; margin-left: auto; white-space: nowrap; }
        .ig-card__tagline { font-size: 0.95rem; color: #374151; font-style: italic; margin: 0; }
        .ig-card__mech { font-size: 0.88rem; color: #4b5563; background: #f9fafb; border-radius: 8px; padding: 12px; line-height: 1.55; }
        .ig-card__mech strong { display: block; margin-bottom: 4px; color: #374151; }
        .ig-card__concerns strong { display: block; font-size: 0.88rem; color: #374151; margin-bottom: 8px; }
        .ig-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .ig-tag { font-size: 11px; padding: 3px 10px; background: #f3f4f6; border-radius: 99px; color: #374151; }
        .ig-card__meta { display: flex; gap: 20px; }
        .ig-meta-label { display: block; font-size: 11px; color: #9ca3af; margin-bottom: 2px; }
        .ig-meta-val { font-weight: 600; font-size: 0.95rem; color: #1a1a2e; }
        .ig-card__combos { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
        .ig-card__combos summary { font-size: 0.9rem; font-weight: 600; cursor: pointer; color: #374151; }
        .ig-combo-section { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
        .ig-combo-label { display: block; font-size: 11px; font-weight: 700; margin-bottom: 6px; }
        .ig-combo-good { color: #059669; }
        .ig-combo-bad { color: #dc2626; }
        .ig-combo-section ul { margin: 0; padding-left: 16px; }
        .ig-combo-section li { font-size: 0.85rem; color: #374151; margin-bottom: 4px; line-height: 1.4; }
        .ig-card__link { display: block; text-align: center; padding: 10px; background: #f5f3ff; color: #6d28d9; font-weight: 600; font-size: 0.9rem; border-radius: 8px; text-decoration: none; transition: background 0.2s; }
        .ig-card__link:hover { background: #ede9fe; }
        .ig-matrix-table { overflow-x: auto; border-radius: 12px; border: 1px solid #e5e7eb; margin-top: 20px; }
        .ig-matrix-table table { width: 100%; border-collapse: collapse; }
        .ig-matrix-table th, .ig-matrix-table td { padding: 12px 16px; font-size: 0.9rem; border-bottom: 1px solid rgba(0,0,0,0.05); text-align: left; }
        .ig-matrix-table th { background: #f9fafb; font-weight: 600; }
        .ig-matrix-note { color: #4b5563; font-size: 0.87rem; }
        .ig-faq-item { border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 12px; padding: 16px 20px; }
        .ig-faq-item summary { font-weight: 600; cursor: pointer; color: #1a1a2e; }
        .ig-faq-item p { margin: 12px 0 0; color: #374151; font-size: 0.97rem; line-height: 1.6; }
        .ig-cta { background: linear-gradient(135deg,#14532d,#166534); color: #fff; border-radius: 20px; padding: 56px 40px; text-align: center; }
        .ig-cta h2 { font-size: 2rem; font-weight: 800; color: #fff; margin: 0 0 12px; }
        .ig-cta p { color: #bbf7d0; font-size: 1.05rem; margin: 0 0 28px; }
        .ig-cta-btn { display: inline-block; background: #fff; color: #166534; font-weight: 700; font-size: 1rem; padding: 14px 32px; border-radius: 8px; text-decoration: none; transition: opacity 0.2s; }
        .ig-cta-btn:hover { opacity: 0.9; }
        @media (max-width: 640px) { .ig-combo-section { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
