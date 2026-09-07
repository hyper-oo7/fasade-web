import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UNSPLASH_KEY = 'TQAWwnlt55TRXEAQ0c8GnybdhUztt91yqMJkSR2GIlE';

const ingredientFacts = {
  'Niacinamide': {
    time: '2-4 weeks for inflammation, 8-12 weeks for hyperpigmentation.',
    concerns: ['Oily Skin', 'Sensitive Skin', 'Large Pores', 'Dark Spots', 'Uneven Skin Tone'],
    worksWith: ['Retinol', 'Vitamin C', 'Salicylic Acid', 'AHA', 'Azelaic Acid', 'Tranexamic Acid'],
    clashes: [],
    details: 'Niacinamide (Vitamin B3) is a powerful antioxidant that helps build keratin, keeping your skin firm and healthy. It also helps your skin grow a ceramide (lipid) barrier, which can in turn helps retain moisture.'
  },
  'Retinol': {
    time: '4-6 weeks for acne/texture, 3-6 months for fine lines and collagen production.',
    concerns: ['Oily Skin', 'Sensitive Skin', 'Dark Spots', 'Acne Scars', 'Large Pores', 'Anti Aging'],
    worksWith: ['Niacinamide', 'Hyaluronic Acid', 'Peptides', 'Azelaic Acid'],
    clashes: ['Vitamin C', 'Salicylic Acid', 'AHA', 'BHA'],
    details: 'Retinol accelerates cell turnover and boosts collagen production. It is the gold standard in anti-aging and acne treatment, but requires an adjustment period (retinization).'
  },
  'Vitamin C': {
    time: '3-4 weeks for glow, 8-12 weeks for dark spots and collagen synthesis.',
    concerns: ['Uneven Skin Tone', 'Dark Spots'],
    worksWith: ['Hyaluronic Acid', 'Peptides'],
    clashes: ['Retinol', 'Salicylic Acid', 'AHA', 'BHA', 'Niacinamide (in some unstable formulations)'],
    details: 'A potent antioxidant that neutralizes free radicals, brightens complexion, and prevents premature aging.'
  },
  'Hyaluronic Acid': {
    time: 'Immediate plumping, 2-4 weeks for sustained barrier hydration.',
    concerns: ['Sensitive Skin', 'Dry Skin'],
    worksWith: ['Retinol', 'Vitamin C', 'Niacinamide', 'Salicylic Acid'],
    clashes: [],
    details: 'A humectant capable of holding 1000x its weight in water, drawing moisture into the skin.'
  },
  'Salicylic Acid': {
    time: '2-4 weeks to clear pores, 6-8 weeks for significant acne reduction.',
    concerns: ['Large Pores', 'Oily Skin', 'Acne'],
    worksWith: ['Niacinamide', 'Hyaluronic Acid'],
    clashes: ['Retinol', 'Vitamin C', 'AHA'],
    details: 'A beta-hydroxy acid (BHA) that penetrates deep into pores to dissolve oil and dead skin cells.'
  },
  'Azelaic Acid': {
    time: '4-8 weeks for redness and hyperpigmentation.',
    concerns: ['Dark Spots', 'Sensitive Skin', 'Acne Marks', 'Rosacea'],
    worksWith: ['Niacinamide', 'Retinol', 'Vitamin C'],
    clashes: [],
    details: 'A gentle acid with antibacterial and anti-inflammatory properties, excellent for rosacea and post-acne marks.'
  },
  'Peptides': {
    time: '4-12 weeks for improved firmness and barrier repair.',
    concerns: ['Sensitive Skin', 'Skin Barrier Repair', 'Anti Aging'],
    worksWith: ['Retinol', 'Vitamin C', 'Hyaluronic Acid'],
    clashes: ['Strong Acids (AHA/BHA)'],
    details: 'Short chains of amino acids that act as building blocks of proteins such as collagen, elastin and keratin.'
  },
  'Snail Mucin': {
    time: '1-2 weeks for hydration, 4-6 weeks for texture improvement.',
    concerns: ['Skin Barrier Repair', 'Dry Skin'],
    worksWith: ['Retinol', 'Vitamin C', 'Niacinamide', 'Salicylic Acid'],
    clashes: [],
    details: 'Rich in glycoproteins, hyaluronic acid, and glycolic acid, it deeply hydrates and repairs the skin barrier.'
  },
  'Benzoyl Peroxide': {
    time: '3-4 weeks for acne reduction.',
    concerns: ['Acne'],
    worksWith: ['Hyaluronic Acid', 'Niacinamide'],
    clashes: ['Retinol', 'Vitamin C'],
    details: 'An antiseptic that reduces the number of acne-causing bacteria on the surface of the skin.'
  },
  'Glycolic Acid': {
    time: 'Immediate glow, 4-8 weeks for hyperpigmentation.',
    concerns: ['Uneven Skin Tone', 'Dark Spots', 'Texture'],
    worksWith: ['Hyaluronic Acid'],
    clashes: ['Retinol', 'Vitamin C', 'Salicylic Acid'],
    details: 'An alpha-hydroxy acid (AHA) that exfoliates the outermost layer of skin to reveal brighter, newer skin.'
  },
  'Retinal': {
    time: '3-4 weeks for texture, 2-4 months for fine lines (works up to 11x faster than retinol).',
    concerns: ['Anti Aging', 'Texture'],
    worksWith: ['Niacinamide', 'Hyaluronic Acid', 'Peptides'],
    clashes: ['Vitamin C', 'Salicylic Acid', 'AHA', 'BHA'],
    details: 'A direct precursor to retinoic acid, making it faster-acting than traditional retinol while often being less irritating.'
  },
  'Bakuchiol': {
    time: '8-12 weeks for anti-aging benefits.',
    concerns: ['Sensitive Skin', 'Anti Aging'],
    worksWith: ['Vitamin C', 'Niacinamide', 'Hyaluronic Acid', 'Salicylic Acid', 'Retinol (sometimes)'],
    clashes: [],
    details: 'A plant-based alternative to retinol that provides similar anti-aging benefits without the typical irritation.'
  },
  'Tranexamic Acid': {
    time: '8-12 weeks for melasma and dark spots.',
    concerns: ['Dark Spots', 'Uneven Skin Tone'],
    worksWith: ['Niacinamide', 'Vitamin C', 'Hyaluronic Acid'],
    clashes: [],
    details: 'An amino acid derivative that interrupts the pathways leading to melanin synthesis, effectively fading discoloration.'
  },
  'Kojic Acid': {
    time: '4-8 weeks for hyperpigmentation.',
    concerns: ['Dark Spots', 'Uneven Skin Tone'],
    worksWith: ['Niacinamide', 'Vitamin C'],
    clashes: [],
    details: 'A chemical produced from different types of fungi that inhibits melanin production.'
  },
  'Ceramide': {
    time: '1-2 weeks for barrier restoration.',
    concerns: ['Skin Barrier Repair', 'Sensitive Skin'],
    worksWith: ['Everything'],
    clashes: [],
    details: 'Lipids (fats) that are found naturally in high concentrations in the uppermost layers of skin, crucial for a healthy barrier.'
  }
};

