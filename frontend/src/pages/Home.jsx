import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">ParkolóGo</h1>
          <button onClick={() => navigate('/login')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
            Bejelentkezés
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-extrabold text-slate-900 mb-6">
          Találd meg a tökéletes parkolóhelyet <br /> 
          <span className="text-indigo-600">másodpercek alatt!</span>
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Foglalj biztonságos parkolót előre, és kerüld el a városi körözést. 
          Egyszerű, gyors és megbízható megoldás minden sofőrnek.
        </p>
        
        {/* Ide kerül egy olyan rész ami kilistázza milyen helyszíneken vannak parkolók */}
        
      </main>
    </div>
  );
};

export default Home;