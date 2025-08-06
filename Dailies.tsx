import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Card, { CardHeader } from './Card';
import { CheckSquare, Plus, Trash2 } from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

const categoryColors: Record<Category, string> = {
    [Category.Fitness]: 'bg-red-500/80 text-white',
    [Category.GlowUp]: 'bg-pink-500/80 text-white',
    [Category.Study]: 'bg-blue-500/80 text-white',
    [Category.Mind]: 'bg-purple-500/80 text-white',
    [Category.Football]: 'bg-green-500/80 text-white',
};

const CategoryPill: React.FC<{ category: Category }> = ({ category }) => (
  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${categoryColors[category]}`}>
    {category}
  </span>
);

const Dailies: React.FC = () => {
  const context = useContext(AppContext);
  const [newDaily, setNewDaily] = useState('');
  const [category, setCategory] = useState<Category>(Category.Mind);


  if (!context) return null;

  const { dailies, toggleDaily, addDaily, deleteDaily } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDaily.trim()) {
      addDaily(newDaily.trim(), category);
      setNewDaily('');
    }
  };

  return (
    <div className="animate-fadeInUp">
      <Card>
        <CardHeader icon={<CheckSquare size={20}/>}>Dailies To-Do</CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={newDaily}
            onChange={(e) => setNewDaily(e.target.value)}
            placeholder="Add a new daily task..."
            className="flex-grow w-full px-3 py-2 bg-transparent border border-black/50 dark:border-white/50 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white transition text-black dark:text-white"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full sm:w-auto px-3 py-2 bg-transparent border border-black/50 dark:border-white/50 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white transition text-black dark:text-white dark:[color-scheme:dark]"
            >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <button type="submit" className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
            <Plus size={20}/>
          </button>
        </form>
        <ul className="space-y-3">
          {dailies.map(daily => (
            <li key={daily.id} className="flex items-center group">
              <input
                type="checkbox"
                id={`daily-${daily.id}`}
                checked={daily.completed}
                onChange={() => toggleDaily(daily.id)}
                className="h-5 w-5 rounded border-black/50 dark:border-white/50 bg-transparent text-black dark:text-white focus:ring-black dark:focus:ring-white cursor-pointer"
              />
              <label
                htmlFor={`daily-${daily.id}`}
                className={`ml-3 flex-1 text-sm text-black dark:text-white cursor-pointer ${daily.completed ? 'line-through text-neutral-500 dark:text-neutral-400' : ''}`}
              >
                {daily.text}
              </label>
              <div className="ml-auto flex items-center gap-2">
                <CategoryPill category={daily.category} />
                <button onClick={() => deleteDaily(daily.id)} className="text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Dailies;