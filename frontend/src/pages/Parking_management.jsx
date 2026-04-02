import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import { useParkingManagement } from '../hooks/useParkingManagement.js';

import ParkingZoneRow from '../components/layout/ParkingZoneRow.jsx';
import Toast from '../components/common/Toast.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import backgroundImage from '../assets/images/home_bg.jpg';

const Parking_management = () => {
  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState(null);

  const { zones, loading, deleteZone } = useParkingManagement();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    document.title = `ParkolóGo | ${t.parking_management}`;
  }, [currentLang, t.parking_management]);

  const handleDelete = async (zone) => {
    if (window.confirm(`${t.confirm_delete}: ${zone.name}`)) {
      try {
        await deleteZone(zone.id);
        setToast({ message: t.delete_success, type: 'success' });
      } catch (error) {
        setToast({ message: t.delete_error, type: 'error' });
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed" 
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      
      {/* Toast üzenet */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="flex-1 bg-white/70 backdrop-blur-[2px] flex flex-col min-h-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">{t.parking_management}</h1>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md active:scale-95">
                {t.new_parking_area}
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center p-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {zones.map(zone => (
                  <ParkingZoneRow key={zone.id} zone={zone} onDelete={handleDelete} />
                ))}
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

export default Parking_management;