import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Priority, Category } from '../types';
import Card, { CardHeader } from './Card';
import { Award, Plus, Trash2 } from 'lucide-react';
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

const Goals: React.FC = () => {
  const context = useContext(AppContext);
  const [newGoal, setNewGoal] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [category, setCategory] = useState<Category>(Category.Study);

  if (!context) return null;

  const { goals, toggleGoal, addGoal, deleteGoal } = context;

  const priorityClasses: Record<Priority, string> = {
      [Priority.High]: 'bg-red-600 dark:bg-red-500',
      [Priority.Medium]: 'bg-yellow-500 dark:bg-yellow-400',
      [Priority.Low]: 'bg-blue-500 dark:bg-blue-400',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      addGoal(newGoal.trim(), priority, category);
      setNewGoal('');
      setPriority(Priority.Medium);
    }
  };

  return (
    <div className="animate-fadeInUp">
        <Card>
        <CardHeader icon={<Award size={20}/>}>Goals & Priorities</CardHeader>
         <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add a new goal..."
                className="flex-grow w-full px-3 py-2 bg-transparent border border-black/50 dark:border-white/50 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white transition text-black dark:text-white"
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full sm:w-auto px-3 py-2 bg-transparent border border-black/50 dark:border-white/50 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white transition text-black dark:text-white dark:[color-scheme:dark]"
            >
                <option value={Priority.High}>High</option>
                <option value={Priority.Medium}>Medium</option>
                <option value={Priority.Low}>Low</option>
            </select>
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
            {goals.map(goal => (
            <li key={goal.id} className="flex items-center group">
                <input
                type="checkbox"
                id={`goal-${goal.id}`}
                checked={goal.completed}
                onChange={() => toggleGoal(goal.id)}
                className="h-5 w-5 rounded border-black/50 dark:border-white/50 bg-transparent text-black dark:text-white focus:ring-black dark:focus:ring-white cursor-pointer"
                />
                <label
                htmlFor={`goal-${goal.id}`}
                className={`ml-3 flex-1 text-sm text-black dark:text-white cursor-pointer ${goal.completed ? 'line-through text-neutral-500 dark:text-neutral-400' : ''}`}
                >
                {goal.text}
                </label>
                <div className="ml-auto flex items-center gap-3">
                    <CategoryPill category={goal.category} />
                    <span
                    title={`Priority: ${goal.priority}`}
                    className={`h-3 w-3 rounded-full ${priorityClasses[goal.priority]}`}
                    ></span>
                    <button onClick={() => deleteGoal(goal.id)} className="text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
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

export default Goals;