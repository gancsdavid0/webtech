const ZoneCard = ({ zone, onSelect, isSelected, t }) => (
  <div className={`bg-white p-5 rounded-xl shadow-md border-2 transition-all hover:shadow-xl ${
    isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'
  }`}>
    <h3 className="font-bold text-gray-800 text-lg mb-2">{zone.name}</h3>
    <p className="text-gray-600 text-sm mb-4">{zone.address}</p>
    <div className="flex justify-center items-center">
      <button 
        onClick={() => onSelect(zone)}
        className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all"
      >
        {t.select}
      </button>
    </div>
  </div>
);

export default ZoneCard;