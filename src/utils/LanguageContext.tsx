import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// 定义语言类型
type Language = 'en' | 'zh';

// 定义上下文类型
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言选项
export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
];

// 上下文提供者组件
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // 从localStorage获取语言设置，默认为英文
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'zh' ? 'zh' : 'en') as Language;
  });

  // 当语言改变时，保存到localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // 切换语言的辅助函数
  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'zh' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自定义钩子，方便组件使用语言上下文
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
