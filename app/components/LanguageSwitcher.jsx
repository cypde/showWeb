'use client';

import { useState, useEffect } from 'react';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('en');

  // 从 localStorage 加载语言偏好
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // 切换语言
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    // 触发语言切换事件，让其他组件知道语言已经改变
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
  };

  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      className="px-4 py-2 text-sm font-medium bg-transparent border border-white text-white hover:bg-gray-800 rounded transition-colors"
    >
      <option value="en">English</option>
      <option value="zh">中文</option>
    </select>
  );
};

export default LanguageSwitcher;