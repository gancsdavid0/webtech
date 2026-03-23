import { Search, X } from 'lucide-react';

const UserSearch = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="relative mb-6 group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-900 group-focus-within:text-indigo-500 transition-colors" />
      </div>
      <input
        type="text"
        placeholder={`${placeholder}...`}
        className="block w-full pl-11 pr-12 py-3 bg-white/80 backdrop-blur-md border border-white shadow-lg rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-700 placeholder-slate-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button 
          onClick={() => setSearchTerm('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-900 hover:text-red-500 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default UserSearch;