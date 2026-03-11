import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations.js';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Home = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[currentLang.code];

  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.tabtitle}`;
  }, [currentLang, t.tabtitle]);

  return (
    <div 
      className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      {/* Tartalom */}
      <div className="flex-1 bg-white/70 backdrop-blur-[2px] flex flex-col min-h-0">
        <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-6xl font-extrabold text-slate-900 mb-6 leading-tight drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
            {t.title} <br /> 
            <span className="text-indigo-700">{t.subtitle}</span>
          </h2>
          <p className="text-xl text-slate-900 mb-10 max-w-2xl mx-auto font-medium bg-white/60 p-6 rounded-xl backdrop-blur-md shadow-lg border border-white/40">
            {t.description}
          </p>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;