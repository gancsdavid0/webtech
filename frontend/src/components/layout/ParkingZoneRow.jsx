import { FaRegTrashAlt } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { translations } from '../../translations.js';

const ParkingZoneRow = ({ zone, onDelete }) => {
  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];

  return (
    <div className="bg-white/80 hover:bg-white transition-colors p-4 mb-2 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between group">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 flex-1">
        <div className="min-w-[200px]">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.name}</p>
          <p className="font-bold text-gray-800">{zone.name}</p>
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.address}</p>
          <p className="text-gray-600">{zone.address}</p>
        </div>
      </div>

      <button 
        onClick={() => onDelete(zone)}
        className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm"
        title={t.delete}
      >
        <FaRegTrashAlt size={16} />
      </button>
    </div>
  );
};

export default ParkingZoneRow;