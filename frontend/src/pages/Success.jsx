import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations.js';

const Success = () => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-sm border border-indigo-50">
        <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.reg_success_title}</h2>
        <p className="text-slate-500 mb-8">{t.reg_success_desc}</p>
        <button 
          onClick={() => navigate('/')} 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
        >
          {t.back_home}
        </button>
      </div>
    </div>
  );
};
export default Success;