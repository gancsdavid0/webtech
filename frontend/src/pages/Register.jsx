import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { translations } from '../translations.js';
import { useLanguage } from '../context/LanguageContext';

const Register = () => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];

  // Állapotok a jelszavak láthatóságához
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Állapotok a beírt adatokhoz
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordsMatch = confirmPassword === '' || password === confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-indigo-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">ParkolóGo</h2>
          <p className="text-slate-500 mt-2">{t.register_subtitle}</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Név és Email mezők */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.full_name}</label>
            <input type="text" placeholder={t.placeholder_name} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.email}</label>
            <input type="email" placeholder={t.placeholder_email} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
          </div>

          {/* Első jelszó mező */}
          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.password}</label>
            <input 
              type={showPass ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.placeholder_pass}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-[38px] text-slate-400 hover:text-indigo-600">
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Jelszó megerősítése mező */}
          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.confirm_password}</label>
            <input 
              type={showConfirmPass ? "text" : "password"} 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t.placeholder_pass}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition ${!passwordsMatch ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-indigo-500'}`} 
            />
            <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3 top-[38px] text-slate-400 hover:text-indigo-600">
              {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Hibaüzenet kijelzése */}
          {!passwordsMatch && (
            <div className="flex items-center gap-2 text-red-500 text-sm font-medium bg-red-50 p-2 rounded-lg">
              <AlertCircle size={16} />
              <span>{t.password_mismatch}</span>
            </div>
          )}

          <button 
            disabled={!passwordsMatch || password === ''}
            className={`w-full font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95 mt-4 ${(!passwordsMatch || password === '') ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'}`}
          >
            {t.register}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            {t.has_account}{' '}
            <button onClick={() => navigate('/login')} className="text-indigo-600 font-bold hover:underline">{t.login}</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;