const defaultFact = {
  time: '4-8 weeks depending on cellular turnover.',
  concerns: ['General Health'],
  worksWith: ['Moisturizer'],
  clashes: [],
  details: 'A critical component of a healthy skincare routine.'
};

const getFact = (title) => {
  for (const [ing, fact] of Object.entries(ingredientFacts)) {
    if (title.includes(ing)) return fact;
  }
  return defaultFact;
};

// Generate content based on title cluster
function generateContent(title, category) {
  const fact = getFact(title);
  
  if (category === 'Timeline') {
    return `
## The Short Answer
If you are wondering **${title.toLowerCase()}**, the clinical answer is typically **${fact.time}**. However, this depends entirely on your skin barrier health and consistency.

## The Science Behind It
${fact.details}

When you apply this to your skin, it doesn't work overnight. Skincare is a marathon, not a sprint. The skin operates on a 28-day cellular turnover cycle (which slows down as we age). This means any product you use needs at least one full cycle to show true results at the cellular level.

## Phase 1: The Initial Reaction (Days 1-7)
During the first week, you might experience either immediate hydration (in the case of humectants) or a slight "purge" if you are using an active ingredient that accelerates cell turnover. Don't panic—this means it's working. Focus on hydration and barrier support.

## Phase 2: The Cellular Shift (Weeks 4-6)
By week four, you've completed one full cycle. This is where the magic happens. You should start seeing a reduction in your primary concerns, whether that is texture, acne, or dullness. 

## Phase 3: The Long-Term Results (Months 3-6)
Structural changes like collagen production or deep hyperpigmentation fading take time. If you use it consistently for 3 to 6 months, you will see the peak clinical efficacy of the product.

### How to Track It
Stop guessing if it's working. The only way to truly know is to track it visually. At Fasade, we built the ultimate tool to measure exactly how your skin is responding over these critical phases.
    `;
  }
  
  if (category === 'Comparisons') {
    return `
## Head to Head: Which is right for you?
When it comes to **${title}**, making the right choice depends heavily on your skin type and specific goals. Both are clinically proven, but they operate through completely different pathways.

### The Breakdown
${fact.details}

## Efficacy and Timeline
Generally, expect **${fact.time}**. While one might work slightly faster for surface-level issues, the other might provide deeper structural benefits over a 6-month period.

## The Verdict
You don't always have to choose. In some routines, they can be complementary. However, if your skin is sensitive, start with the gentler option and track your skin's response daily.
    `;
  }
  
  if (category === 'Combinations') {
    return `
## The Golden Rule of Mixing
**${title}** This is one of the most common questions in dermatology. 

Mixing actives can either create a powerhouse routine or lead to a compromised skin barrier.

### Can they be mixed?
Based on clinical chemistry, ${fact.clashes.length > 0 ? `you should be extremely careful mixing this with ${fact.clashes.join(', ')}.` : `yes, this is generally considered a safe and synergistic combination.`}

### How to layer them safely
1. **Consistency:** Apply from thinnest to thickest consistency.
2. **pH Levels:** Apply lower pH (more acidic) products first.
3. **Time of Day:** Consider using one in the morning and one at night to minimize irritation.

### Watch for Irritation
The most important factor is your skin's tolerance. Monitor for redness, stinging, or excessive dryness. If you notice these, dial back usage immediately to protect your barrier.
    `;
  }

  return `
## Understanding Your Skin
${fact.details}

When dealing with this specific concern, patience and consistency are your best friends. Expect results in **${fact.time}**.

### The Root Cause
Often, skincare stops working because the skin barrier is compromised, preventing active ingredients from doing their job. 

### The Solution
Strip your routine back to basics. Cleanser, moisturizer, SPF, and *one* targeted active. Track your progress for 28 days.
  `;
}

