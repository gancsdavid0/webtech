import { Shield } from 'lucide-react';

const UserStats = ({ title, countLabel, count }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white mb-6 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
        <Shield className="text-indigo-600" /> {title}
      </h2>
      <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold">
        {count} {countLabel}
      </span>
    </div>
  );
};

export default UserStats;