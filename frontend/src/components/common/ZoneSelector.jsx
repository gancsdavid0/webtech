import { ChevronDown, ChevronUp, MapPin, Loader2 } from 'lucide-react';
import ZoneCard from '../layout/ZoneCard';

const ZoneSelector = ({ zones, loading, error, selectedZone, onSelect, isOpen, setIsOpen, t }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-white/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <MapPin size={24} />
          <span className="text-xl font-semibold">
            {selectedZone ? `${t.selected}: ${selectedZone.name}` : t.choose_zone}
          </span>
        </div>
        {isOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
      </button>

      {isOpen && (
        <div className="p-6 bg-gray-50/50">
          {loading && (
            <div className="flex flex-col items-center py-10 gap-3">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <p className="text-gray-600 font-medium">{t.loading}</p>
            </div>
          )}
          {error && <div className="text-red-500 text-center p-4">{error}</div>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-top">
              {zones.map(zone => (
                <ZoneCard 
                  key={zone.id} 
                  zone={zone} 
                  onSelect={onSelect} 
                  isSelected={selectedZone?.id === zone.id}
                  t={t} 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ZoneSelector;