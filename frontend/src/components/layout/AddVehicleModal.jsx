import { useState } from 'react';
import { X } from 'lucide-react';

const AddVehicleModal = ({ isOpen, onClose, onAdd, t }) => {
  const [formData, setFormData] = useState({ make: '', model: '', licensePlate: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(formData);
    setFormData({ make: '', model: '', licensePlate: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{t.new_vehicle}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24}/></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.make}</label>
            <input required className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} placeholder="pl. BMW" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.model}</label>
            <input required className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} placeholder="pl. 320d" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.license_plate}</label>
            <input required className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 uppercase"
              value={formData.licensePlate} onChange={(e) => setFormData({...formData, licensePlate: e.target.value})} placeholder="ABC-123" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
            {t.save}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;