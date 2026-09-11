/**
 * fix-blogs-pass2.js
 * Expands thin Ingredient Focus posts (Niacinamide/Retinol for X)
 * and any remaining thin Timeline posts with generic content.
 * Run with: node scripts/fix-blogs-pass2.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BLOGS_PATH = path.join(__dirname, '../src/data/blogs.json');

// ─────────────────────────────────────────────
// INGREDIENT FOCUS EXPANSION DATA
// ─────────────────────────────────────────────

const niacinamideBySkinType = {
  'Oily Skin': {
    excerpt: 'Niacinamide is one of the most clinically supported actives for oily and acne-prone skin. At 4–5%, it measurably reduces sebum production, refines pores, and controls midday shine within 4–8 weeks.',
    intro: 'Oily skin presents a specific challenge: overactive sebaceous glands produce excess sebum that clogs pores, creates shine, and feeds the bacteria that cause acne. Niacinamide addresses this at the sebaceous gland level — not by stripping oil (which worsens the problem), but by normalising how much oil the gland produces in the first place.',
    mechanism: 'Niacinamide (vitamin B3) reduces sebum excretion by downregulating lipid synthesis pathways in sebaceous glands. A 2006 study by Draelos et al. found that 2% niacinamide significantly reduced casual sebum levels within 4 weeks. It also reduces pore visibility by increasing skin elasticity, which helps pore walls maintain their normal size rather than stretching under sebum pressure.',
    timeline: [
      { goal: 'Shine reduction', time: '2–4 weeks' },
      { goal: 'Pore tightening (appearance)', time: '4–8 weeks' },
      { goal: 'Sustained oil control', time: '8–12 weeks' },
      { goal: 'Breakout frequency reduction', time: '8–12 weeks' },
    ],
    protocol: `1. **Cleanser:** Use a gentle, pH-balanced foam or gel cleanser — avoid harsh sulfates that trigger compensatory oil production.
2. **Niacinamide serum (4–5%):** Apply to clean, dry skin. A pea-sized amount is sufficient.
3. **Lightweight moisturiser:** Even oily skin needs hydration. A niacinamide-containing gel moisturiser is ideal.
4. **SPF (AM only):** A matte or dry-touch SPF prevents UV-induced sebum stimulation.
Apply consistently twice daily. Spot treatments can be applied after niacinamide.`,
    stack: 'Niacinamide combines excellently with **salicylic acid** (BHA) for oily/acne-prone skin — niacinamide reduces oil production while salicylic acid clears the pore. Use salicylic acid as a separate step (2–3x per week at night). Also pairs well with **zinc** (often co-formulated with niacinamide for added sebum control).',
    avoid: 'Avoid layering niacinamide directly with very high-concentration vitamin C (L-ascorbic acid) in the same step, as the low pH can theoretically convert niacinamide to nicotinic acid at scale. In practice, this is rarely a clinical concern, but using them in separate AM/PM steps is safest.',
    sources: [
      { text: 'Draelos ZD et al. — The effect of 2% niacinamide on facial sebum production (2006)', url: 'https://pubmed.ncbi.nlm.nih.gov/17147561/' },
      { text: 'Bissett DL et al. — Niacinamide: a B vitamin that improves aging facial skin appearance (2004)', url: 'https://pubmed.ncbi.nlm.nih.gov/16029679/' },
    ],
  },

  'Sensitive Skin': {
    excerpt: 'Niacinamide is one of the safest actives for sensitive and reactive skin types. At 2–5%, it strengthens the skin barrier, reduces inflammatory redness, and improves tolerance to other actives — without triggering irritation.',
    intro: 'Sensitive skin is characterised by a compromised stratum corneum barrier that allows irritants and allergens to penetrate too easily, triggering immune responses and inflammation. This creates a catch-22: the actives that would most benefit your skin (retinol, AHAs, vitamin C) are also the ones most likely to flare it. Niacinamide is uniquely positioned to break this cycle — it is one of the few actives that actively repairs the barrier while being almost universally tolerated.',
    mechanism: 'Niacinamide upregulates the synthesis of key barrier lipids — ceramides, fatty acids, and cholesterol — in the stratum corneum. By strengthening this barrier, it reduces transepidermal water loss (TEWL) and decreases the skin\'s reactivity to environmental triggers. Separately, it has anti-inflammatory properties that directly calm the redness and heat associated with sensitive and rosacea-prone skin.',
    timeline: [
      { goal: 'Initial barrier comfort (reduced stinging)', time: '1–2 weeks' },
      { goal: 'Visible redness reduction', time: '2–4 weeks' },
      { goal: 'Improved tolerance to other actives', time: '4–8 weeks' },
      { goal: 'Significant barrier improvement', time: '8–12 weeks' },
    ],
    protocol: `1. **Start at 2%**: Use a 2% niacinamide formulation for the first 4 weeks to confirm tolerance.
2. **Apply to slightly damp skin**: This reduces the concentration slightly and improves comfort.
3. **Buffer with moisturiser**: Apply a calming moisturiser (centella asiatica, allantoin) immediately after.
4. **Introduce gradually**: Once tolerating well, you can increase to 4–5% for greater barrier benefits.
5. **Avoid combinations initially**: Don't introduce any other new actives for the first 4 weeks so you can clearly attribute any reaction.`,
    stack: 'Niacinamide stacks exceptionally well with **centella asiatica** (cica) — both are anti-inflammatory and barrier-supporting. Also pairs well with **hyaluronic acid** (HA) for additional hydration. As your barrier strengthens over 4–8 weeks, you can begin introducing **bakuchiol** as a retinol alternative that is gentle enough for sensitive skin.',
    avoid: 'Start by using niacinamide alone as the only active in your routine. Avoid combining with AHAs/BHAs initially. Do not use formulations with alcohol or fragrance alongside niacinamide, as these will counteract the barrier-building effects.',
    sources: [
      { text: 'Draelos ZD et al. — Niacinamide-containing facial moisturizer improves skin barrier (2005)', url: 'https://pubmed.ncbi.nlm.nih.gov/16029679/' },
      { text: 'Soma Y et al. — Moisturizing effects of topical nicotinamide on atopic dry skin (2005)', url: 'https://pubmed.ncbi.nlm.nih.gov/15716582/' },
    ],
  },

  'Large Pores': {
    excerpt: 'Niacinamide reduces the appearance of large pores by controlling sebum output and increasing skin elasticity over 8–12 weeks. It cannot physically shrink pores, but it can make them appear significantly smaller.',
    intro: 'Pore size is primarily determined by genetics and sebum output — you cannot permanently shrink a pore. However, the appearance of pore size is highly variable and can be meaningfully reduced. Enlarged, visible pores are most often caused by: excess sebum stretching the pore lining, loss of surrounding elasticity (which makes pores sag open), and accumulated dead skin cells around the pore opening. Niacinamide addresses the first two causes directly.',
    mechanism: 'By reducing sebum production, niacinamide prevents the constant overfilling that stretches pore walls. Simultaneously, by stimulating collagen and elastin production in the dermis surrounding each pore, it improves the pore\'s structural support — allowing it to "bounce back" to a tighter state. A 2004 study found measurable reduction in pore size after 8 weeks of 5% niacinamide use.',
    timeline: [
      { goal: 'Reduced pore oiliness/plugging', time: '2–4 weeks' },
      { goal: 'Visible pore size reduction', time: '8–12 weeks' },
      { goal: 'Improved skin texture around pores', time: '8–12 weeks' },
      { goal: 'Maximum structural improvement', time: '12+ weeks' },
    ],
    protocol: `1. **Double cleanse (PM):** Use an oil cleanser followed by a water-based cleanser to fully dissolve sebum plugs without stripping.
2. **BHA exfoliant (2–3x per week):** Salicylic acid dissolves inside-pore debris before your niacinamide step.
3. **Niacinamide serum (5%):** Apply as the first water-based layer after exfoliation.
4. **Non-comedogenic moisturiser:** Choose lightweight, pore-safe formulations.
5. **SPF with mattifying finish:** Sun damage degrades the collagen that supports pore structure.`,
    stack: 'The most effective pore-tightening combination is **niacinamide + salicylic acid (BHA) + sunscreen**. Use salicylic acid at night to keep pores clear, niacinamide morning and night to control oil and build elasticity, and a matte SPF daily to protect the structural collagen around pores.',
    avoid: 'Avoid heavy, occlusive moisturisers if you are using niacinamide for pores — look for "non-comedogenic" formulations. Do not use physical scrubs on pore-prone areas as these push debris deeper into pores rather than dissolving it.',
    sources: [
      { text: 'Bissett DL et al. — Niacinamide: a B vitamin that improves aging facial skin appearance (2004)', url: 'https://pubmed.ncbi.nlm.nih.gov/16029679/' },
      { text: 'Hakozaki T et al. — The effect of niacinamide on reducing cutaneous pigmentation (2002)', url: 'https://pubmed.ncbi.nlm.nih.gov/12100180/' },
    ],
  },

  'Dark Spots': {
    excerpt: 'Niacinamide fades dark spots and post-acne marks by blocking melanin transfer to the skin surface. At 4–5%, visible results appear in 8–12 weeks with consistent daily use.',
    intro: 'Dark spots, post-inflammatory hyperpigmentation (PIH), and melasma all involve one process: excess melanin deposited in the epidermis. The melanin is produced by melanocytes in the basal layer and transferred in vesicles called melanosomes to surrounding keratinocytes. Niacinamide interrupts this transfer step — it does not inhibit melanin production (like hydroquinone or kojic acid), but it prevents produced melanin from reaching the surface.',
    mechanism: 'Niacinamide inhibits the transfer of melanosomes from melanocytes to keratinocytes by approximately 35–68%, as demonstrated in a landmark 2002 study by Hakozaki et al. This mechanism is unique — unlike tyrosinase inhibitors, niacinamide works downstream in the pigmentation cascade, targeting the distribution of existing melanin rather than its synthesis. This makes it especially effective for PIH (post-acne marks) where melanin is already distributed in the upper epidermis.',
    timeline: [
      { goal: 'Active redness from fresh marks', time: '4–6 weeks' },
      { goal: 'Brown PIH mark lightening', time: '8–12 weeks' },
      { goal: 'Significant even skin tone', time: '12–16 weeks' },
      { goal: 'Deep or longstanding hyperpigmentation', time: '16–24 weeks' },
    ],
    protocol: `1. **Vitamin C serum (AM):** Apply L-ascorbic acid or ascorbyl glucoside before niacinamide for dual-mechanism brightening (vitamin C inhibits synthesis; niacinamide inhibits transfer).
2. **Niacinamide serum (4–5%):** Apply in AM and PM routines.
3. **Chemical SPF (50+ PA+++):** UV exposure is the #1 trigger for new pigmentation and reversal of treatment progress. This is non-negotiable.
4. **Retinol (PM, 0.3–0.5%):** Accelerates cellular turnover to shed pigmented cells faster. Combine with niacinamide for compounding effect.`,
    stack: 'For dark spots, **niacinamide + vitamin C + SPF** is the gold standard brightening stack. Vitamin C inhibits melanin production; niacinamide blocks its transfer; SPF prevents new pigmentation. At night, add **retinol** to accelerate the shedding of already-pigmented cells. **Tranexamic acid** can be added for melasma specifically.',
    avoid: 'Avoid sun exposure without SPF — even 20 minutes of unprotected UV exposure undoes 2 weeks of brightening treatment. Avoid irritating the skin as inflammation triggers PIH, particularly in darker skin tones.',
    sources: [
      { text: 'Hakozaki T et al. — The effect of niacinamide on reducing cutaneous pigmentation (2002)', url: 'https://pubmed.ncbi.nlm.nih.gov/12100180/' },
      { text: 'Navarrete-Solís J et al. — 4% niacinamide vs hydroquinone for melasma (2011)', url: 'https://pubmed.ncbi.nlm.nih.gov/21822427/' },
    ],
  },

  'Uneven Skin Tone': {
    excerpt: 'Niacinamide improves uneven skin tone by simultaneously reducing pigment transfer, controlling redness, and brightening sallow skin through its antioxidant activity. Visible improvement takes 4–8 weeks.',
    intro: 'Uneven skin tone is rarely a single problem. It is usually a combination of post-inflammatory redness (from past acne), pigmentation, sallowness (yellow-grey dullness from glycation and oxidation), and vascular irregularity (visible capillaries). Niacinamide is notable because it addresses multiple causes simultaneously — making it one of the few ingredients that genuinely delivers "more even tone" rather than targeting only one aspect of the problem.',
    mechanism: 'Niacinamide works through three complementary pathways: (1) Inhibiting melanosome transfer to reduce brown pigmentation. (2) Anti-inflammatory activity that reduces the reactive redness from post-acne marks and rosacea. (3) Antioxidant activity — as a precursor to NAD+ (a coenzyme critical for cellular energy), it reduces oxidative damage that causes the yellowed, dull appearance of glycated and UV-damaged skin.',
    timeline: [
      { goal: 'Reduced redness and blotchiness', time: '2–4 weeks' },
      { goal: 'Skin looks more luminous/less dull', time: '4–6 weeks' },
      { goal: 'Dark spot and pigmentation fading', time: '8–12 weeks' },
      { goal: 'Overall even complexion', time: '12+ weeks' },
    ],
    protocol: `1. **Cleanse:** Gentle cleanser appropriate for your skin type.
2. **Vitamin C (AM):** Apply antioxidant serum first — this addresses oxidative dullness and pigmentation from a different angle than niacinamide.
3. **Niacinamide (5%):** Apply next, targeting the transfer and inflammatory pathways.
4. **Moisturiser with SPF 50+:** Sun protection maintains all brightening progress.
5. **Retinol (PM, 0.3%):** Accelerates cell turnover, bringing newer, more evenly-pigmented skin to the surface faster.`,
    stack: '**Vitamin C (AM) + Niacinamide (AM+PM) + Retinol (PM) + SPF** is the optimal stack for uneven tone. This four-way approach targets: oxidative damage, melanosome transfer, cell turnover, and UV prevention respectively. Adding **azelaic acid** at 10% (alternate nights with retinol) provides additional anti-inflammatory brightening.',
    avoid: 'The most common mistake is skipping SPF and continuing to accumulate new pigmentation that outpaces treatment. Also avoid harsh scrubs and foaming cleansers with high pH, as these increase transepidermal water loss and skin reactivity, worsening uneven tone.',
    sources: [
      { text: 'Hakozaki T et al. — The effect of niacinamide on reducing cutaneous pigmentation (2002)', url: 'https://pubmed.ncbi.nlm.nih.gov/12100180/' },
      { text: 'Bissett DL et al. — Topical niacinamide reduces yellowing, wrinkling, red blotchiness (2004)', url: 'https://pubmed.ncbi.nlm.nih.gov/16029679/' },
    ],
  },
};

const retinolBySkinType = {
  'Oily Skin': {
    excerpt: 'Retinol is highly effective for oily and acne-prone skin — it normalises cell turnover, clears congested follicles, and reduces sebum activity. Expect purging in weeks 2–6, with meaningful clearance by week 12.',
    intro: 'For oily and acne-prone skin, retinol is one of the most well-evidenced treatments available. It works on acne through a fundamentally different mechanism than most topical treatments: rather than killing bacteria (like benzoyl peroxide) or dissolving sebum plugs (like salicylic acid), retinol normalises the speed at which skin cells in the follicle lining divide and shed — the root cause of comedone formation.',
    mechanism: 'Retinol converts to retinoic acid in the skin, which binds to RAR-gamma receptors in follicle keratinocytes. This normalises the abnormal desquamation (cell shedding) that causes pore congestion in acne-prone skin. It also directly suppresses sebocyte (oil-producing cell) proliferation, measurably reducing sebum output. Unlike topical antibiotics, it does not create bacterial resistance.',
    timeline: [
      { goal: 'Purging phase (comedones surface)', time: 'Weeks 2–6' },
      { goal: 'Active breakout size reduction', time: 'Weeks 4–8' },
      { goal: 'Overall acne clearance', time: 'Weeks 8–12' },
      { goal: 'Sebum reduction (sustained)', time: 'Weeks 12+' },
      { goal: 'Post-acne textural improvement', time: 'Months 3–6' },
    ],
    protocol: `1. **Start at 0.1–0.25%:** Oily skin can often handle retinol better than dry skin, but still start low.
2. **Apply to dry skin only:** Wait 20–30 minutes after cleansing. Wet skin increases penetration and irritation.
3. **Niacinamide layer after (15 min wait):** Niacinamide reduces retinol-related redness and controls oil simultaneously.
4. **Oil-free moisturiser last:** Lock in without adding comedogenic oils.
5. **Never use on the same night as strong AHAs/BHAs initially.**
6. **Increase concentration after 6 weeks:** Move to 0.3% once tolerating well.`,
    stack: '**Retinol (PM) + Niacinamide (AM+PM) + Salicylic acid (2–3x/week PM) + SPF (AM)** is the classic evidence-based stack for oily/acne skin. Do not use benzoyl peroxide on the same night as retinol — it oxidises retinol and renders both less effective.',
    avoid: 'Do not use on the same night as high-strength AHAs (glycolic acid, lactic acid) or physical scrubs. Avoid benzoyl peroxide + retinol on the same application. If you are using drying spot treatments, apply them before retinol, not after.',
    sources: [
      { text: 'Leyden J et al. — Why topical retinoids are mainstay of therapy for acne vulgaris (2017)', url: 'https://pubmed.ncbi.nlm.nih.gov/28657135/' },
      { text: 'Zasada M, Budzisz E. — Retinoids: active molecules influencing skin structure (2019)', url: 'https://pubmed.ncbi.nlm.nih.gov/31558904/' },
    ],
  },

  'Sensitive Skin': {
    excerpt: 'Retinol is challenging for sensitive skin, but achievable with careful introduction. Starting at 0.025–0.1% with a "buffer" technique dramatically reduces irritation while still delivering results.',
    intro: 'Sensitive skin and retinol is one of the most common skincare dilemmas. Retinol\'s benefits for sensitive skin are real — it normalises cell turnover, reduces reactive pigmentation, and (long-term) actually strengthens the barrier. But the retinization phase (weeks 1–6) can be a significant obstacle. The key insight is that retinization is not inevitable at the same intensity for all skin types — the right introduction technique can make retinol accessible even for reactive skin.',
    mechanism: 'Retinol\'s irritation in sensitive skin occurs because rapid retinoic acid formation triggers an accelerated cell turnover that outpaces the skin\'s natural adaptation. The solution is to slow the conversion rate: lower concentrations produce less retinoic acid per application, and the "buffer" method (applying moisturiser before retinol) dilutes penetration speed without eliminating efficacy. Over 6–12 weeks, the skin builds tolerance through upregulation of retinoid-binding proteins.',
    timeline: [
      { goal: 'Retinization (redness, flaking) — expected', time: 'Weeks 1–6' },
      { goal: 'Tolerance established', time: 'Weeks 6–8' },
      { goal: 'First visible improvements', time: 'Weeks 8–12' },
      { goal: 'Full anti-aging efficacy', time: 'Months 4–6+' },
    ],
    protocol: `1. **The buffer method:** Apply a gentle moisturiser and wait 10 minutes. Apply retinol over the moisturiser. This reduces penetration speed significantly.
2. **Start ultra-low (0.025%):** Begin with the lowest concentration available.
3. **Once per week for 4 weeks** → twice per week for 4 weeks → alternate nights → nightly.
4. **Pair with ceramides:** Rebuild the barrier every morning with a ceramide-rich moisturiser.
5. **Avoid all other actives initially:** No AHAs, BHAs, or vitamin C while establishing tolerance.`,
    stack: '**Bakuchiol + Niacinamide** is an excellent bridge for sensitive skin that cannot yet tolerate retinol. Once tolerance is built, replace bakuchiol with retinol (0.025%). As skin stabilises, add **ceramide moisturiser** for barrier support and **azelaic acid** for tone correction on alternate nights.',
    avoid: 'Do not start retinol during summer (increased photosensitivity + heat) or in the week before or after introducing any other new active. Never use retinol in the same routine as AHAs, BHAs, or vitamin C while in the retinization phase. Do not use retinol on broken skin.',
    sources: [
      { text: 'Kafi R et al. — Improvement of naturally aged skin with vitamin A (retinol) (2007)', url: 'https://pubmed.ncbi.nlm.nih.gov/17515510/' },
      { text: 'Kong R et al. — A comparative study of the effects of retinol and retinoic acid (2016)', url: 'https://pubmed.ncbi.nlm.nih.gov/27547839/' },
    ],
  },

  'Dark Spots': {
    excerpt: 'Retinol fades dark spots through two mechanisms: inhibiting tyrosinase (melanin production) and accelerating cell turnover to shed pigmented skin cells faster. Results for fresh marks appear in 8–12 weeks; older spots take 4–6 months.',
    intro: 'Dark spots — whether from sun exposure, post-acne pigmentation, or hormonal melasma — have one thing in common: excess melanin deposited in the epidermis. Retinol attacks this from an unexpected angle: it does not primarily work as a bleaching agent. Instead, it accelerates the rate at which the epidermis turns over, bringing the pigmented cells to the surface faster and shedding them sooner. Combined with mild tyrosinase inhibition, this makes retinol one of the most effective long-term brighteners available.',
    mechanism: 'Retinoic acid (retinol\'s active form) interferes with melanin synthesis at multiple points: it inhibits tyrosinase transcription (reducing melanin production) and disrupts melanosome transfer to keratinocytes. More powerfully, by increasing epidermal cell turnover rate by 50–100%, it brings the natural exfoliation process that removes pigmented cells from roughly 28 days to as few as 14–18 days — accelerating visible fading proportionally.',
    timeline: [
      { goal: 'Cell turnover acceleration begins', time: 'Weeks 1–2' },
      { goal: 'Fresh red/pink PIH marks fading', time: 'Weeks 4–6' },
      { goal: 'Brown post-acne marks', time: 'Weeks 8–12' },
      { goal: 'Sun spots and existing hyperpigmentation', time: 'Months 3–5' },
      { goal: 'Deeply embedded melasma', time: 'Months 6–12+' },
    ],
    protocol: `1. **Vitamin C (AM):** Inhibits melanin production during daytime.
2. **SPF 50+ (AM, mandatory):** Pigmentation returns with any UV exposure, even minimal.
3. **Niacinamide (AM+PM):** Blocks melanosome transfer, a different pathway from retinol.
4. **Retinol (PM, 0.3–0.5%):** Apply to dry skin, accelerating cell shedding.
5. **Centella moisturiser (after retinol):** Calm post-retinol inflammation to prevent rebound PIH.`,
    stack: '**Vitamin C + Niacinamide + Retinol + SPF 50+** — the gold standard brightening stack that addresses all three stages of the pigmentation process simultaneously. For stubborn melasma, add **tranexamic acid** to the AM routine as a fourth brightener operating via a completely different (anti-plasmin) mechanism.',
    avoid: 'Any UV exposure without SPF directly counteracts retinol\'s dark spot work. Picking or scratching active spots creates new PIH. Do not use glycolic acid on the same night as retinol — combine them on alternating nights instead.',
    sources: [
      { text: 'Zasada M, Budzisz E. — Retinoids: active molecules influencing skin structure (2019)', url: 'https://pubmed.ncbi.nlm.nih.gov/31558904/' },
      { text: 'Griffiths CE et al. — Restoration of collagen formation in photodamaged human skin by tretinoin (1993)', url: 'https://pubmed.ncbi.nlm.nih.gov/8267576/' },
    ],
  },
};

// ─────────────────────────────────────────────
// CONTENT BUILDER FOR INGREDIENT FOCUS
// ─────────────────────────────────────────────

function buildIngredientFocusContent(title, ingredient, concern, data) {
  const timelineRows = data.timeline
    .map(r => `| **${r.goal}** | ${r.time} |`)
    .join('\n');

  const sourcesSection = data.sources
    .map(s => `- [${s.text}](${s.url})`)
    .join('\n');

  return `# ${title}

## Quick Answer

> ${data.excerpt}

## Why ${ingredient} Works Differently for ${concern}

${data.intro}

## The Mechanism: How ${ingredient} Addresses ${concern}

${data.mechanism}

## Timeline of Results for ${concern}

| Clinical Goal | Approximate Timeframe |
|---|---|
${timelineRows}

## Your Step-by-Step Protocol

${data.protocol}

## Best Ingredient Combinations for ${concern}

${data.stack}

## What to Avoid

${data.avoid}

## How to Know If It's Working

The changes you are looking for in ${concern} are subtle and cumulative — they happen gradually over weeks, not days. The challenge is that human memory is poor at tracking these kinds of incremental improvements. Without a consistent reference (same lighting, same camera angle, same skin state), it is almost impossible to accurately compare your skin today to your skin 8 weeks ago.

Key signs ${ingredient} is working for ${concern}:
- **Week 2–4:** Skin feels balanced — not greasy by midday (for oily concerns) or not stinging from water (for sensitive concerns)
- **Week 4–8:** Other people may notice before you do
- **Week 8–12:** Photographs from Day 0 vs Week 12 should show meaningful objective difference

Fasade provides standardised tracking tools to measure this progress objectively. Stop guessing whether your skincare is working.

## Clinical Sources

${sourcesSection}
`;
}

// ─────────────────────────────────────────────
// REMAINING THIN TIMELINE CONTENT
// ─────────────────────────────────────────────

const thinTimelineFixes = {
  'How Long Does Skin Barrier Repair Take?': {
    quickAnswer: 'Minor barrier disruption (from over-exfoliation or a harsh cleanser) can resolve in 2–4 weeks. A severely compromised barrier (eczema flare, chemical burn, prolonged retinoid irritation) can take 6–12 weeks of active repair.',
    uniqueSection: `## What Causes Barrier Damage?

The stratum corneum — the outermost layer of your skin — acts as a brick-and-mortar wall. The "bricks" are corneocytes (dead skin cells), and the "mortar" is a lipid matrix made up of ceramides, cholesterol, and free fatty acids. When this matrix is disrupted, water escapes (TEWL increases) and irritants penetrate too easily.

Common causes of barrier damage:
- **Over-exfoliation:** Using AHAs/BHAs too frequently or at concentrations too high for your skin
- **Stripping cleansers:** High-pH soaps dissolve the lipid mortar directly
- **Environmental stress:** Wind, cold, and low humidity dehydrate the matrix
- **Prolonged retinoid use without support:** Retinoids accelerate turnover faster than the barrier can rebuild without help
- **Allergy or contact dermatitis:** Immune reaction dismantles barrier integrity rapidly

## The Repair Protocol

The evidence-based approach to barrier repair is simple but requires discipline:

1. **Stop all actives immediately** (AHAs, BHAs, retinoids, vitamin C, niacinamide at first)
2. **Switch to a creamy, pH-balanced cleanser** (Vanicream, CeraVe Hydrating)
3. **Apply ceramide-rich moisturiser 2–3x daily** (CeraVe, Physiogel, LRPH Cicaplast)
4. **Layer occlusives over moisturiser PM** (petrolatum, squalane) to physically seal TEWL
5. **Strict SPF daily** — UV impairs barrier repair directly
6. **Reintroduce actives one at a time** after 4+ weeks of barrier stability`,
  },

  'How Long Does Skincare Take to Work?': {
    quickAnswer: 'It depends entirely on the ingredient and the skin concern. Hydrating ingredients work within hours. Brightening ingredients need 4–12 weeks. Anti-aging actives (retinol, collagen boosters) require 3–6 months. Most people quit too early.',
    uniqueSection: `## Why Skincare Takes So Long

Skin cells in the deepest epidermal layer take approximately 28 days to reach the surface and shed. This is the skin's natural renewal cycle. When you apply a topical active ingredient, it needs to:

1. Penetrate the stratum corneum to reach target cells
2. Trigger the intended biological response
3. Allow for a full cell cycle so the results of that response become visible

This is why most dermatological clinical studies evaluate results at the **8–12 week mark** — this represents 2–3 complete skin cycles, which is the minimum time needed to see consistent structural change.

## A Realistic Timeline by Ingredient Category

| Ingredient Category | First Visible Results | Meaningful Results |
|---|---|---|
| **Humectants** (HA, glycerin) | Hours | 1–2 weeks |
| **Barrier actives** (ceramides) | 1–3 days | 2–4 weeks |
| **Anti-inflammatory** (niacinamide, centella) | 1–2 weeks | 4–6 weeks |
| **Brightening agents** (vitamin C, tranexamic acid) | 4–6 weeks | 8–12 weeks |
| **Exfoliants** (AHA/BHA) | 1–3 uses | 4–8 weeks |
| **Retinoids** | 4–6 weeks | 3–6 months |
| **Peptides** | 4–6 weeks | 8–12+ weeks |
| **Anti-fungal/anti-bacterial** | Days | 2–4 weeks |

## The Quitting Problem

Clinical studies show that the majority of people abandon a working skincare product within the first 4–6 weeks — right when the product is only beginning to have a measurable effect. The product is not failing; the tracking is. Without photographic documentation and consistent measurement, it is cognitively impossible to accurately perceive incremental change over an 8-week period.`,
  },

  'How Long Does It Take for Acne Skincare to Work?': {
    quickAnswer: 'Acne treatments work on different timelines depending on their mechanism. Antibacterial treatments (benzoyl peroxide) reduce lesions in 1–2 weeks. Comedolytic treatments (salicylic acid, retinoids) take 6–12 weeks. Hormonal acne requires 3–6 months.',
    uniqueSection: `## The Four Types of Acne and Their Treatment Timelines

Understanding which type of acne you have determines how long treatment will take:

**1. Non-inflammatory (comedonal) acne** — blackheads and whiteheads
- Caused by: Abnormal follicle cell shedding + sebum accumulation
- Best treatment: Salicylic acid, retinoids
- Timeline: **8–12 weeks** for significant clearance

**2. Inflammatory papules and pustules**
- Caused by: C. acnes bacteria + immune response
- Best treatment: Benzoyl peroxide, azelaic acid, antibiotics
- Timeline: **2–6 weeks** for active lesion reduction

**3. Nodular/cystic acne**
- Caused by: Severe follicle rupture + deep infection
- Best treatment: Prescription isotretinoin, spironolactone (hormonal)
- Timeline: **3–6 months** of consistent treatment

**4. Hormonal acne (jaw, chin, lower cheeks)**
- Caused by: Androgen-triggered sebum production spikes
- Best treatment: Spironolactone, combined oral contraceptives, spearmint (mild)
- Timeline: **3–6 menstrual cycles** to stabilise

## Why You Should Not Switch Products During Purging

A retinoid or AHA "purge" is when rapid cell turnover brings existing microcomedones (invisible, pre-formed blockages) to the surface as active breakouts. This typically lasts **2–6 weeks** and is a sign the treatment is working, not failing. Switching products during this phase restarts the clock and prolongs the timeline.`,
  },

  'How Long Does It Take for Dark Spot Products to Work?': {
    quickAnswer: 'Dark spot treatments work in 4–16 weeks depending on the ingredient. Vitamin C brightens in 4–6 weeks. Niacinamide fades marks in 8–12 weeks. Tranexamic acid improves melasma in 8–16 weeks. The deeper and older the pigmentation, the longer treatment takes.',
    uniqueSection: `## Types of Dark Spots and Their Treatment Timelines

| Type of Dark Spot | Cause | Best Treatment | Expected Timeline |
|---|---|---|---|
| **Fresh PIH** (red/pink marks) | Post-acne inflammation | Niacinamide, azelaic acid | 4–8 weeks |
| **Brown PIH** (older marks) | Melanin deposition | Niacinamide + retinol | 8–12 weeks |
| **Sun spots / lentigines** | UV-induced melanocytes | Vitamin C + SPF | 12–16 weeks |
| **Melasma** | Hormonal + UV | Tranexamic acid + azelaic | 16–24 weeks |
| **Freckles** | Genetic + UV | Vitamin C + SPF (fade only) | 12+ weeks |

## Why Dark Spots Are Stubborn

Melanin is physically embedded in keratinocytes in the upper epidermis. Even after you stop the signal that created the pigmentation, the existing pigment must be physically shed through normal cell turnover. At a 28-day skin cycle, even an instantly effective treatment would take 28 days before the first generation of treated skin reaches the surface.

Most treatment failures are due to:
1. **Insufficient SPF use:** New UV exposure triggers new melanin production faster than treatment removes old pigment
2. **Impatience:** Stopping at 8 weeks when the full effect occurs at 12–16
3. **Wrong product for the pigmentation type:** Melasma requires different treatment than PIH`,
  },

  'How Long Does It Take for a New Skincare Routine to Work?': {
    quickAnswer: 'A new skincare routine takes 4–12 weeks to show its true results. The first 2 weeks are the adaptation period where skin adjusts. Weeks 4–8 show the first meaningful improvements. The full effect of most actives appears at 12 weeks.',
    uniqueSection: `## The New Routine Adaptation Period (Weeks 1–4)

When you introduce new products, your skin goes through three phases:

**Phase 1 — Adjustment (Weeks 1–2):** Your skin's microbiome adjusts to new cleansers. The barrier may temporarily feel different. Some new actives (retinol, AHAs) can cause mild initial reactivity. This is normal.

**Phase 2 — Initial response (Weeks 2–4):** If purging is going to happen (primarily from retinoids), it starts here. Brightening actives begin their work but no visible change yet.

**Phase 3 — Measurable results begin (Weeks 4–8):** The first cell generation fully treated by your new actives reaches the surface. Texture improvements, early brightening, and reduced breakout frequency become detectable.

## How to Evaluate a New Routine Fairly

The most common mistake is changing too many variables at once. If you switch cleanser, add vitamin C, start retinol, and change moisturiser in the same week, you cannot:
- Identify which product caused an improvement
- Identify which product caused a reaction
- Know whether to continue or discontinue anything

**The correct approach:**
1. Introduce one new product every **2 weeks**
2. Take baseline photographs on Day 0 before any change
3. Photograph consistently (same angle, lighting, time of day) at Week 4, 8, and 12
4. Don't evaluate based on how skin feels on day-to-day basis — look at the photos`,
  },
};

// ─────────────────────────────────────────────
// MAIN PROCESSING
// ─────────────────────────────────────────────

const blogs = JSON.parse(fs.readFileSync(BLOGS_PATH, 'utf8'));
let expanded = 0;
let timelineFix = 0;

console.log(`Processing ${blogs.length} blog posts for Pass 2...\n`);

const fixedBlogs = blogs.map((blog) => {
  const updated = { ...blog };

  // 1. Expand Ingredient Focus: Niacinamide for X
  if (blog.category === 'Ingredient Focus' && blog.title.startsWith('Niacinamide for ')) {
    const concern = blog.title.replace('Niacinamide for ', '');
    const data = niacinamideBySkinType[concern];
    if (data && blog.content.length < 2000) { // Only expand thin posts
      updated.content = buildIngredientFocusContent(blog.title, 'Niacinamide', concern, data);
      updated.excerpt = data.excerpt;
      updated.readTime = Math.ceil(updated.content.split(/\s+/).length / 200);
      expanded++;
      console.log(`  [EXPANDED] ${blog.title}`);
    }
  }

  // 2. Expand Ingredient Focus: Retinol for X
  if (blog.category === 'Ingredient Focus' && blog.title.startsWith('Retinol for ')) {
    const concern = blog.title.replace('Retinol for ', '');
    const data = retinolBySkinType[concern];
    if (data && blog.content.length < 2000) {
      updated.content = buildIngredientFocusContent(blog.title, 'Retinol', concern, data);
      updated.excerpt = data.excerpt;
      updated.readTime = Math.ceil(updated.content.split(/\s+/).length / 200);
      expanded++;
      console.log(`  [EXPANDED] ${blog.title}`);
    }
  }

  // 3. Enhance remaining thin Timeline posts that still have generic content
  const thinFix = thinTimelineFixes[blog.title];
  if (thinFix && blog.category === 'Timeline' && blog.content.includes('Results depend entirely on the active concentration')) {
    const ingredientName = blog.title
      .replace(/How Long Does (It Take for )?(a New )?/, '')
      .replace(/ (Take|Repair|Work|Skincare).*/, '')
      .trim();

    updated.excerpt = thinFix.quickAnswer;
    updated.content = `# ${blog.title}

## Quick Answer

> ${thinFix.quickAnswer}

${thinFix.uniqueSection}

## How to Track Your Progress

Without consistent documentation, it is nearly impossible to accurately remember how your skin looked 8–12 weeks ago. The mind fills in gaps with expectations rather than reality.

Fasade provides the tools to track your skin's progress with standardised photos and measurable metrics. Stop relying on memory and start measuring what actually works.

## Clinical Sources

- Clinical evaluations of skin improvement typically use standardised photography and validated scales (GAIS, IGA) to measure change objectively over 8–12 week study periods.
`;
    timelineFix++;
    console.log(`  [TIMELINE ENHANCED] ${blog.title}`);
  }

  return updated;
});

fs.writeFileSync(BLOGS_PATH, JSON.stringify(fixedBlogs, null, 2));
console.log(`\n✅ Pass 2 Done!`);
console.log(`   Ingredient Focus expanded: ${expanded} posts`);
console.log(`   Timeline posts enhanced: ${timelineFix} posts`);
console.log(`   Total posts: ${blogs.length}`);
