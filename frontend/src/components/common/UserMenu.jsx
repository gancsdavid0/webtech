import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations.js';
import { User, ChevronDown, Settings, List, LogOut, ShieldCheck } from 'lucide-react';
import MenuItem from './MenuItem';

const UserMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const navigate = useNavigate();

  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];

  // Admin jogosultság ellenőrzése
  const isAdmin = userData?.role === 'ADMIN';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedUserString = localStorage.getItem('user');
        if (!savedUserString) return;

        const savedUser = JSON.parse(savedUserString);
        const userId = savedUser?.id || savedUser?._id || savedUser?.user?.id;
        const token = savedUser?.token || savedUser?.accessToken; 

        if (!userId || !token) return;

        const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }); 

        if (response.ok) {
          const data = await response.json();
          const finalUser = data.user ? data.user : data;
          
          // Állapotfrissítés
          setUserData(prev => ({ ...prev, ...finalUser }));
          localStorage.setItem('user', JSON.stringify({ ...savedUser, ...finalUser }));
        }
      } catch (error) {
        console.error("UserMenu hiba a lekérés során:", error);
      }
    };
    
    fetchUser();
  }, []);

  return (
    <div className="relative">
      {/* Profil gomb */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-slate-100 transition border border-slate-200 bg-white"
      >
        {/* Profilkép ikon */}
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 overflow-hidden border border-indigo-50 flex-shrink-0">
          {userData?.profileImage ? (
            <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User size={20} />
          )}
        </div>

        {/* Felhasználónév*/}
        <div className="hidden sm:block text-left">
          <p className="text-xs font-bold text-slate-700 leading-none">
            {userData?.fullName}
          </p>
        </div>

        <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in zoom-in duration-150">
            
            <div className="px-4 py-3 border-b border-slate-50 mb-1 bg-slate-50/50">
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{t.logged_in_as}</p>
              <p className="text-sm font-bold text-slate-800 truncate">
                {userData?.fullName}
              </p>
            </div>

            {/* Adminisztráció gomb - csak ADMIN role esetén */}
            {isAdmin && (
              <MenuItem 
                icon={ShieldCheck} 
                label={t.administration}
                onClick={() => { navigate('/admin'); setIsOpen(false); }} 
              />
            )}
            
            {/* Profilbeállítások gomb */}
            <MenuItem 
              icon={Settings} 
              label={t.profile_settings}
              onClick={() => { navigate('/profile'); setIsOpen(false); }} 
            />
            
            {/* Foglalásaim gomb */}
            <MenuItem 
              icon={List} 
              label={t.my_reservations}
              onClick={() => { navigate('/my-bookings'); setIsOpen(false); }} 
            />

            {/* Kijelentkezés gomb */}
            <div className="border-t border-slate-50 mt-2 pt-2">
              <MenuItem 
                variant="red"
                icon={LogOut} 
                label={t.logout} 
                onClick={() => { onLogout(); setIsOpen(false); }} 
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;