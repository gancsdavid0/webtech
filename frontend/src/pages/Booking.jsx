import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import { useParkingZones } from '../hooks/useParkingZones';
import ZoneSelector from '../components/common/ZoneSelector';

const Booking = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[currentLang.code];

  // Adatok betöltése a backendről
  const { parkingZones, loading, error } = useParkingZones();

  // Állapotkezelés a választáshoz
  const [isHouseOpen, setIsHouseOpen] = useState(true);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.book_now}`;
  }, [currentLang, t.book_now]);

  const handleZoneSelect = (zone) => {
    setSelectedHouse(zone);
    setIsHouseOpen(false); // Választás után becsukjuk ezt a részt
    // Itt majd kinyithatjuk a következő lépést (pl. setIsVehicleOpen(true))
  };

  return (
    <div 
      className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="flex-1 bg-white/70 backdrop-blur-[2px] flex flex-col min-h-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center drop-shadow-sm">
              {t.book_now}
            </h1>

            {/* 1. Lépés: Parkolóház választó */}
            <ZoneSelector 
              zones={parkingZones}
              loading={loading}
              error={error}
              selectedZone={selectedHouse}
              onSelect={handleZoneSelect}
              isOpen={isHouseOpen}
              setIsOpen={setIsHouseOpen}
              t={t}
            />

            {/* Itt lesz majd a 2. Lépés: Jármű választó */}
            {!isHouseOpen && selectedHouse && (
              <div className="animate-in fade-in slide-in-from-bottom duration-500 p-8 text-center bg-white/40 rounded-2xl border-2 border-dashed border-blue-400">
                <p className="text-xl font-semibold text-blue-900">
                  Helyszín kiválasztva: {selectedHouse.name}
                </p>
                <p className="text-gray-600 mt-2">Készítsd elő a járműválasztót...</p>
              </div>
            )}

          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Booking;