const clusters = {
  'Timeline': [
    'How Long Does Niacinamide Take to Work?', 'How Long Does Retinol Take to Work?', 'How Long Does Vitamin C Take to Work?',
    'How Long Does Hyaluronic Acid Take to Work?', 'How Long Does Salicylic Acid Take to Work?', 'How Long Does Azelaic Acid Take to Work?',
    'How Long Do Peptides Take to Work?', 'How Long Does Snail Mucin Take to Work?', 'How Long Does Benzoyl Peroxide Take to Work?',
    'How Long Does Glycolic Acid Take to Work?', 'How Long Does Retinal Take to Work?', 'How Long Does Bakuchiol Take to Work?',
    'How Long Does Tranexamic Acid Take to Work?', 'How Long Does Kojic Acid Take to Work?', 'How Long Does Ceramide Take to Repair Skin?',
    'How Long Does Skin Barrier Repair Take?', 'How Long Does Skincare Take to Work?', 'How Long Does It Take for Acne Skincare to Work?',
    'How Long Does It Take for Dark Spot Products to Work?', 'How Long Does It Take for a New Skincare Routine to Work?'
  ],
  'Ingredient Focus': [
    'Niacinamide for Oily Skin', 'Niacinamide for Sensitive Skin', 'Niacinamide for Large Pores', 'Niacinamide for Dark Spots', 'Niacinamide for Uneven Skin Tone',
    'Retinol for Oily Skin', 'Retinol for Sensitive Skin', 'Retinol for Dark Spots', 'Retinol for Acne Scars', 'Retinol for Large Pores',
    'Azelaic Acid for Dark Spots', 'Azelaic Acid for Sensitive Skin', 'Azelaic Acid for Acne Marks', 'Salicylic Acid for Large Pores', 'Salicylic Acid for Oily Skin',
    'Peptides for Sensitive Skin', 'Peptides for Skin Barrier Repair', 'Hyaluronic Acid for Sensitive Skin', 'Vitamin C for Uneven Skin Tone', 'Tranexamic Acid for Dark Spots'
  ],
  'Combinations': [
    'Can You Use Niacinamide With Retinol?', 'Can You Use Niacinamide With Vitamin C?', 'Can You Use Niacinamide With Salicylic Acid?', 'Can You Use Niacinamide With AHA?',
    'Can You Use Retinol With Vitamin C?', 'Can You Use Retinol With Salicylic Acid?', 'Can You Use Retinol With Hyaluronic Acid?', 'Can You Use Retinol With Peptides?',
    'Can You Use Retinol With Azelaic Acid?', 'Can You Use Vitamin C With Salicylic Acid?', 'Can You Use Vitamin C With Hyaluronic Acid?', 'Can You Use Vitamin C With Peptides?',
    'Can You Use Azelaic Acid With Niacinamide?', 'Can You Use Azelaic Acid With Retinol?', 'Can You Use Azelaic Acid With Vitamin C?', 'Can You Use Salicylic Acid With Niacinamide?',
    'Can You Use Salicylic Acid With Hyaluronic Acid?', 'Can You Use Peptides With Retinol?', 'Can You Use Peptides With Vitamin C?', 'Can You Use Tranexamic Acid With Niacinamide?'
  ],
  'Comparisons': [
    'Niacinamide vs Vitamin C', 'Retinol vs Retinal', 'Retinol vs Bakuchiol', 'Niacinamide vs Azelaic Acid', 'Salicylic Acid vs Azelaic Acid',
    'Vitamin C vs Niacinamide for Dark Spots', 'Retinol vs Salicylic Acid for Acne', 'Hyaluronic Acid vs Niacinamide', 'Peptides vs Retinol', 'Peptides vs Hyaluronic Acid',
    'Azelaic Acid vs Niacinamide for Acne', 'Tranexamic Acid vs Vitamin C for Dark Spots', 'Retinol vs Peptides for Anti Aging', 'AHA vs BHA for Acne', 'Retinal vs Bakuchiol'
  ],
  'Troubleshooting': [
    'Why Is My Skincare Not Working?', 'Why Is My Skincare Routine Not Working?', 'Why Is My Retinol Not Working?', 'Why Is My Niacinamide Not Working?', 'Why Is My Vitamin C Not Working?',
    'Why Is My Acne Skincare Not Working?', 'Why Are My Dark Spots Not Fading?', 'Why Is My Skin Getting Worse After Starting Skincare?', 'Why Does My Skin Look Worse After Starting Retinol?',
    'Why Is My Skin Still Oily After Skincare?', 'Why Is My Skin Still Dry After Using Moisturizer?', 'Why Is My Skin Still Breaking Out With a Skincare Routine?',
    'Why Are My Pores Still Visible After Skincare?', 'Why Is My Skin Texture Not Improving?', 'How Do I Know If My Skincare Routine Is Working?'
  ],
  'Trends': [
    'Copper Peptides for Skin', 'Copper Peptides vs Retinol', 'Copper Peptides With Retinol', 'Copper Peptides for Skin Barrier', 'Peptides vs Copper Peptides',
    'Bakuchiol vs Retinol for Sensitive Skin', 'Skin Barrier Repair After Over Exfoliation', 'How to Repair a Damaged Skin Barrier', 'Skincare Routine for Skin Barrier Repair', 'Is My Skin Barrier Damaged?'
  ]
};

function toSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function fetchUnsplashImage(query) {
  try {
    const res = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_KEY}&orientation=landscape`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.urls.regular;
  } catch (e) {
    return null;
  }
}

async function generateAll() {
  const blogs = [];
  console.log("Generating 100 SEO Blog Posts...");

  for (const [category, titles] of Object.entries(clusters)) {
    for (const title of titles) {
      // Create a deterministic fallback image if API rate limit hits
      const searchQuery = title.includes('Skin') ? 'skincare' : (title.split(' ')[0] + ' skin');
      
      // Throttle slightly to respect Unsplash API limits
      await new Promise(r => setTimeout(r, 200)); 
      
      let coverImage = await fetchUnsplashImage(searchQuery);
      if (!coverImage) {
        coverImage = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop';
      }

      const slug = toSlug(title);
      const excerpt = `Discover the truth about ${title}. Learn the science, the timeline, and how to track your real results.`;
      
      blogs.push({
        title,
        slug,
        category,
        excerpt,
        content: generateContent(title, category),
        coverImage,
        readTime: Math.floor(Math.random() * 4) + 3, // 3-6 mins
        lastUpdated: new Date().toISOString()
      });
      console.log(`Generated: ${title}`);
    }
  }

  const dataDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(path.join(dataDir, 'blogs.json'), JSON.stringify(blogs, null, 2));
  console.log("Successfully generated all blogs in src/data/blogs.json");
}

generateAll();
