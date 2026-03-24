import { Trash2, ChevronDown } from 'lucide-react';

const UserTableRow = ({ user, formatDate, onDelete, onRoleChange }) => {
  return (
    <tr className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0 group">
      <td className="px-6 py-4 font-semibold text-slate-700">{user.fullName}</td>
      <td className="px-6 py-4 text-slate-600">{user.email}</td>
      
      <td className="px-6 py-4">
        <div className="relative inline-block w-32">
          <select
            value={user.role}
            onChange={(e) => onRoleChange(user.id || user._id, e.target.value)}
            className={`appearance-none w-full px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider text-center cursor-pointer transition-all duration-200 border border-transparent shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none ${
              user.role === 'ADMIN' 
                ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 hover:shadow-md' 
                : user.role === 'RECEPTION'
                ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 hover:shadow-md'
                : 'bg-gradient-to-r from-slate-100 to-indigo-50 text-slate-600 hover:shadow-md'
            }`}
          >
            <option value="USER" className="bg-white text-slate-600">USER</option>
            <option value="RECEPTION" className="bg-white text-emerald-700">RECEPTION</option>
            <option value="ADMIN" className="bg-white text-amber-700">ADMIN</option>
          </select>
          
          {/* Egyedi legördülő nyíl ikon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-50">
            <ChevronDown size={14} strokeWidth={3} />
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">{formatDate(user.createdAt)}</td>
      <td className="px-6 py-4 text-sm text-slate-500">{formatDate(user.updatedAt || user.createdAt)}</td>
      
      {/* Műveletek oszlop */}
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onDelete(user.id || user._id)}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-90"
          title="Törlés"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;