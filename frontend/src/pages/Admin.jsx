import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import { LayoutDashboard, Users, MapPin, CalendarCheck, ShieldCheck } from 'lucide-react';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

const Admin = () => {
  const { currentLang } = useLanguage();
  const navigate = useNavigate(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[currentLang.code];

  useEffect(() => {
    // Bejelentkezési állapot és adatok lekérése
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('user'));

    // Biztonsági ellenőrzés
    if (!userStatus || userData?.role !== 'ADMIN') {
      navigate('/'); 
      return;
    }

    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.administration}`;
  }, [currentLang, t.administration, navigate]);

  // Gyorselérés az admin felületen
  const adminCards = [
    { 
      icon: Users, 
      label: t.users_management, 
      count: '...', 
      color: 'text-blue-600',
      path: '/admin/user_management'
    },
    { 
      icon: MapPin, 
      label: t.parking_management, 
      count: '...', 
      color: 'text-emerald-600',
      path: '/admin/parking'
    },
    { 
      icon: CalendarCheck, 
      label: t.reservations, 
      count: '...', 
      color: 'text-emerald-600',
      path: '/admin/reservations'
    },
  ];

  return (
    <div 
      className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      {/* Tartalom */}
      <div className="flex-1 bg-white/70 backdrop-blur-[2px] flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto py-8 px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 p-6 rounded-3xl border border-white/50 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                  <LayoutDashboard size={32} />
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-slate-800">{t.administration}</h1>
                  <p className="text-slate-600 flex items-center gap-1.5 text-sm">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    {t.admin_access}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {adminCards.map((card, index) => (
                <div 
                  key={index}
                  onClick={() => navigate(card.path)}
                  className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-slate-50 group-hover:bg-white transition-colors ${card.color}`}>
                      <card.icon size={24} />
                    </div>
                    <span className="text-2xl font-black text-slate-300 group-hover:text-indigo-100 transition-colors">
                      {card.count}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-700 text-lg">{card.label}</h3>
                  <p className="text-sm text-slate-400 mt-1">{t.manage_details}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Admin;