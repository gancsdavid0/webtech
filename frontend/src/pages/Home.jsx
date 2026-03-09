import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, CalendarDays } from 'lucide-react';
import { translations } from '../translations.js';
import { useLanguage } from '../context/LanguageContext';
import { authService } from '../api/auth';

const Home = () => {
  const navigate = useNavigate();
  
  // Globális nyelvkezelés
  const { currentLang, setCurrentLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const t = translations[currentLang.code];

  const languages = [
    { code: 'HU', name: 'Magyar' },
    { code: 'EN', name: 'English' },
    { code: 'JP', name: '日本語'}
  ];

  // Bejelentkezési állapot ellenőrzése
  useEffect(() => {
    const checkAuth = () => {
      const userStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(userStatus === 'true');
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    // TAB szöveg
    document.title = `ParkolóGo | ${t.tabtitle || 'Home'}`;
  }, [currentLang, t.title]);

  // Kijelentkezés
  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error("Hiba a kijelentkezés során:", error);
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            className="text-2xl font-bold text-indigo-600 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            ParkolóGo
          </h1>
          
          <div className="flex items-center gap-4">
            {/* Nyelvválasztó legördülő */}
            <div className="relative">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition text-slate-700 font-medium"
              >
                <span>{currentLang.name}</span>
                <ChevronDown size={16} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 hover:bg-indigo-50 text-slate-700 transition text-left font-medium"
                    >
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dinamikus gombok a navigációban */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/booking')} 
                  className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-bold text-sm"
                >
                  <CalendarDays size={16} />
                  {t.book_now}
                </button>

                <button 
                  onClick={handleLogout} 
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium text-sm active:scale-95"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')} 
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                {t.login}
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          {t.title} <br /> 
          <span className="text-indigo-600">{t.subtitle}</span>
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
          {t.description}
        </p>
        
        {isLoggedIn && (
          <div className="animate-in fade-in zoom-in duration-500">
            <button 
              onClick={() => navigate('/booking')} 
              className="group flex items-center gap-3 mx-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-95"
            >
              <CalendarDays className="transition-transform group-hover:scale-110" />
              {t.book_now}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;