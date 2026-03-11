import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations.js';

const Footer = ({ className }) => {
  const { currentLang } = useLanguage();
  const t = translations[currentLang.code];

  return (
    <footer className={`w-full py-6 text-center text-slate-700 font-medium ${className}`}>
      <p>&copy; {new Date().getFullYear()} Sipőcz Ádám, Gáncs Dávid - {t.project_name}</p>
    </footer>
  );
};

export default Footer;