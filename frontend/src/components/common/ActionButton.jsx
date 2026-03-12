const ActionButton = ({ onClick, icon: Icon, label, variant = "primary", className = "" }) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 font-bold",
    red: "bg-red-50 text-red-600 hover:bg-red-100 font-medium", // Átnevezve 'red'-re, ahogy a Navbarban hívod
  };

  return (
    <button 
      onClick={onClick} 
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition text-sm ${variants[variant]} ${className}`}
    >
      {Icon && (
        <span className="flex items-center justify-center">
          <Icon size={16} />
        </span>
      )}
      <span className="leading-none">{label}</span>
    </button>
  );
};

export default ActionButton;