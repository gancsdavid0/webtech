import { User, Mail, Shield, Calendar, RefreshCw } from 'lucide-react';

const UserTableHeader = ({ t }) => {
  const headers = [
    { icon: User, label: t.full_name },
    { icon: Mail, label: t.email},
    { icon: Shield, label: t.role },
    { icon: Calendar, label: t.created_at },
    { icon: RefreshCw, label: t.updated_at},
  ];

  return (
    <thead>
      <tr className="bg-slate-50/50 border-b border-slate-100">
        {headers.map((h, i) => (
          <th key={i} className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <h.icon size={16} /> {h.label}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default UserTableHeader;