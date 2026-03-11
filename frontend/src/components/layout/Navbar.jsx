import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, CalendarDays, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations.js';
import { authService } from '../../api/auth';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { currentLang, setCurrentLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const t = translations[currentLang.code];

  const languages = [
    { code: 'HU', name: 'Magyar' },
    { code: 'EN', name: 'English' },
    { code: 'JP', name: '日本語'},
    { code: 'ID', name: 'Indonesia'},
    { code: 'DE', name: 'Deutsch'}
  ];

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
    <header className="bg-white/90 shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <img src="/webicon.png" alt="Logo" className="h-10 w-10 object-contain transition-transform group-hover:scale-105" />
          <h1 className="text-2xl font-bold text-indigo-600">ParkolóGo</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100/50 transition text-slate-700 font-medium">
              <span>{currentLang.name}</span>
              <ChevronDown size={16} className={langOpen ? 'rotate-180' : ''} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
                {languages.map((lang) => (
                  <button key={lang.code} onClick={() => { setCurrentLang(lang); setLangOpen(false); }} className="w-full px-4 py-3 hover:bg-indigo-50 text-slate-700 text-left font-medium">
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => navigate('/parking_lots')} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100/50 transition text-slate-700 font-medium">
            <MapPin size={18} className="text-indigo-600" />
            <span>{t.parking_areas}</span>
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/booking')} className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-bold text-sm">
                <CalendarDays size={16} /> {t.book_now}
              </button>
              <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 font-medium text-sm">
                {t.logout}
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 font-medium">
              {t.login}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;