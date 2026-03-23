import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import { Shield } from 'lucide-react';
import { userService } from '../api/userService';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import UserTableHeader from '../components/layout/UserTableHeader';
import UserTableRow from '../components/layout/UserTableRow';

const User_management = () => {
  const { currentLang } = useLanguage();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = translations[currentLang.code];

  useEffect(() => {
    const userStatus = localStorage.getItem('isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!userStatus || userData?.role !== 'ADMIN') {
      navigate('/');
      return;
    }

    setIsLoggedIn(userStatus);
    document.title = `ParkolóGo | ${t.users_management}`;

    const fetchUsers = async () => {
      const token = userData?.token || userData?.accessToken;
      const result = await userService.getAllUsers(token);
      if (result.ok) {
        const data = result.data;
        setUsers(Array.isArray(data) ? data : data.users || []);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [currentLang, t.users_management, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(currentLang.code === 'hu' ? 'hu-HU' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="flex-1 bg-white/70 backdrop-blur-[2px] flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto py-8 px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Statisztika kártya */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <Shield className="text-indigo-600" /> {t.users_management}
              </h2>
              <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold">
                {users.length} {t.users_total}
              </span>
            </div>

            {/* Táblázat */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <UserTableHeader t={t} />
                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                      <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400 animate-pulse">{t.loading}</td></tr>
                    ) : users.length === 0 ? (
                      <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400">{t.no_users_found}</td></tr>
                    ) : (
                      users.map((user) => (
                        <UserTableRow 
                          key={user.id || user._id} 
                          user={user} 
                          formatDate={formatDate} 
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default User_management;