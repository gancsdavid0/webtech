function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
        <h1 className="text-4xl font-black text-indigo-600 mb-2">Szia!</h1>
        <p className="text-gray-500 font-medium">A mappaszerkezet tökéletes.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">React</span>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">Tailwind</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Vite</span>
        </div>
      </div>
    </div>
  )
}

export default App