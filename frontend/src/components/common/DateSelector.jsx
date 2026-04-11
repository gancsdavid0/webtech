import React from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const DateSelector = ({ startDate, endDate, onStartChange, onEndChange, isOpen, setIsOpen, t }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-white/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 flex justify-between items-center transition-all ${
          isOpen ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <Calendar size={24} className={isOpen ? 'text-blue-200' : 'text-blue-600'} />
          <span className="text-xl font-semibold">
            {startDate && endDate ? `${startDate.replace('T', ' ')} - ${endDate.replace('T', ' ')}` : t.when}
          </span>
        </div>
        {isOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
      </button>

      {isOpen && (
        <div className="p-6 bg-gray-50/50 border-t flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-500 uppercase mb-2">{t.arrive}</label>
            <input 
              type="datetime-local" 
              className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 outline-none"
              value={startDate}
              onChange={(e) => onStartChange(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-500 uppercase mb-2">{t.leave}</label>
            <input 
              type="datetime-local" 
              className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 outline-none"
              value={endDate}
              onChange={(e) => onEndChange(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button 
              disabled={!startDate || !endDate}
              onClick={() => setIsOpen(false)} 
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 transition-all"
            >
              {t.confirm_date}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;