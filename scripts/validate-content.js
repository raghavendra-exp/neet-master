import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('=====================================================');
console.log('🔍 NEET MASTER - CONTENT INTEGRITY VALIDATION ENGINE');
console.log('=====================================================');

let errors = 0;
let warnings = 0;

function reportError(file, msg) {
  console.error(`❌ [ERROR] ${file}: ${msg}`);
  errors++;
}

function reportWarning(file, msg) {
  console.warn(`⚠️  [WARN]  ${file}: ${msg}`);
  warnings++;
}

function readJson(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    reportError(relPath, 'File does not exist!');
    return null;
  }
  try {
    const raw = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    reportError(relPath, `JSON parse failure: ${err.message}`);
    return null;
  }
}

// 1. Validate Exams
console.log('\n📋 Validating Exam Configurations...');
const examFiles = [
  'src/data/exams/neet-ug-current.json',
  'src/data/exams/neet-ug-2026.json',
  'src/data/exams/neet-ug-2025.json',
  'src/data/exams/neet-ug-2024.json',
];

examFiles.forEach((file) => {
  const data = readJson(file);
  if (!data) return;
  if (!data.exam || !data.year || !data.officialSource) {
    reportError(file, 'Missing required fields: exam, year, or officialSource');
  }
  if (!data.pattern || data.pattern.totalMarks !== 720) {
    reportError(file, 'Invalid total marks in pattern (must be 720)');
  }
  if (!data.pattern?.markingScheme || data.pattern.markingScheme.correct !== 4 || data.pattern.markingScheme.incorrect !== -1) {
    reportError(file, 'Invalid marking scheme (correct must be +4, incorrect -1)');
  }
  console.log(`  ✓ ${file}: ${data.exam} ${data.year} (Status: ${data.status})`);
});

// 2. Validate Syllabus
console.log('\n📚 Validating NMC Syllabus Files...');
const syllabusFiles = {
  Physics: 'src/data/syllabus/physics.json',
  Chemistry: 'src/data/syllabus/chemistry.json',
  Biology: 'src/data/syllabus/biology.json',
};

const knownChapters = new Set();

for (const [sub, file] of Object.entries(syllabusFiles)) {
  const chapters = readJson(file);
  if (!chapters || !Array.isArray(chapters)) {
    reportError(file, 'Syllabus must be an array of chapters');
    continue;
  }
  console.log(`  ✓ ${file}: ${chapters.length} chapters loaded for ${sub}`);
  chapters.forEach((ch, idx) => {
    if (!ch.id || !ch.name || !ch.subject) {
      reportError(file, `Chapter #${idx} missing id, name, or subject`);
    }
    knownChapters.add(ch.name);
  });
}

// 3. Validate Question Banks & PYQs
console.log('\n❓ Validating Question Banks & Integrity...');
const questionFiles = [
  { name: 'Physics Questions', file: 'src/data/questions/physics-questions.json', subject: 'Physics' },
  { name: 'Chemistry Questions', file: 'src/data/questions/chemistry-questions.json', subject: 'Chemistry' },
  { name: 'Biology Questions', file: 'src/data/questions/biology-questions.json', subject: 'Biology' },
];

const questionIds = new Set();
let totalQuestions = 0;
let totalPyqs = 0;

questionFiles.forEach(({ name, file, subject }) => {
  const questions = readJson(file);
  if (!questions || !Array.isArray(questions)) {
    reportError(file, 'Questions file must be an array');
    return;
  }

  let fileValid = 0;
  questions.forEach((q, idx) => {
    totalQuestions++;
    if (q.isVerifiedPyq) totalPyqs++;

    if (!q.id) {
      reportError(file, `Question at index ${idx} is missing an ID!`);
      return;
    }

    if (questionIds.has(q.id)) {
      reportError(file, `Duplicate question ID detected: ${q.id}`);
    } else {
      questionIds.add(q.id);
    }

    if (!q.question || typeof q.question !== 'string' || q.question.trim().length === 0) {
      reportError(file, `Question [${q.id}] has empty question text`);
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      reportError(file, `Question [${q.id}] must have exactly 4 options (found ${q.options?.length})`);
    }

    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) {
      reportError(file, `Question [${q.id}] has invalid answer index: ${q.answer}`);
    }

    if (!q.explanation || typeof q.explanation !== 'string' || q.explanation.trim().length === 0) {
      reportError(file, `Question [${q.id}] is missing explanation`);
    }

    if (subject && q.subject !== subject) {
      reportWarning(file, `Question [${q.id}] subject mismatch: expected ${subject}, got ${q.subject}`);
    }

    fileValid++;
  });

  console.log(`  ✓ ${name} (${file}): ${fileValid} validated questions`);
});

// 4. Validate Flashcards & Formulas
console.log('\n🎴 Validating Flashcards, Formulas & Diagrams...');
const flashcards = readJson('src/data/flashcards/flashcards.json');
if (flashcards && Array.isArray(flashcards)) {
  console.log(`  ✓ Flashcards: ${flashcards.length} cards`);
}

const formulas = readJson('src/data/formulas/physics-formulas.json');
if (formulas && Array.isArray(formulas)) {
  console.log(`  ✓ Physics Formulas: ${formulas.length} formulas`);
}

const reactions = readJson('src/data/reactions/organic-reactions.json');
if (reactions && Array.isArray(reactions)) {
  console.log(`  ✓ Organic Reactions: ${reactions.length} named reactions`);
}

const diagrams = readJson('src/data/diagrams/diagram-data.json');
if (diagrams && Array.isArray(diagrams)) {
  console.log(`  ✓ Interactive Diagrams: ${diagrams.length} diagrams`);
}

// 5. Validate Medical Colleges & Counselling
console.log('\n🏥 Validating Medical Colleges & Counselling...');
const colleges = readJson('src/data/colleges/medical-colleges.json');
if (colleges && Array.isArray(colleges)) {
  console.log(`  ✓ Medical Colleges: ${colleges.length} institutions mapped`);
}

const counselling = readJson('src/data/counselling/counselling-info.json');
if (counselling && counselling.rounds) {
  console.log(`  ✓ Counselling Info: ${counselling.rounds.length} rounds mapped`);
}

console.log('\n=====================================================');
console.log(`📊 TOTAL QUESTIONS VALIDATED: ${totalQuestions}`);
console.log(`🎯 VERIFIED PYQS:            ${totalPyqs}`);
console.log(`⚠️  WARNINGS:                 ${warnings}`);
console.log(`❌ ERRORS:                   ${errors}`);
console.log('=====================================================');

if (errors > 0) {
  console.error('\n🚨 VALIDATION FAILED! Please fix the errors above.');
  process.exit(1);
} else {
  console.log('\n✅ VALIDATION PASSED! Content integrity is 100% sound.');
  process.exit(0);
}
