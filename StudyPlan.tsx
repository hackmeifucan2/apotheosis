import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, X, Trash2 } from 'lucide-react';
import Card, { CardHeader } from './Card';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

const categoryColors: Record<Category, string> = {
  [Category.Fitness]: 'bg-red-500/80 text-white',
  [Category.GlowUp]: 'bg-pink-500/80 text-white',
  [Category.Study]: 'bg-blue-500/80 text-white',
  [Category.Mind]: 'bg-purple-500/80 text-white',
  [Category.Football]: 'bg-green-500/80 text-white',
};

const AddTaskModal = ({ date, onClose, onAddTask }: { date: Date, onClose: () => void, onAddTask: (text: string, category: Category) => void }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>(Category.Study);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text, category);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-black dark:text-white">Add Task for {date.toLocaleDateString()}</h3>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700">
                  <X size={20} className="text-black dark:text-white"/>
              </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
              <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Task description..."
                  className="w-full px-3 py-2 bg-transparent border border-black/50 dark:border-white/50 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white transition text-black dark:text-white"
                  autoFocus
              />
              <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3 py-2 bg-transparent border border-black/50 dark:border-white/50 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white transition text-black dark:text-white dark:[color-scheme:dark]"
              >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <button type="submit" className="w-full p-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                  Add Task
              </button>
          </form>
      </Card>
    </div>
  );
};

const StudyPlan: React.FC = () => {
  const context = useContext(AppContext);
  const [viewDate, setViewDate] = useState(new Date());
  const [modalState, setModalState] = useState<{ isOpen: boolean; date: Date | null }>({ isOpen: false, date: null });

  if (!context) return null;

  const { studyTasks, addStudyTask, toggleStudyTask, deleteStudyTask } = context;

  const handleAddTask = (text: string, category: Category) => {
    if (modalState.date) {
      addStudyTask(text, modalState.date.toISOString(), category);
    }
  };

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
    const paddingDays = Array.from({ length: firstDayOfMonth }, () => null);

    return [...paddingDays, ...days];
  }, [viewDate]);

  const tasksByDate = useMemo(() => {
    const map = new Map<string, typeof studyTasks>();
    studyTasks.forEach(task => {
        const dateKey = new Date(task.date).toDateString();
        if (!map.has(dateKey)) {
            map.set(dateKey, []);
        }
        map.get(dateKey)!.push(task);
    });
    return map;
  }, [studyTasks]);

  const today = new Date();

  return (
    <div className="animate-fadeInUp">
      {modalState.isOpen && modalState.date && (
        <AddTaskModal 
          date={modalState.date} 
          onClose={() => setModalState({ isOpen: false, date: null })}
          onAddTask={handleAddTask}
        />
      )}
      <Card>
        <CardHeader icon={<CalendarIcon size={20}/>}>Study Calendar</CardHeader>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-black dark:text-white">{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
          <div className="flex items-center space-x-2">
            <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))} className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => setViewDate(new Date())} className="px-3 py-1 text-sm rounded-md border border-black/20 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-neutral-800">
              Today
            </button>
            <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))} className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-xs text-neutral-500 dark:text-neutral-400 p-2">{day}</div>
          ))}
          {calendarDays.map((day, index) => (
            <div 
              key={index} 
              className="relative h-24 sm:h-32 p-2 border border-black/10 dark:border-white/10 rounded-md bg-neutral-50/50 dark:bg-neutral-900/50 flex flex-col cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => day && setModalState({ isOpen: true, date: day })}
            >
              {day && (
                <>
                  <span className={`text-xs font-bold ${day.toDateString() === today.toDateString() ? 'bg-black text-white dark:bg-white dark:text-black rounded-full w-5 h-5 flex items-center justify-center' : 'text-black dark:text-white'}`}>
                    {day.getDate()}
                  </span>
                  <div className="mt-1 space-y-1 overflow-y-auto text-xs">
                    {(tasksByDate.get(day.toDateString()) || []).map(task => (
                      <div key={task.id} className="group flex items-center text-left p-1 rounded" style={{ backgroundColor: categoryColors[task.category].replace('text-white', 'text-black dark:text-white').replace('/80', '/40')}}>
                        <input type="checkbox" id={`cal-task-${task.id}`} checked={task.completed} onChange={() => toggleStudyTask(task.id)} onClick={(e) => e.stopPropagation()} className="h-3 w-3 mr-1 rounded-sm border-black/50 dark:border-white/50 bg-transparent text-black dark:text-white focus:ring-black dark:focus:ring-white cursor-pointer"/>
                        <label htmlFor={`cal-task-${task.id}`} className={`flex-1 ${task.completed ? 'line-through opacity-60' : ''}`} onClick={(e) => e.stopPropagation()}>{task.text}</label>
                        <button onClick={(e) => {e.stopPropagation(); deleteStudyTask(task.id)}} className="ml-1 text-neutral-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudyPlan;