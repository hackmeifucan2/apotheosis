import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Card, { CardHeader } from './Card';
import { Clock, Coffee, Zap, Moon } from 'lucide-react';
import type { RoutineSlot } from '../types';

const RoutineSection: React.FC<{title: string, slots: RoutineSlot[], icon: React.ReactNode, onToggle: (id: number) => void}> = ({ title, slots, icon, onToggle }) => (
    <div>
        <h3 className="flex items-center text-md font-semibold mb-2 text-black dark:text-white">
            {icon} <span className="ml-2">{title}</span>
        </h3>
        <ul className="space-y-2 text-sm">
            {slots.map(slot => (
                <li key={slot.id} className="flex items-center border border-black/10 dark:border-white/10 p-2 rounded-lg">
                    <input
                      type="checkbox"
                      id={`routine-${slot.id}`}
                      checked={slot.completed}
                      onChange={() => onToggle(slot.id)}
                      className="h-4 w-4 rounded border-black/50 dark:border-white/50 bg-transparent text-black dark:text-white focus:ring-black dark:focus:ring-white cursor-pointer"
                    />
                    <label htmlFor={`routine-${slot.id}`} className="ml-3 flex-1 flex justify-between cursor-pointer">
                        <span className={` ${slot.completed ? 'line-through text-neutral-500 dark:text-neutral-400' : 'text-black dark:text-white'}`}>{slot.task}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">{slot.time}</span>
                    </label>
                </li>
            ))}
        </ul>
    </div>
);

const DailyRoutine: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { routine, toggleRoutineSlot } = context;

  const morning = routine.filter(r => r.period === 'Morning');
  const afternoon = routine.filter(r => r.period === 'Afternoon');
  const night = routine.filter(r => r.period === 'Night');

  return (
    <div className="animate-fadeInUp">
        <Card>
            <CardHeader icon={<Clock size={20}/>}>Daily Routine</CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RoutineSection title="Morning" slots={morning} icon={<Coffee size={16}/>} onToggle={toggleRoutineSlot} />
                <RoutineSection title="Afternoon" slots={afternoon} icon={<Zap size={16}/>} onToggle={toggleRoutineSlot} />
                <RoutineSection title="Night" slots={night} icon={<Moon size={16}/>} onToggle={toggleRoutineSlot} />
            </div>
        </Card>
    </div>
  );
};

export default DailyRoutine;
