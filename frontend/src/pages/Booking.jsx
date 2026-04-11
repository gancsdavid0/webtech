import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

// Hook-ok
import { useParkingZones } from '../hooks/useParkingZones';
import { useVehicles } from '../hooks/useVehicles';

// Komponensek
import ZoneSelector from '../components/common/ZoneSelector';
import VehicleSelector from '../components/common/VehicleSelector';

const Booking = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[currentLang.code];

  // Adatok betöltése
  const { parkingZones, loading: zonesLoading, error: zonesError } = useParkingZones();
  const { vehicles, loading: vehiclesLoading } = useVehicles();

  // Állapotkezelés - Választás és Lenyitás
  const [isHouseOpen, setIsHouseOpen] = useState(true);
  const [selectedHouse, setSelectedHouse] = useState(null);
  
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.book_now}`;
  }, [currentLang, t.book_now]);

  // Logika: Helyszín kiválasztása
  const handleZoneSelect = (zone) => {
    setSelectedHouse(zone);
    setIsHouseOpen(false); // Bezárjuk az 1. lépést
    setIsVehicleOpen(true); // Kinyitjuk a 2. lépést
  };

  // Logika: Jármű kiválasztása
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsVehicleOpen(false); // Bezárjuk a 2. lépést
    // Itt majd kinyitjuk a 3. lépést (Időpont választó)
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
              loading={zonesLoading}
              error={zonesError}
              selectedZone={selectedHouse}
              onSelect={handleZoneSelect}
              isOpen={isHouseOpen}
              setIsOpen={setIsHouseOpen}
              t={t}
            />

            {/* 2. Lépés: Jármű választó */}
            {selectedHouse && (
              <VehicleSelector 
                vehicles={vehicles}
                loading={vehiclesLoading}
                selectedVehicle={selectedVehicle}
                onSelect={handleVehicleSelect}
                isOpen={isVehicleOpen}
                setIsOpen={setIsVehicleOpen}
                t={t}
              />
            )}

            {/* Itt lesz majd a 3. Lépés: Időpont */}
            {!isVehicleOpen && selectedVehicle && (
              <div className="animate-in fade-in slide-in-from-bottom duration-500 p-6 text-center bg-green-50/50 rounded-2xl border-2 border-dashed border-green-400">
                <p className="text-lg font-bold text-green-800 italic">
                  Helyszín: {selectedHouse.name} | Jármű: {selectedVehicle.licensePlate}
                </p>
                <p className="text-gray-600 mt-1 uppercase text-xs tracking-widest font-bold">Jöhet a naptár!</p>
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