import { User, Mail, Shield, Calendar, RefreshCw } from 'lucide-react';

const UserTableRow = ({ user, formatDate }) => {
  return (
    <tr className="hover:bg-indigo-50/30 transition-colors">
      <td className="px-6 py-4 font-semibold text-slate-700">{user.fullName}</td>
      <td className="px-6 py-4 text-slate-600">{user.email}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          user.role === 'ADMIN' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
        }`}>
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">{formatDate(user.createdAt)}</td>
      <td className="px-6 py-4 text-sm text-slate-500">{formatDate(user.updatedAt)}</td>
    </tr>
  );
};

export default UserTableRow;