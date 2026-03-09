import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { translations } from '../translations.js';
import { useLanguage } from '../context/LanguageContext';
import { authService } from '../api/auth';

const Login = () => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { ok, data } = await authService.login(email, password);

      if (ok) {
        navigate('/');
      } else {
        // Átadjuk a 'from' paramétert, hogy tudjuk, honnan jött a hiba
        navigate('/error', { state: { message: data.message, from: '/login' } });
      }
    } catch (err) {
      navigate('/error', { state: { message: t.error_server, from: '/login' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-indigo-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">ParkolóGo</h2>
          <p className="text-slate-500 mt-2">{t.login_subtitle}</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.email}</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder={t.placeholder_email}
            />
          </div>
          
          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.password}</label>
            <input 
              type={showPassword ? "text" : "password"} 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder={t.placeholder_pass}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-slate-400 hover:text-indigo-600 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95 mt-4 ${
              loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            {loading ? "..." : t.login}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-slate-600 text-sm">
            {t.no_account}{' '}
            <button onClick={() => navigate('/register')} className="text-indigo-600 font-bold hover:underline">
              {t.register}
            </button>
          </p>
          <div className="pt-4 border-t border-slate-100">
            <button onClick={() => navigate('/')} className="text-slate-400 hover:text-slate-600 text-sm font-medium transition">
              {t.back_to_home}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;