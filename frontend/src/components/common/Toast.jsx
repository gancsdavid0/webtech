import React, { useEffect } from 'react';
import { ShieldCheck, X, AlertCircle } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700',
  };

  const icons = {
    success: <ShieldCheck size={20} className="text-green-600" />,
    error: <AlertCircle size={20} className="text-red-600" />,
  };

  return (
    <div className={`fixed top-24 right-5 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all animate-in fade-in slide-in-from-right-4 duration-300 ${styles[type]}`}>
      {icons[type]}
      <span className="font-bold">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;