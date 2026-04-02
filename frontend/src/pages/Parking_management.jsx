import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

const Parking_management = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[currentLang.code];
  
  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.parking_management}`;
  }, [currentLang, t.parking_areas]);

  return (
    <div 
      className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="flex-1 bg-white/70 backdrop-blur-[2px] flex flex-col min-h-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Parking_management;