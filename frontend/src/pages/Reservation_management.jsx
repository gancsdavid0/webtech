import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import { useAdminReservations } from '../hooks/useAdminReservation';
import { Loader2, AlertCircle, User, Car, Calendar, MapPin, CheckCircle2, XCircle } from 'lucide-react';

const Reservation_management = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[currentLang.code];
  
  const { reservations, loading, error } = useAdminReservations();

  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.reservations}`;
  }, [currentLang, t.reservations]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString(currentLang.code === 'hu' ? 'hu-HU' : 'en-US');
  };

  return (
    <div 
      className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="flex-1 bg-white/80 backdrop-blur-md flex flex-col min-h-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center drop-shadow-sm">
              {t.reservations}
            </h1>

            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={48} /></div>
            ) : error ? (
              <div className="bg-red-50 border-2 border-red-200 p-4 rounded-2xl flex items-center gap-3 text-red-700">
                <AlertCircle /> {error}
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">{t.status}</th>
                      <th className="px-6 py-4 flex items-center gap-2"><User size={14}/> {t.uname}</th>
                      <th className="px-6 py-4"><MapPin size={14} className="inline mr-1"/> {t.spot}</th>
                      <th className="px-6 py-4"><Car size={14} className="inline mr-1"/> {t.vehicle}</th>
                      <th className="px-6 py-4"><Calendar size={14} className="inline mr-1"/> {t.time}</th>
                      <th className="px-6 py-4 text-right">{t.ammount}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reservations.map((res) => (
                      <tr 
                        key={res.id} 
                        className={`transition-colors ${res.status === 'CANCELLED' ? 'bg-red-50/40 grayscale-[0.3]' : 'hover:bg-blue-50/50'}`}
                      >
                        <td className="px-6 py-4 font-mono text-gray-400 text-sm">#{res.id}</td>
                        <td className="px-6 py-4">
                          {res.status === 'ACTIVE' ? (
                            <span className="flex items-center gap-1 text-green-600 font-bold text-[10px] bg-green-100 px-2 py-1 rounded-full w-fit">
                              <CheckCircle2 size={12} /> ACTIVE
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-600 font-bold text-[10px] bg-red-100 px-2 py-1 rounded-full w-fit">
                              <XCircle size={12} /> CANCELLED
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-800">{res.user?.fullName || 'N/A'}</div>
                          <div className="text-xs text-gray-500">{res.user?.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-700">{res.spot?.parkingZone?.name}</div>
                          <div className="text-xs text-blue-600 font-bold">{t.spot}: {res.spot?.spotNumber}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-600">
                            {res.vehicle?.licensePlate || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-600">
                          <div>{formatDate(res.startTime)}</div>
                          <div className="text-gray-400 font-bold text-center">v-</div>
                          <div>{formatDate(res.endTime)}</div>
                        </td>
                        <td className="px-6 py-4 text-right font-black text-green-600">
                          {res.totalPrice.toLocaleString()} Ft
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {reservations.length === 0 && (
                  <div className="p-10 text-center text-gray-400">{t.no_reservation}</div>
                )}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Reservation_management;