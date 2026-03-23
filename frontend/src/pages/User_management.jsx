import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { translations } from '../translations.js';
import { userService } from '../api/userService';
import backgroundImage from '../assets/images/home_bg.jpg';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import UserStats from '../components/common/UserStats';
import UserTable from '../components/common/UserTable';
import UserSearch from '../components/layout/UserSearch';

const User_management = () => {
  const { currentLang } = useLanguage();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  // Név vagy Email alapján szűrés
  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return users.filter(user => 
      user.fullName?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const handleDelete = async (userId) => {
    if (!window.confirm(t.confirm_delete)) return;
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = userData?.token || userData?.accessToken;
    const result = await userService.deleteUser(userId, token);

    if (result.ok) {
      setUsers(prev => prev.filter(u => (u.id || u._id) !== userId));
    } else {
      alert(t.delete_error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(currentLang.code === 'hu' ? 'hu-HU' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden" style={{ backgroundImage: `url(${backgroundImage})` }}>
      
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="flex-1 bg-white/70 backdrop-blur-[2px] flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto py-8 px-4">
          <div className="max-w-7xl mx-auto">
            
            <UserStats 
              title={t.users_management} 
              countLabel={t.users_total} 
              count={users.length} 
            />

            <UserSearch 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              placeholder={t.search_placeholder} 
            />

            <UserTable 
              users={filteredUsers} // Szűrt lista
              loading={loading} 
              t={t} 
              formatDate={formatDate} 
              onDelete={handleDelete} 
            />

          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default User_management;