import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { LayoutDashboard, CheckSquare, Award, Calendar, Clock, Book, BedDouble, Globe } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Dailies', icon: CheckSquare },
  { name: 'Goals', icon: Award },
  { name: 'Study Plan', icon: Calendar },
  { name: 'Daily Routine', icon: Clock },
  { name: 'Journal', icon: Book },
  { name: 'Sleep Tracker', icon: BedDouble },
  { name: 'Share', icon: Globe },
];

const Sidebar: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { activePage, setActivePage } = context;

  return (
    <nav className="hidden md:flex w-64 h-screen bg-white dark:bg-black border-r border-black/10 dark:border-white/10 p-4 flex-col">
      <div className="mb-8">
        {/* Potentially a logo or brand name here */}
      </div>
      <ul className="space-y-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.name;
          return (
            <li key={item.name}>
              <button
                onClick={() => setActivePage(item.name as any)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-black text-white dark:bg-white dark:text-black' 
                    : 'text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;