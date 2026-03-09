import { useNavigate, useLocation } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations.js';

const Error = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];

  const displayMessage = location.state?.message || t.error_server;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-sm border border-red-50">
        <XCircle size={80} className="text-red-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.error_title}</h2>
        <p className="text-slate-500 mb-8">{displayMessage}</p>
        <button 
          onClick={() => navigate('/register')} 
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold transition-all active:scale-95"
        >
          {t.try_again}
        </button>
      </div>
    </div>
  );
};
export default Error;