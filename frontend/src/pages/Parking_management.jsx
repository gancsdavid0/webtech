import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import { useParkingManagement } from '../hooks/useParkingManagement.js';
import ParkingZoneRow from '../components/layout/ParkingZoneRow.jsx';
import AddZoneModal from '../components/layout/AddZoneModal.jsx';
import Toast from '../components/common/Toast.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import backgroundImage from '../assets/images/home_bg.jpg';

const Parking_management = () => {
  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { zones, loading, deleteZone, addZone } = useParkingManagement();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    document.title = `ParkolóGo | ${t.parking_management}`;
  }, [currentLang, t.parking_management]);

  const showToast = (message, type) => setToast({ message, type });

  const handleAddZone = async (formData) => {
    try {
      await addZone(formData);
      showToast(t.save_success || 'Sikeresen hozzáadva!', 'success');
    } catch (error) {
      showToast(t.save_error || 'Hiba a mentés során!', 'error');
    }
  };

  const handleDelete = async (zone) => {
    const confirmMsg = `${t.confirm_delete || 'Biztosan törlöd?'} : ${zone.name}`;
    if (window.confirm(confirmMsg)) {
      try {
        await deleteZone(zone.id);
        showToast(t.delete_success, 'success');
      } catch (error) {
        showToast(t.delete_error, 'error');
      }
    }
  };

  return (
    <div 
      className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      
      {/* Toast üzenet */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <AddZoneModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddZone}
        t={t}
      />

      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="flex-1 bg-white/70 backdrop-blur-[2px] flex flex-col min-h-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8 bg-white/50 p-6 rounded-2xl shadow-sm">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{t.parking_management}</h1>
                <p className="text-gray-600 mt-1">{zones.length} {t.parking_areas || 'parkolóhely rögzítve'}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                {t.new_parking_area}
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {zones.map(zone => (
                  <ParkingZoneRow 
                    key={zone.id} 
                    zone={zone} 
                    onDelete={handleDelete} 
                  />
                ))}
                
                {!loading && zones.length === 0 && (
                  <div className="text-center py-20 bg-white/40 rounded-3xl border-2 border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">{t.no_parking_areas}</p>
                  </div>
                )}
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