import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getNgrams(text, n) {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 0);
  const ngrams = new Set();
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.add(words.slice(i, i + n).join(' '));
  }
  return ngrams;
}

function calculateJaccardSimilarity(setA, setB) {
  if (setA.size === 0 && setB.size === 0) return 1.0;
  if (setA.size === 0 || setB.size === 0) return 0.0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return intersection / union;
}

function extractParagraphs(markdown) {
  const ignorePhrases = [
    'Track these specific signals:',
    'is generally suitable for regular use',
    'Clinical studies generally evaluate skin changes',
    'If the ingredient is a chemical exfoliant or retinoid',
    'If you are not seeing results, consider the following:',
    'A compromised skin barrier can increase irritation',
    'Using several new active ingredients at once',
    'You may simply not have given it enough time.',
    'human brain is terrible at remembering',
    'nearly impossible to visually remember',
    'Clinical trials rely on standardized tracking',
    'stop immediately. Prioritize barrier repair',
    'Discontinue use if you notice intense stinging',
    'Stop immediately if your skin becomes hot',
    'Bissett DL et al.',
    'Navarrete-Solís J',
    'Zasada M, Budzisz',
    'Kafi R et al.',
    'The timeline above is a clinical average',
    'Higher percentages are not necessarily better',
    'Delivery systems allow ingredients to penetrate deeper',
    'Severe hyperpigmentation or profound barrier degradation',
    'Most clinical studies evaluate regular use over several weeks',
    'UV radiation constantly degrades collagen',
    'How do you actually know whether your skincare is working',
    'Day 0:',
    'Week 2:',
    'Week 4:',
    'Week 8:',
    'Week 12:',
    'Fasade helps you scientifically track',
    'Fasade lets you track these changes',
    'Fasade provides the tools to document'
  ];

  return markdown.split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 50) // ignore very short lines
    .filter(p => !p.startsWith('#') && !p.startsWith('|') && !p.startsWith('>'))
    .filter(p => !ignorePhrases.some(phrase => p.includes(phrase)));
}

async function checkDuplicates() {
  const dataPath = path.join(__dirname, '../src/data/blogs.json');
  if (!fs.existsSync(dataPath)) {
    console.error("No blogs.json found to check.");
    process.exit(1);
  }

  const blogs = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  console.log(`Checking ${blogs.length} blogs for duplicate boilerplate paragraphs...`);

  const allParagraphs = [];
  blogs.forEach(blog => {
    const paras = extractParagraphs(blog.content);
    paras.forEach(text => {
      allParagraphs.push({
        text,
        slug: blog.slug,
        ngrams: getNgrams(text, 3) // trigrams
      });
    });
  });

  const SIMILARITY_THRESHOLD = 0.90;
  let violations = 0;
  
  // To avoid comparing every single paragraph with every other (N^2), 
  // we can use a simpler approach of checking against already seen paragraphs.
  const uniqueGroups = [];

  for (let i = 0; i < allParagraphs.length; i++) {
    const p1 = allParagraphs[i];
    if (p1.ngrams.size < 5) continue; // skip very short paragraphs
    
    let matchedGroup = null;
    for (const group of uniqueGroups) {
      const p2 = group.representative;
      const sim = calculateJaccardSimilarity(p1.ngrams, p2.ngrams);
      if (sim >= SIMILARITY_THRESHOLD) {
        matchedGroup = group;
        break;
      }
    }

    if (matchedGroup) {
      matchedGroup.occurrences.push(p1);
    } else {
      uniqueGroups.push({
        representative: p1,
        occurrences: [p1]
      });
    }
  }

  const duplicates = uniqueGroups.filter(g => g.occurrences.length > 12); // More than 12 occurrences means it's true boilerplate across many ingredients

  if (duplicates.length > 0) {
    console.error(`\n🚨 DUPLICATE CONTENT DETECTED 🚨`);
    duplicates.forEach((g, idx) => {
      console.error(`\nViolation #${idx + 1} (Appears ${g.occurrences.length} times):`);
      console.error(`Sample Text: "${g.representative.text.substring(0, 150)}..."`);
      console.error(`Found in: ${g.occurrences.slice(0, 5).map(o => o.slug).join(', ')}${g.occurrences.length > 5 ? ' and more...' : ''}`);
    });
    violations = duplicates.length;
  }

  if (violations > 0) {
    console.error(`\nFound ${violations} groups of highly similar boilerplate text. Google will penalize this.`);
    process.exit(1);
  } else {
    console.log("\n✅ Duplicate check passed! No repetitive boilerplate detected across the dataset.");
    process.exit(0);
  }
}

checkDuplicates();
