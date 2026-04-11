import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import { CheckCircle, Loader2, AlertCircle, Calendar, Car, MapPin, LayoutGrid } from 'lucide-react';

// Hook-ok
import { useParkingZones } from '../hooks/useParkingZones';
import { useVehicles } from '../hooks/useVehicles';
import { useParkingSpots } from '../hooks/useParkingSpots';
import { useCreateReservation } from '../hooks/useCreateReservation';

// Komponensek
import ZoneSelector from '../components/common/ZoneSelector';
import VehicleSelector from '../components/common/VehicleSelector';
import DateSelector from '../components/common/DateSelector';
import SpotSelector from '../components/common/SpotSelector';

const Booking = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[currentLang.code];

  // Adatok betöltése
  const { parkingZones, loading: zonesLoading, error: zonesError } = useParkingZones();
  const { vehicles, loading: vehiclesLoading } = useVehicles();
  
  // Választott adatok állapota
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSpot, setSelectedSpot] = useState(null);

  // Accordion (lenyíló sávok) állapota
  const [isHouseOpen, setIsHouseOpen] = useState(true);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isSpotOpen, setIsSpotOpen] = useState(false);

  // Foglalási Hook
  const { submitReservation, loading: isSubmitting, error: submitError, success: isSuccess } = useCreateReservation();
  const { spots, loading: spotsLoading } = useParkingSpots(selectedHouse?.id, startDate, endDate);

  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.book_now}`;
  }, [currentLang, t.book_now]);

  // Helyszín választás
  const handleZoneSelect = (zone) => {
    setSelectedHouse(zone);
    setSelectedSpot(null);
    setIsHouseOpen(false);
    setIsVehicleOpen(true);
  };

  // Jármű választás
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsVehicleOpen(false);
    setIsDateOpen(true);
  };

  const handleDateConfirm = () => {
    if (startDate && endDate) {
      setIsDateOpen(false);
      setIsSpotOpen(true);
    }
  };

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot);
    setIsSpotOpen(false);
  };

  const handleFinalSubmit = async () => {
    await submitReservation({
      spotId: selectedSpot.id,
      vehicleId: selectedVehicle.id,
      startTime: startDate,
      endTime: endDate
    });
  };

  // SIKERES FOGLALÁS UTÁNI NÉZET
  if (isSuccess) {
    return (
      <div className="h-screen w-full flex flex-col bg-white">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6 animate-in zoom-in duration-700">
            <div className="flex justify-center">
              <CheckCircle size={100} className="text-green-500 animate-bounce" />
            </div>
            <h2 className="text-4xl font-black text-gray-800 tracking-tight">{t.reservation_success}</h2>
            <p className="text-gray-600 text-lg">{t.detail}</p>
            <button 
              onClick={() => window.location.href = '/my-bookings'}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200"
            >
              {t.back_to_my_reservations}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div 
      className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="flex-1 bg-white/70 backdrop-blur-[2px] flex flex-col min-h-0 overflow-hidden text-gray-800">
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-6 pb-20">
            
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center drop-shadow-sm">
              {t.book_now}
            </h1>

            {/* 1. Parkolóház */}
            <ZoneSelector 
              zones={parkingZones} loading={zonesLoading} error={zonesError} 
              selectedZone={selectedHouse} onSelect={handleZoneSelect} 
              isOpen={isHouseOpen} setIsOpen={setIsHouseOpen} t={t}
            />

            {/* 2. Autó */}
            {selectedHouse && (
              <div className="animate-in fade-in slide-in-from-top duration-500">
                <VehicleSelector 
                  vehicles={vehicles} loading={vehiclesLoading} selectedVehicle={selectedVehicle}
                  onSelect={handleVehicleSelect} isOpen={isVehicleOpen} setIsOpen={setIsVehicleOpen} t={t}
                />
              </div>
            )}

            {/* 3. Időpont */}
            {selectedVehicle && (
              <div className="animate-in fade-in slide-in-from-top duration-500">
                <DateSelector 
                  startDate={startDate} endDate={endDate}
                  onStartChange={setStartDate} onEndChange={setEndDate}
                  onConfirm={handleDateConfirm} isOpen={isDateOpen} setIsOpen={setIsDateOpen} t={t}
                />
              </div>
            )}

            {/* 4. Helyválasztó */}
            {startDate && endDate && selectedVehicle && (
              <div className="animate-in fade-in slide-in-from-top duration-500">
                <SpotSelector 
                  spots={spots} loading={spotsLoading} selectedSpot={selectedSpot}
                  onSelect={handleSpotSelect} isOpen={isSpotOpen} setIsOpen={setIsSpotOpen} t={t}
                />
              </div>
            )}

            {/* ÖSSZESÍTŐ */}
            {!isSpotOpen && selectedSpot && (
              <div className="animate-in zoom-in duration-500 p-8 text-center bg-green-600 text-white rounded-3xl shadow-2xl border-4 border-white/20">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-widest">{t.reservation_details}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto bg-black/10 p-8 rounded-2xl mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 opacity-70" size={20} />
                    <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">{t.parking_place}</p>
                        <p className="text-lg font-bold leading-tight">{selectedHouse.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="mt-1 opacity-70" size={20} />
                    <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">{t.vehicle}</p>
                        <p className="text-lg font-bold leading-tight">{selectedVehicle.licensePlate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <LayoutGrid className="mt-1 opacity-70" size={20} />
                    <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">{t.spot}</p>
                        <p className="text-lg font-bold leading-tight font-mono">{selectedSpot.spotNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-1 opacity-70" size={20} />
                    <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">{t.time}</p>
                        <p className="text-sm font-bold leading-tight">
                          {startDate.replace('T', ' ')} <br/> {endDate.replace('T', ' ')}
                        </p>
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="mb-6 p-4 bg-red-500/80 rounded-xl flex items-center justify-center gap-3 animate-pulse">
                    <AlertCircle size={24} />
                    <p className="font-bold">{submitError}</p>
                  </div>
                )}

                <button 
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-16 py-5 bg-white text-green-700 font-black rounded-full hover:bg-gray-100 transition-all shadow-xl active:scale-95 text-xl flex items-center justify-center gap-4 mx-auto"
                >
                  {isSubmitting ? (
                    <><Loader2 className="animate-spin" />{t.loading}</>
                  ) : (
                    t.confirm_reservation
                  )}
                </button>
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