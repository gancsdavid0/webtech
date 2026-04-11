import React from 'react';
import { Car } from 'lucide-react';

const VehicleCard = ({ vehicle, onSelect, isSelected, t }) => (
  <div 
    className={`bg-white p-5 rounded-xl shadow-md border-2 transition-all hover:shadow-xl ${
      isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'
    }`}
  >
    <div className="flex items-center gap-4 mb-3">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
        <Car size={24} />
      </div>
      <div>
        <h3 className="font-bold text-gray-800 uppercase tracking-wider">{vehicle.licensePlate}</h3>
        <p className="text-gray-500 text-sm">{vehicle.make} {vehicle.model}</p>
      </div>
    </div>
    
    <button 
      onClick={() => onSelect(vehicle)}
      className={`w-full py-2 font-semibold rounded-lg transition-all ${
        isSelected 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white'
      }`}
    >
      {isSelected ? (t.selected) : (t.select)}
    </button>
  </div>
);

export default VehicleCard;