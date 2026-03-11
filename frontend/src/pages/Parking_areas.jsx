import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

const Parking_areas = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[currentLang.code];

  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.parking_areas}`;
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

        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Parking_areas;