
import React, { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const ThemeToggle: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;