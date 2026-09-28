import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, { en: string; hi: string }> = {
  // Navigation
  "nav.home": { en: "Home", hi: "होम" },
  "nav.updates": { en: "NEET Updates", hi: "नीट अपडेट्स" },
  "nav.syllabus": { en: "Syllabus", hi: "पाठ्यक्रम" },
  "nav.physics": { en: "Physics", hi: "भौतिक विज्ञान" },
  "nav.chemistry": { en: "Chemistry", hi: "रसायन विज्ञान" },
  "nav.biology": { en: "Biology", hi: "जीव विज्ञान" },
  "nav.ncert": { en: "NCERT Master", hi: "NCERT मास्टर" },
  "nav.pyqs": { en: "PYQ Master", hi: "विगत वर्ष प्रश्न (PYQ)" },
  "nav.practice": { en: "Practice Engine", hi: "अभ्यास केंद्र" },
  "nav.mock": { en: "Mock Tests", hi: "मॉक टेस्ट" },
  "nav.errorNotebook": { en: "Error Notebook", hi: "त्रुटि नोटबुक" },
  "nav.flashcards": { en: "Flashcards", hi: "फ्लैशकार्ड" },
  "nav.formulaBook": { en: "Formula Book", hi: "सूत्र पुस्तिका" },
  "nav.reactionMap": { en: "Reaction Map", hi: "अभिक्रिया मानचित्र" },
  "nav.diagrams": { en: "Interactive Diagrams", hi: "चित्र व्याख्या" },
  "nav.books": { en: "Book Library", hi: "पुस्तकालय" },
  "nav.awareness": { en: "Medical Awareness", hi: "चिकित्सा जागरूकता" },
  "nav.counselling": { en: "Counselling Guide", hi: "काउंसलिंग मार्गदर्शिका" },
  "nav.colleges": { en: "Medical Colleges", hi: "मेडिकल कॉलेज" },
  "nav.planner": { en: "Study Planner", hi: "अध्ययन योजना" },
  "nav.roadmap": { en: "0-to-NEET Roadmap", hi: "शून्य से नीट रोडमैप" },
  "nav.examDay": { en: "Exam-Day Mode", hi: "परीक्षा दिवस मोड" },
  "nav.rapidRevision": { en: "Rapid Revision", hi: "तीव्र पुनरावृत्ति" },

  // General Actions
  "btn.startPractice": { en: "Start Practice", hi: "अभ्यास शुरू करें" },
  "btn.takeMock": { en: "Take Full Mock Test", hi: "फुल मॉक टेस्ट दें" },
  "btn.viewSyllabus": { en: "View Syllabus", hi: "पाठ्यक्रम देखें" },
  "btn.explore": { en: "Explore", hi: "विस्तार से देखें" },
  "btn.submit": { en: "Submit Test", hi: "टेस्ट जमा करें" },
  "btn.next": { en: "Next", hi: "आगे" },
  "btn.prev": { en: "Previous", hi: "पीछे" },
  "btn.markReview": { en: "Mark for Review", hi: "समीक्षा हेतु चिन्हित करें" },
  "btn.clearResponse": { en: "Clear Response", hi: "उत्तर मिटाएं" },
  "btn.showExplanation": { en: "Show Explanation", hi: "व्याख्या देखें" },
  "btn.addToErrorNotebook": { en: "Add to Error Notebook", hi: "त्रुटि नोटबुक में जोड़ें" },

  // Status & Badges
  "badge.verifiedPyq": { en: "VERIFIED PYQ", hi: "सत्यापित PYQ" },
  "badge.ncertMapped": { en: "NCERT Mapped", hi: "NCERT आधारित" },
  "badge.official": { en: "OFFICIAL BULLETIN", hi: "आधिकारिक बुलेटिन" },
  "badge.lastVerified": { en: "Last Verified", hi: "अंतिम सत्यापन" },

  // Exam stats
  "stat.totalMarks": { en: "Total Marks", hi: "कुल अंक" },
  "stat.duration": { en: "Duration", hi: "समय अवधि" },
  "stat.totalQuestions": { en: "Total Questions", hi: "कुल प्रश्न" },
  "stat.questionsToAttempt": { en: "Questions to Attempt", hi: "हल करने योग्य प्रश्न" },
  "stat.marking": { en: "Marking Scheme", hi: "अंकन पद्धति" },
  "stat.mode": { en: "Mode of Exam", hi: "परीक्षा का माध्यम" }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('neet_master_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('neet_master_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key]['en'];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
