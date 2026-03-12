import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSelector = () => {
  const { currentLang, setCurrentLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: 'HU', name: 'Magyar' },
    { code: 'EN', name: 'English' },
    { code: 'JP', name: '日本語' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'DE', name: 'Deutsch' }
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setLangOpen(!langOpen)} 
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100/50 transition text-slate-700 font-medium"
      >
        <span>{currentLang.name}</span>
        <ChevronDown size={16} className={langOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
      </button>
      
      {langOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)}></div>
          
          <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-100">
            {languages.map((lang) => (
              <button 
                key={lang.code} 
                onClick={() => { 
                  setCurrentLang(lang); 
                  setLangOpen(false); 
                }} 
                className={`w-full px-4 py-3 hover:bg-indigo-50 text-slate-700 text-left font-medium transition-colors ${currentLang.code === lang.code ? 'text-indigo-600 bg-indigo-50/50' : ''}`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;