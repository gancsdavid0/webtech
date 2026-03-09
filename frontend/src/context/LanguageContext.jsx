import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState({ code: 'HU', name: 'Magyar' });

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);