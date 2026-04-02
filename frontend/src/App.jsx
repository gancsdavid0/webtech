import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Success from './pages/Success';
import Error from './pages/Error';
import Parking_areas from './pages/Parking_areas';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import User_management from './pages/User_management';
import Parking_management from './pages/Parking_management';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />
          <Route path="/parking_areas" element={<Parking_areas />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/admin/user_management" element={<User_management />} />
          <Route path="/admin/parking_management" element={<Parking_management />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;