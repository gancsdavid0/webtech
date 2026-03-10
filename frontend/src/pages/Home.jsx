import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, CalendarDays, MapPin } from 'lucide-react';
import { translations } from '../translations.js';
import { useLanguage } from '../context/LanguageContext';
import { authService } from '../api/auth';
import backgroundImage from '../assets/images/home_bg.jpg';

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
    { code: 'JP', name: '日本語'},
    { code: 'ID', name: 'Indonesia'}
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
    document.title = `ParkolóGo | ${t.tabtitle}`;
  }, [currentLang, t.tab_home]);

  // Kijelentkezés
  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error("Logout hiba:", error);
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="min-h-screen bg-white/70 backdrop-blur-[2px] flex flex-col">
        
        <header className="bg-white/90 shadow-sm sticky top-0 z-50 border-b border-slate-100">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            {/* LOGÓ ÉS NÉV */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => navigate('/')}
            >
              <img 
                src="/webicon.png" 
                alt="ParkolóGo Logo" 
                className="h-10 w-10 rounded-lg object-contain transition-transform group-hover:scale-105" 
              />
              <h1 className="text-2xl font-bold text-indigo-600">
                ParkolóGo
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100/50 transition text-slate-700 font-medium"
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

              {/* Navigációs menü */}
              <button 
                onClick={() => navigate('/parking_lots')} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100/50 transition text-slate-700 font-medium"
              >
                <MapPin size={18} className="text-indigo-600" />
                <span>{t.parking_areas}</span>
              </button>

              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <button onClick={() => navigate('/booking')} className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-bold text-sm">
                    <CalendarDays size={16} />
                    {t.book_now}
                  </button>
                  <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium text-sm">
                    {t.logout}
                  </button>
                </div>
              ) : (
                <button onClick={() => navigate('/login')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-medium">
                  {t.login}
                </button>
              )}
            </div>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-32 text-center flex-grow">
          <h2 className="text-6xl font-extrabold text-slate-900 mb-6 leading-tight drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
            {t.title} <br /> 
            <span className="text-indigo-700">{t.subtitle}</span>
          </h2>
          <p className="text-xl text-slate-900 mb-10 max-w-2xl mx-auto font-medium bg-white/60 p-6 rounded-xl backdrop-blur-md shadow-lg border border-white/40">
            {t.description}
          </p>
        </main>
        <footer className="absolute bottom-4 left-0 right-0 text-center text-slate-700 font-medium pointer-events-none">
          <p>&copy; {new Date().getFullYear()} Sipőcz Ádám, Gáncs Dávid - {t.project_name}</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;