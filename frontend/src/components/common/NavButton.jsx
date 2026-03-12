// Navigációs menü gombok
const NavButton = ({ onClick, icon: Icon, label, className = "" }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100/50 transition text-slate-700 font-medium ${className}`}
  >
    {Icon && <Icon size={18} className="text-indigo-600" />}
    <span>{label}</span>
  </button>
);

export default NavButton;