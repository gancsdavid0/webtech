import { Trash2 } from 'lucide-react';

const UserTableRow = ({ user, formatDate, onDelete }) => {
  return (
    <tr className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0">
      <td className="px-6 py-4 font-semibold text-slate-700">
        {user.fullName}
      </td>
      <td className="px-6 py-4 text-slate-600">
        {user.email}
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          user.role === 'ADMIN' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
        }`}>
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">
        {formatDate(user.createdAt)}
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">
        {formatDate(user.updatedAt)}
      </td>
      
      {/* Műveletek oszlop */}
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onDelete(user.id || user._id)}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 active:scale-90"
          title="Törlés"
        >
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;