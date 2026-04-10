import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import { useVehicles } from '../hooks/useVehicles.js';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Toast from '../components/common/Toast.jsx';
import AddVehicleModal from '../components/layout/AddVehicleModal.jsx';
import { Car, Trash2, Plus } from 'lucide-react';

const Vehicles = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const t = translations[currentLang.code];
  const { vehicles, loading, addVehicle, removeVehicle } = useVehicles();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    document.title = `ParkolóGo | ${t.my_vehicles}`;
  }, [currentLang, t.my_vehicles]);

  const handleAdd = async (data) => {
    try {
      await addVehicle(data);
      setToast({ message: t.vehicle_added, type: 'success' });
    } catch (err) {
      setToast({ message: t.save_error, type: 'error' });
    }
  };

  const handleDelete = async (id, plate) => {
    if (window.confirm(`${t.confirm_delete}: ${plate}`)) {
      try {
        await removeVehicle(id);
        setToast({ message: t.delete_success, type: 'success' });
      } catch (err) {
        setToast({ message: t.vdelete_error, type: 'error' });
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed" 
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <AddVehicleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAdd} t={t} />

      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="flex-1 bg-white/70 backdrop-blur-[2px] flex flex-col min-h-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-bold text-gray-800 drop-shadow-sm">{t.my_vehicles}</h1>
              <button onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95">
                <Plus size={20} /> {t.new_vehicle}
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicles.map(vehicle => (
                  <div key={vehicle.id} className="bg-white/80 p-6 rounded-2xl shadow-md border border-white flex justify-between items-center group hover:bg-white transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Car size={24} /></div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{vehicle.make} {vehicle.model}</h3>
                        <p className="text-blue-600 font-mono font-bold tracking-widest">{vehicle.licensePlate}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(vehicle.id, vehicle.licensePlate)}
                      className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}

                {vehicles.length === 0 && (
                  <div className="col-span-full text-center py-20 bg-white/40 rounded-3xl border-2 border-dashed border-gray-300 text-gray-500">
                    {t.no_vehicles}
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

export default Vehicles;