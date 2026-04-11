import React from 'react';
import { ChevronDown, ChevronUp, Car, Loader2 } from 'lucide-react';
import VehicleCard from '../layout/VehicleCard';

const VehicleSelector = ({ vehicles, loading, selectedVehicle, onSelect, isOpen, setIsOpen, t }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-white/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 flex justify-between items-center transition-all ${
          isOpen ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <Car size={24} className={isOpen ? 'text-blue-200' : 'text-blue-600'} />
          <span className="text-xl font-semibold">
            {selectedVehicle ? `${t.vehicle}: ${selectedVehicle.licensePlate}` : t.select_vehicle}
          </span>
        </div>
        {isOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
      </button>

      {isOpen && (
        <div className="p-6 bg-gray-50/50">
          {loading ? (
            <div className="flex flex-col items-center py-10 gap-3">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <p className="text-gray-600 font-medium">{t.loading}</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-6 text-gray-500 italic">
              {t.no_vehicles}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-top duration-300">
              {vehicles.map(vehicle => (
                <VehicleCard 
                  key={vehicle.id} 
                  vehicle={vehicle} 
                  onSelect={onSelect} 
                  isSelected={selectedVehicle?.id === vehicle.id}
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

export default VehicleSelector;