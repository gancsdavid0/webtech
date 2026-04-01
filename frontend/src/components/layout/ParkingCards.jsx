import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { translations } from '../../translations.js';

const ParkingZoneCard = ({ zone, buttonText }) => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];

  const handleBookingClick = () => {
    navigate('/booking', { 
      state: { 
        zoneId: zone.id, 
        zoneName: zone.name 
      } 
    });
  };

  return (
    <div className="bg-white/90 p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 border border-white flex flex-col h-full">
      <div className="flex-1">
        {/* Név */}
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{zone.name}</h2>
        
        {/* Cím */}
        <div className="flex items-start gap-2 text-gray-600 mb-4">
          <span className="text-xl">📍</span>
          <p className="text-sm font-medium">{zone.address}</p>
        </div>
        
        <p className="text-gray-700 leading-relaxed">
          {t.park_description}
        </p>
      </div>
      
      {/* Gomb a navigációval */}
      <button 
        onClick={handleBookingClick}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200 active:scale-95 transition-all"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ParkingZoneCard;