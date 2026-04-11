import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

// Hook-ok
import { useParkingZones } from '../hooks/useParkingZones';
import { useVehicles } from '../hooks/useVehicles';
import { useParkingSpots } from '../hooks/useParkingSpots';

// Komponensek
import ZoneSelector from '../components/common/ZoneSelector';
import VehicleSelector from '../components/common/VehicleSelector';
import SpotSelector from '../components/common/SpotSelector';

const Booking = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[currentLang.code];

  // --- ADATOK BETÖLTÉSE ---
  const { parkingZones, loading: zonesLoading, error: zonesError } = useParkingZones();
  const { vehicles, loading: vehiclesLoading } = useVehicles();

  // --- ÁLLAPOTKEZELÉS ---
  
  // 1. Lépés: Parkolóház
  const [isHouseOpen, setIsHouseOpen] = useState(true);
  const [selectedHouse, setSelectedHouse] = useState(null);
  
  // 2. Lépés: Jármű
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // 3. Lépés: Parkolóhely
  const [isSpotOpen, setIsSpotOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  // A parkolóhelyeket csak akkor kérjük le, ha már van kiválasztott ház
  const { spots, loading: spotsLoading } = useParkingSpots(selectedHouse?.id);

  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.book_now}`;
  }, [currentLang, t.book_now]);

  // --- LOGIKA: KIVÁLASZTÁSOK KEZELÉSE ---

  // Helyszín választás
  const handleZoneSelect = (zone) => {
    setSelectedHouse(zone);
    setSelectedSpot(null); // Reseteljük a helyet, ha házat vált
    setIsHouseOpen(false); // Becsukjuk az 1. lépést
    setIsVehicleOpen(true); // Kinyitjuk a 2. lépést
  };

  // Jármű választás
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsVehicleOpen(false); // Becsukjuk a 2. lépést
    setIsSpotOpen(true);    // Kinyitjuk a 3. lépést
  };

  // Parkolóhely választás
  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot);
    setIsSpotOpen(false);   // Becsukjuk a 3. lépést
    // Itt jöhet majd a 4. lépés (Időpont/Naptár) kinyitása
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
          <div className="max-w-6xl mx-auto space-y-6 pb-20">
            
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center drop-shadow-sm">
              {t.book_now}
            </h1>

            {/* 1. LÉPÉS: PARKOLÓHÁZ VÁLASZTÓ */}
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

            {/* 2. LÉPÉS: JÁRMŰ VÁLASZTÓ */}
            {selectedHouse && (
              <div className="animate-in fade-in slide-in-from-top duration-500">
                <VehicleSelector 
                  vehicles={vehicles}
                  loading={vehiclesLoading}
                  selectedVehicle={selectedVehicle}
                  onSelect={handleVehicleSelect}
                  isOpen={isVehicleOpen}
                  setIsOpen={setIsVehicleOpen}
                  t={t}
                />
              </div>
            )}

            {/* 3. LÉPÉS: PARKOLÓHELY VÁLASZTÓ (TÉGLALAPOK) */}
            {selectedHouse && selectedVehicle && (
              <div className="animate-in fade-in slide-in-from-top duration-500">
                <SpotSelector 
                  spots={spots}
                  loading={spotsLoading}
                  selectedSpot={selectedSpot}
                  onSelect={handleSpotSelect}
                  isOpen={isSpotOpen}
                  setIsOpen={setIsSpotOpen}
                  t={t}
                />
              </div>
            )}

            {/* ÖSSZESÍTŐ / KÖVETKEZŐ LÉPÉS INDIKÁTOR */}
            {!isSpotOpen && selectedSpot && (
              <div className="animate-bounce-in p-6 text-center bg-green-50/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-green-400 shadow-inner">
                <p className="text-xl font-bold text-green-800">
                  {selectedHouse.name} • {selectedVehicle.licensePlate} • {selectedSpot.spotNumber}. hely
                </p>
                <p className="text-gray-600 mt-2 font-medium uppercase text-sm tracking-widest">
                  Minden kész a foglalás véglegesítéséhez!
                </p>
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