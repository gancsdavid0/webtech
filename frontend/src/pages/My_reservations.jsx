import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import { useUserReservations } from '../hooks/useUserReservations';
import { Calendar, Car, MapPin, Clock, Loader2, AlertCircle, Info, LayoutGrid } from 'lucide-react';

const My_reservations = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[currentLang.code];
  
  const { reservations, loading, error } = useUserReservations();

  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.my_reservations}`;
  }, [currentLang, t.my_reservations]);

  // Időpont formázó segédfüggvény
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(currentLang.code === 'hu' ? 'hu-HU' : 'en-US', options);
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
          <div className="max-w-5xl mx-auto pb-10">
            <h1 className="text-4xl font-black text-gray-800 mb-8 text-center drop-shadow-sm uppercase italic">
              {t.my_reservations}
            </h1>

            {/* Betöltési állapot */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-blue-600 mb-4" size={50} />
                <p className="text-gray-600 font-medium italic">{t.loading}...</p>
              </div>
            ) : error ? (
              /* Hibaüzenet */
              <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-xl flex items-center gap-4">
                <AlertCircle className="text-red-500" size={30} />
                <p className="text-red-700 font-bold">{error}</p>
              </div>
            ) : reservations.length === 0 ? (
              /* Nincs foglalás állapot */
              <div className="bg-white/80 p-12 rounded-3xl shadow-xl text-center flex flex-col items-center gap-4">
                <Info size={60} className="text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-700 uppercase italic">Nincsenek még foglalásaid</h2>
                <button 
                  onClick={() => window.location.href = '/booking'}
                  className="mt-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg"
                >
                  {t.book_now || "Foglalás most"}
                </button>
              </div>
            ) : (
              /* Foglalások listája */
              <div className="grid grid-cols-1 gap-6">
                {reservations.map((res) => (
                  <div 
                    key={res.id} 
                    className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-white hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Bal oldal: Zóna adatok */}
                    <div className="bg-blue-600 p-6 md:w-1/4 text-white flex flex-col justify-center items-center">
                      <MapPin size={32} className="mb-2 opacity-80" />
                      <span className="text-[10px] uppercase font-bold opacity-70 tracking-widest">{t.parking_place}</span>
                      <h3 className="text-xl font-black text-center leading-tight">
                        {/* Az általad küldött JSON-hoz igazítva */}
                        {res.spot?.parkingZone?.name || 'Parkolóház'}
                      </h3>
                    </div>

                    {/* Közép: Jármű és hely adatok */}
                    <div className="p-6 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Jármű */}
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Car size={24}/></div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400">{t.vehicle}</p>
                          <p className="font-bold text-gray-700">
                            {res.vehicle?.licensePlate || 'Nincs megadva'}
                          </p>
                        </div>
                      </div>

                      {/* Parkolóhely száma */}
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><LayoutGrid size={24}/></div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400">{t.spot}</p>
                          <p className="font-bold text-gray-700">
                            {res.spot?.spotNumber || 'N/A'}
                          </p>
                        </div>
                      </div>

                      {/* Időintervallum */}
                      <div className="flex items-center gap-3 col-span-1 sm:col-span-2">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Clock size={24}/></div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400">{t.time}</p>
                          <p className="text-sm font-bold text-gray-700">
                            {formatDate(res.startTime)} 
                            <span className="mx-2 text-gray-400">—</span> 
                            {formatDate(res.endTime)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Jobb oldal: Lemondás gomb */}
                    <div className="p-6 bg-gray-50 md:w-1/5 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-100">
                      <button 
                        className="text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-all text-sm uppercase tracking-wider"
                        onClick={() => alert(`Lemondás funkció fejlesztés alatt (ID: ${res.id})`)}
                      >
                        {t.cancel_reservation || "Lemondás"}
                      </button>
                    </div>
                  </div>
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

export default My_reservations;