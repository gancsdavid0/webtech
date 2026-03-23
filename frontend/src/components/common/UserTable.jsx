import UserTableHeader from '../layout/UserTableHeader';
import UserTableRow from '../layout/UserTableRow';

const UserTable = ({ users, loading, t, formatDate, onDelete }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <UserTableHeader t={t} />
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan="6" className="px-6 py-10 text-center text-slate-400 animate-pulse">{t.loading}</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="6" className="px-6 py-10 text-center text-slate-400">{t.no_users_found}</td></tr>
            ) : (
              users.map((user) => (
                <UserTableRow 
                  key={user.id || user._id} 
                  user={user} 
                  formatDate={formatDate} 
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;