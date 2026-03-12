import { useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin, LogOut } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations.js';
import { authService } from '../../api/auth';
import LanguageSelector from '../common/LanguageSelector';
import NavButton from '../common/NavButton';
import ActionButton from '../common/ActionButton';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout hiba:", error);
    } finally {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  return (
    <header className="bg-white/90 shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logó */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <img src="/webicon.png" alt="Logo" className="h-10 w-10 object-contain transition-transform group-hover:scale-105" />
          <h1 className="text-2xl font-bold text-indigo-600">ParkolóGo</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Nyelvválasztó */}
          <LanguageSelector />

          {/* Parkolóterületek gomb*/}
          <NavButton 
            onClick={() => navigate('/parking_areas')} 
            icon={MapPin} 
            label={t.parking_areas} 
          />

          {/* Gombok a navigációs sávon */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <ActionButton 
                onClick={() => navigate('/booking')} 
                icon={CalendarDays} 
                label={t.book_now}
                className="hidden sm:flex"
              />
              <ActionButton 
                onClick={handleLogout}
                icon={LogOut} 
                label={t.logout} 
                variant="red"
              />
            </div>
          ) : (
            <ActionButton 
              onClick={() => navigate('/login')} 
              label={t.login} 
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;