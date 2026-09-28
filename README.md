# NEET MASTER 🩺🇮🇳
> **Complete NEET-UG Learning, Practice, PYQ, Mock Test & Revision Platform**
> *From Zero to AIIMS: A comprehensive, bilingual, NCERT-grounded preparation ecosystem for Indian medical aspirants.*

[![Deploy to GitHub Pages](https://github.com/raghavendra-exp/neet-master/actions/workflows/deploy.yml/badge.svg)](https://github.com/raghavendra-exp/neet-master/actions/workflows/deploy.yml)
[![Content Integrity Validation](https://github.com/raghavendra-exp/neet-master/actions/workflows/content-validation.yml/badge.svg)](https://github.com/raghavendra-exp/neet-master/actions/workflows/content-validation.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Questions](https://img.shields.io/badge/Questions-1%2C514%20Validated-emerald.svg)](#question-bank)
[![Verified PYQs](https://img.shields.io/badge/PYQs-363%20Verified-blue.svg)](#pyq-master)

---

## 🌟 The 9-Stage Preparation Journey

NEET Master is structured to guide every student methodically through:

```
[0. ZERO] ───► [1. FOUNDATION] ───► [2. NCERT MASTER] ───► [3. CONCEPT DRILL]
                                                                    │
[7. EXAM DAY] ◄─── [6. REVISION] ◄─── [5. MOCK TEST] ◄─── [4. PRACTICE & PYQ]
      │
      ▼
🏆 [ADMISSION & COUNSELLING]
```

1. **Zero / Orientation:** Understand eligibility, exam pattern (720 marks, 200 mins), age criteria, and official timelines.
2. **Foundation:** Master SI units, dimensional analysis, basic calculus, vector algebra, and basic stoichiometry.
3. **NCERT Master:** Direct link-ups to official ePathshala NCERT textbooks with line-by-line review tags.
4. **Concept Drill:** Deep dives into high-yield topics, named organic reactions, and physics formulas.
5. **Practice Engine:** Filter questions by Subject, Chapter, Difficulty (Easy, Medium, Hard), and Question Type.
6. **PYQ Master:** 363 verified past-year questions tagged with year (2024, 2023, 2022...) and detailed reasoning.
7. **Full Mock Test:** Strict NEET 720-mark simulation (Section A 35 compulsory + Section B attempt 10 of 15, 200 min timer, official 5-state question palette, +4/-1 scoring).
8. **Error Notebook & Flashcards:** 8-type diagnostic mistake classification (Calculation, Conceptual, Misread, Formula, etc.) with Leitner spaced repetition.
9. **Exam Day & Counselling:** Strict dress code rules, admit card guidelines, MCC 15% All India Quota, and top medical colleges database.

---

## ✨ Key Features

### 🇮🇳 Bilingual First (Hindi + English)
- Instant, non-destructive switching between English and Hindi across the entire interface, questions, options, and explanations.
- Authentic Devanagari typography using `Noto Sans Devanagari` and `Inter`.

### 📜 Authoritative & NMC Syllabus-Aligned
- Strict adherence to the revised National Medical Commission (NMC) syllabus.
- **NMC Added Topics:** Practical Physics (Screw Gauge, Vernier Calipers), Frog & Cockroach, Malvaceae, Cruciferae explicitly highlighted.
- **Deleted Chapters Flagged:** Clearly alerts students on omitted topics (Solid State, Hydrogen, s-Block, Metallurgy, Digestion, Transport in Plants, etc.).
- Multi-year versioned exam configurations (`neet-ug-current.json`, `2026`, `2025`, `2024`) with `lastVerified` audit timestamps.

### 🎯 1,514 Question Bank & 363 Verified PYQs
- **Zero hardcoded vanity metrics:** All counters across the app are dynamically computed from the validated database.
- **Strict Question Schema:** Every question contains 4 options, a 0-indexed answer, detailed bilingual explanation, subject, chapter, topic, and difficulty.
- **Question Types:** MCQs, Assertion-Reason, Statement-based, Match-the-following, and Numerical values.

### ⏱️ Full 720-Mark Simulation Engine
- **Official Structure:**
  - Physics (Sec A: 35 | Sec B: 15, attempt any 10)
  - Chemistry (Sec A: 35 | Sec B: 15, attempt any 10)
  - Botany (Sec A: 35 | Sec B: 15, attempt any 10)
  - Zoology (Sec A: 35 | Sec B: 15, attempt any 10)
- **Official 5-State Question Palette:** Not Visited (Gray), Not Answered (Red), Answered (Green), Marked for Review (Purple), Answered & Marked for Review (Purple with Green badge).
- **Auto-Evaluation:** Enforces Section B first-10-attempted rule, calculates total score out of 720, accuracy percentage, and subject breakdown.

### 📓 Diagnostic Error Notebook & Spaced Repetition
- Categorize mistakes into 8 diagnostic types:
  1. *Calculation Error*
  2. *Conceptual Misunderstanding*
  3. *Misread Question / Options*
  4. *Formula Memory Lapse*
  5. *Time Pressure Rush*
  6. *Silly Mistake / OMR Bubbling*
  7. *Overthinking / Trap Question*
  8. *Guesswork*
- Leitner spaced repetition flashcards (review intervals: 1, 3, 7, 15, 30, 60 days).

### 🧬 Medical Science Awareness Center
- Free, educational primer introducing aspirants to anatomy, clinical medicine, pharmacology, and medical history.
- **Explicitly disclaimed as non-syllabus** to prevent any confusion with NEET examination requirements.

### 🏛️ Counselling & Medical College Database
- Complete breakdown of MCC 15% All India Quota (AIQ) vs 85% State Quota.
- Mandatory document checklist (Admit Card, Rank Card, Class 10/12 Certificates, Category Certificates, PwD Certificates).
- Seat matrix, approximate annual fees, and opening/closing ranks for top institutions (AIIMS New Delhi, JIPMER Puducherry, MAMC New Delhi, VMMC, KGMU Lucknow, etc.).

### 📱 PWA & Mobile-First Design
- Responsive from 320px to 4K displays with zero horizontal overflow.
- Offline-capable Progressive Web App (PWA) with `manifest.json` and service worker caching.
- Fast client-side performance built on Vite.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v3.4 (with dark mode and custom scrollbars)
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **Build Tool:** Vite 6
- **Hosting & CI/CD:** GitHub Pages + GitHub Actions

---

## 📂 Project Structure

```
neet-master/
├── .github/
│   └── workflows/
│       ├── deploy.yml              # GitHub Pages automated build & deploy
│       ├── content-validation.yml  # PR & push schema integrity validator
│       ├── link-check.yml          # Weekly portal health check
│       └── update-data.yml         # Exam sync audit workflow
├── public/
│   ├── favicon.svg                 # Medical cross favicon
│   ├── manifest.json               # PWA Web App Manifest
│   └── sw.js                       # Service worker for offline caching
├── scripts/
│   ├── generate-question-bank.js   # Question generator script
│   ├── validate-content.js         # Content & question schema validator
│   └── link-checker.js             # Official link health tester
├── src/
│   ├── components/                 # Navbar, Sidebar, MobileNav, Search, QuestionCard, QuestionPalette, Footer
│   ├── context/                    # LanguageContext, ThemeContext, UserProgressContext
│   ├── data/
│   │   ├── awareness/              # Medical science awareness modules
│   │   ├── books/                  # Legitimate publisher links (NCERT, MTG, HCV, etc.)
│   │   ├── colleges/               # Medical colleges database
│   │   ├── counselling/            # MCC AIQ & state quota counselling rules
│   │   ├── diagrams/               # Heart, Nephron, Neuron diagrams
│   │   ├── exams/                  # NEET-UG current, 2026, 2025, 2024 JSONs
│   │   ├── flashcards/             # Spaced repetition flashcards
│   │   ├── formulas/               # High-yield physics formula book
│   │   ├── ncert/                  # NCERT line-by-line ePathshala mapping
│   │   ├── questions/              # 1,514 questions across Physics, Chemistry, Biology
│   │   ├── reactions/              # Named organic reactions & mechanisms
│   │   ├── syllabus/               # NMC revised syllabus for Physics, Chemistry, Biology
│   │   └── updates/                # Official notifications and circulars
│   ├── pages/                      # 22 specialized pages covering every step of the journey
│   ├── types/                      # Comprehensive TypeScript definitions
│   ├── App.tsx                     # Main application layout and navigation router
│   ├── index.css                   # Global styles and Tailwind directives
│   ├── main.tsx                    # Root rendering with providers
│   └── vite-env.d.ts               # Environment and module declarations
├── index.html                      # HTML5 entry with PWA tags and fonts
├── package.json                    # Dependencies and npm scripts
├── tailwind.config.js              # Custom brand greens, medical blues, and fonts
├── tsconfig.json                   # Strict TypeScript compiler options
└── vite.config.ts                  # Vite build configuration with base './'
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/raghavendra-exp/neet-master.git

# Navigate to the project directory
cd neet-master

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Content Validation
Run the content validator to check that all questions, syllabus chapters, and exam schemas are 100% valid:
```bash
npm run validate
```

### Production Build
```bash
npm run build
```
The compiled, optimized production bundle will be output to the `dist/` directory.

---

## 🔒 Copyright & Source Integrity Policy

NEET Master is committed to 100% copyright safety and authoritative data sourcing:
1. **No Pirated Content:** We never host or distribute unauthorized PDFs, full textbooks, or paid question banks.
2. **Authoritative Links:** All book recommendations link directly to legitimate publisher websites (NCERT, National Digital Library, MTG, Arihant, Bharati Bhawan).
3. **Primary Sources:** All exam updates and pattern changes are grounded in official releases by the National Testing Agency (NTA), National Medical Commission (NMC), and Medical Counselling Committee (MCC).
4. **Original Explanations:** Explanations and solution breakdowns are authored to foster conceptual clarity and critical problem-solving skills.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
