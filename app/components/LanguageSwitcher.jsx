'use client';

import React from 'react';
import { useLanguage, languageOptions } from '../lib/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative z-10 md:ml-4">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-amber-600 border border-amber-400 text-white font-medium py-2 px-4 pr-8 rounded hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-300 min-w-[100px] md:min-w-[120px] appearance-none"
        aria-label="Select language"
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};