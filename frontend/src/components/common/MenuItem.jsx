const MenuItem = ({ onClick, icon: Icon, label, variant = 'default' }) => {
  const baseStyles = "w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors";
  
  const variants = {
    default: "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600",
    red: "text-red-500 hover:bg-red-50 font-semibold"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]}`}
    >
      {Icon && <Icon size={18} className={variant === 'default' ? "opacity-70" : ""} />}
      {label}
    </button>
  );
};

export default MenuItem;