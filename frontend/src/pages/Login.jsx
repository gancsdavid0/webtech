import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { translations } from '../translations.js'; 
import { useLanguage } from '../context/LanguageContext'; 

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-indigo-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">ParkolóGo</h2>
          <p className="text-slate-500 mt-2">{t.login_subtitle}</p> 
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.email}</label> 
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="mail@mail.example"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.password}</label>
            <input 
            type={showPassword ? "text" : "password"} 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            placeholder="••••••••"
            />

            <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-indigo-600 transition"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95">
            {t.login}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <button 
            onClick={() => navigate('/')} 
            className="text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            {t.back_to_home}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;