import React from 'react';
import { LayoutGrid, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

const SpotSelector = ({ spots, loading, selectedSpot, onSelect, isOpen, setIsOpen, t }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-white/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 flex justify-between items-center transition-all ${
          isOpen ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <LayoutGrid size={24} className={isOpen ? 'text-blue-200' : 'text-blue-600'} />
          <span className="text-xl font-semibold">
            {selectedSpot ? `${t.parking_spot}: ${selectedSpot.spotNumber}` : t.choose_spot}
          </span>
        </div>
        {isOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
      </button>

      {isOpen && (
        <div className="p-8 bg-gray-100 border-t">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {spots.map((spot) => (
                <button
                  key={spot.id}
                  disabled={spot.isOccupied} // Ha foglalt, ne lehessen rákattintani
                  onClick={() => onSelect(spot)}
                  className={`
                    aspect-square flex flex-col items-center justify-center rounded-lg border-2 font-bold transition-all
                    ${spot.isOccupied 
                      ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed' 
                      : selectedSpot?.id === spot.id
                        ? 'bg-blue-600 border-blue-700 text-white shadow-lg scale-110'
                        : 'bg-white border-blue-200 text-blue-600 hover:border-blue-500 hover:shadow-md'
                    }
                  `}
                >
                  <span className="text-xs uppercase opacity-70">{t.spot}</span>
                  <span className="text-lg">{spot.spotNumber}</span>
                </button>
              ))}
            </div>
          )}
          
          {/* Jelmagyarázat */}
          <div className="mt-8 flex justify-center gap-6 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border border-blue-200 rounded"></div> {t.free}</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-300 rounded"></div> {t.occupied}</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-600 rounded"></div> {t.selected}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotSelector;