import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import { User, Mail, ShieldCheck, Edit2, Lock, Save, X } from 'lucide-react';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import { userService } from '../api/userService.js';
import Toast from '../components/common/Toast.jsx';

const Profile = () => {
  const { currentLang } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ fullName: '', email: '', password: '' });
  const [statusMessage, setStatusMessage] = useState({ show: false, type: '', text: '' });
  const t = translations[currentLang.code];

  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    const savedUser = localStorage.getItem('user');
    
    setIsLoggedIn(userStatus);
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserData(parsed);
      setEditData({ fullName: parsed.fullName, email: parsed.email, password: '' });
    }
    
    document.title = `ParkolóGo | ${t.profile}`;
  }, [currentLang, t.profile]);

  // Mentés funkció
  const handleSave = async () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const userId = savedUser?.id || savedUser?._id;
    const token = savedUser?.token || savedUser?.accessToken;

    if (!userId || !token) {
      setStatusMessage({ show: true, type: 'error', text: t.missing_id_error });
      return;
    }

    const updateBody = {
      fullName: editData.fullName,
      email: editData.email,
    };
    
    if (editData.password.trim() !== '') {
      updateBody.password = editData.password;
    }

    const result = await userService.updateProfile(userId, token, updateBody);

    if (result.ok) {
      const updatedUser = { ...savedUser, fullName: editData.fullName, email: editData.email };
      
      setUserData(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
      setEditData(prev => ({ ...prev, password: '' })); 
      setStatusMessage({ show: true, type: 'success', text: t.profile_update_success });
    } else {
      setStatusMessage({ show: true, type: 'error', text: t.profile_update_error });
    }
  };

  return (
    <div 
      className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Toast értesítés */}
      {statusMessage.show && (
        <Toast 
          message={statusMessage.text} 
          type={statusMessage.type} 
          onClose={() => setStatusMessage({ ...statusMessage, show: false })} 
        />
      )}

      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      {/* Doboz konténer */}
      <div className="flex-1 bg-white/70 backdrop-blur-[2px] flex flex-col min-h-0 overflow-hidden">
        
        {/* Main rész */}
        <main className="flex-1 flex justify-center items-center px-4 min-h-0">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="bg-indigo-600 p-8 text-white relative">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner overflow-hidden">
                  {userData?.profileImage ? (
                    <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-white" />
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-indigo-100 opacity-80">{t.logged_in_as}</p>
                  <h2 className="text-2xl font-bold">{userData?.fullName}</h2>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Teljes név */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <User size={14} /> {t.full_name}
                  </label>
                  {isEditing ? (
                    <input 
                      type="text"
                      className="w-full p-3 bg-white rounded-xl border-2 border-indigo-100 focus:border-indigo-600 outline-none text-slate-700 transition-colors"
                      value={editData.fullName}
                      onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                    />
                  ) : (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                      {userData?.fullName}
                    </div>
                  )}
                </div>

                {/* E-mail cím */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Mail size={14} /> {t.email}
                  </label>
                  {isEditing ? (
                    <input 
                      type="email"
                      className="w-full p-3 bg-white rounded-xl border-2 border-indigo-100 focus:border-indigo-600 outline-none text-slate-700 transition-colors"
                      value={editData.email}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                    />
                  ) : (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                      {userData?.email}
                    </div>
                  )}
                </div>

                {/* Jelszó */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Lock size={14} /> {t.password}
                  </label>
                  {isEditing ? (
                    <input 
                      type="password"
                      placeholder={t.new_password}
                      className="w-full p-3 bg-white rounded-xl border-2 border-indigo-100 focus:border-indigo-600 outline-none text-slate-700 transition-colors"
                      value={editData.password}
                      onChange={(e) => setEditData({...editData, password: e.target.value})}
                    />
                  ) : (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium tracking-widest">
                      ••••••••••••
                    </div>
                  )}
                </div>

                {/* Fiók státusz */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck size={14} /> {t.account_status}
                  </label>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-indigo-600 font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {t.confirmed}
                  </div>
                </div>
              </div>

              {/* Gombok */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-3">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
                    >
                      <X size={18} /> {t.cancel}
                    </button>
                    <button 
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-200 active:scale-95"
                    >
                      <Save size={18} /> {t.save}
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95"
                  >
                    <Edit2 size={18} />
                    {t.edit_profile}
                  </button>
                )}
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Profile;