import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import { useParkingZones } from '../hooks/useParkingZones.js';
import ParkingZoneCard from '../components/layout/ParkingCards.jsx'; 
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

const Parking_areas = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[currentLang.code];
  
  // Használjuk a kiszervezett hook-ot
  const { parkingZones, loading } = useParkingZones();

  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.parking_areas}`;
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
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center drop-shadow-sm">
              {t.parking_areas}
            </h1>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {parkingZones.map((zone, index) => (
                  <ParkingZoneCard 
                    key={index} 
                    zone={zone} 
                    buttonText="Foglalás"
                  />
                ))}
              </div>
            )}

            {!loading && parkingZones.length === 0 && (
              <p className="text-center text-gray-600 text-xl mt-10">
                Jelenleg nincsenek elérhető területek.
              </p>
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Parking_areas;