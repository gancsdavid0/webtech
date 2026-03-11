import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Success from './pages/Success';
import Error from './pages/Error';
import Parking_areas from './pages/Parking_areas';
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
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;