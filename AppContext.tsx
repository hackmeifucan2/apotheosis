
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Task, Goal, StudyTask, RoutineSlot, SleepData, Priority, SpiderDataPoint, JournalEntry, Category } from '../types';
import { INITIAL_DAILIES, INITIAL_GOALS, INITIAL_ROUTINE, INITIAL_SLEEP_DATA, CATEGORIES, LOCAL_STORAGE_KEY } from '../constants';

type Page = 'Dashboard' | 'Dailies' | 'Goals' | 'Study Plan' | 'Daily Routine' | 'Journal' | 'Sleep Tracker' | 'Share';
type Theme = 'light' | 'dark';

interface AppState {
  dailies: Task[];
  goals: Goal[];
  studyTasks: StudyTask[];
  routine: RoutineSlot[];
  journalEntries: JournalEntry[];
  sleepData: SleepData[];
  theme: Theme;
  activePage: Page;
}

interface AppContextType extends AppState {
  // Page Navigation
  setActivePage: (page: Page) => void;
  // Theme
  toggleTheme: () => void;
  // Dailies
  toggleDaily: (id: number) => void;
  addDaily: (text: string, category: Category) => void;
  deleteDaily: (id: number) => void;
  // Goals
  toggleGoal: (id: number) => void;
  addGoal: (text: string, priority: Priority, category: Category) => void;
  deleteGoal: (id: number) => void;
  // Study Plan
  toggleStudyTask: (id: number) => void;
  addStudyTask: (text: string, date: string, category: Category) => void;
  deleteStudyTask: (id: number) => void;
  // Routine
  toggleRoutineSlot: (id: number) => void;
  // Journal
  updateJournalForToday: (text: string) => void;
  // Sleep
  addSleepDataForToday: (hours: number) => void;
  // Derived state
  spiderData: SpiderDataPoint[];
  isVictory: boolean;
}

export const AppContext = createContext<AppContextType | null>(null);

const calculateProgress = (tasks: { completed: boolean }[]): number => {
  if (tasks.length === 0) return 0; // Return 0 if no tasks, not 100
  const completed = tasks.filter(task => task.completed).length;
  return Math.round((completed / tasks.length) * 100);
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, setState] = useState<AppState>({
    dailies: INITIAL_DAILIES,
    goals: INITIAL_GOALS,
    studyTasks: [],
    routine: INITIAL_ROUTINE,
    journalEntries: [],
    sleepData: INITIAL_SLEEP_DATA,
    theme: 'light',
    activePage: 'Dashboard',
  });

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // Simple check to ensure data structure is not from a very old version
        if(parsedData.dailies && parsedData.goals) {
          const theme = parsedData.theme === 'dark' ? 'dark' : 'light';
          setState(prevState => ({ ...prevState, ...parsedData, theme }));
        }

      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setState(prevState => ({ ...prevState, theme: prefersDark ? 'dark' : 'light' }));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        const dataToSave = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_KEY, dataToSave);
      } catch (error) {
        console.error("Failed to save data to localStorage", error);
      }
    }
  }, [state, isLoaded]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(state.theme);
  }, [state.theme]);


  const updateState = <K extends keyof AppState>(key: K, value: AppState[K]) => {
    setState(prevState => ({...prevState, [key]: value}));
  };

  type TaskListName = 'dailies' | 'goals' | 'studyTasks';

  const toggleGenericTask = <K extends TaskListName>(key: K, id: number) => {
    const items = state[key];
    const newItems = items.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
    updateState(key, newItems as any);
  };
  
  const addGenericTask = <K extends TaskListName>(key: K, newItem: Omit<AppState[K][number], 'id'>) => {
    const items = state[key];
    const newTask = { ...newItem, id: Date.now() } as AppState[K][number];
    updateState(key, [...items, newTask] as any);
  };
  
  const deleteGenericTask = <K extends TaskListName>(key: K, id: number) => {
      const items = state[key];
      updateState(key, items.filter(item => item.id !== id) as any);
  };

  const setActivePage = (page: Page) => updateState('activePage', page);
  const toggleTheme = () => updateState('theme', state.theme === 'light' ? 'dark' : 'light');
  
  const updateJournalForToday = useCallback((text: string) => {
    const today = new Date().toISOString().split('T')[0];
    setState(prevState => {
        const entries = [...prevState.journalEntries];
        const existingEntryIndex = entries.findIndex(j => j.date === today);

        if (existingEntryIndex > -1) {
            entries[existingEntryIndex] = { ...entries[existingEntryIndex], text };
        } else {
            entries.push({ date: today, text });
        }
        
        entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return { ...prevState, journalEntries: entries };
    });
  }, []);

  const addSleepDataForToday = useCallback((hours: number) => {
    const today = new Date().toISOString().split('T')[0];
    setState(prevState => {
        const data = [...prevState.sleepData];
        const existingEntryIndex = data.findIndex(d => d.date === today);

        if (existingEntryIndex > -1) {
            data[existingEntryIndex] = { ...data[existingEntryIndex], hours };
        } else {
            data.push({ date: today, hours });
        }

        data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return { ...prevState, sleepData: data };
    });
  }, []);


  const toggleDaily = (id: number) => toggleGenericTask('dailies', id);
  const addDaily = (text: string, category: Category) => addGenericTask('dailies', { text, completed: false, category });
  const deleteDaily = (id: number) => deleteGenericTask('dailies', id);

  const toggleGoal = (id: number) => toggleGenericTask('goals', id);
  const addGoal = (text: string, priority: Priority, category: Category) => addGenericTask('goals', { text, completed: false, priority, category } as any);
  const deleteGoal = (id: number) => deleteGenericTask('goals', id);

  const toggleStudyTask = (id: number) => toggleGenericTask('studyTasks', id);
  const addStudyTask = (text: string, date: string, category: Category) => addGenericTask('studyTasks', { text, completed: false, date, category } as any);
  const deleteStudyTask = (id: number) => deleteGenericTask('studyTasks', id);

  const toggleRoutineSlot = (id: number) => {
    const newRoutine = state.routine.map(slot => slot.id === id ? { ...slot, completed: !slot.completed } : slot);
    updateState('routine', newRoutine);
  };

  const spiderData = useMemo<SpiderDataPoint[]>(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    
    const todaysJournal = state.journalEntries.find(j => j.date === todayStr);
    const journalTask: Task = {
        id: -1, text: 'Journaling', completed: !!(todaysJournal && todaysJournal.text.trim().length > 50), category: Category.Mind
    };

    const todaysSleep = state.sleepData.find(d => d.date === todayStr);
    const sleepTask: Task = {
        id: -2, text: 'Adequate Sleep (7+ hrs)', completed: !!(todaysSleep && todaysSleep.hours >= 7), category: Category.GlowUp
    };
    
    // Consolidate all user-defined tasks to calculate progress against categories.
    const allCategorizedTasks: (Task | Goal | RoutineSlot | StudyTask)[] = [
      ...state.dailies,
      ...state.goals,
      ...state.routine,
      ...state.studyTasks, // Ensure calendar tasks are included for point allocation.
    ];

    const allTasks = [
      ...allCategorizedTasks,
      journalTask,
      sleepTask,
    ];

    const data = CATEGORIES.map((category): SpiderDataPoint => {
        const categoryTasks = allTasks.filter(task => task.category === category);
        return {
            subject: category,
            value: calculateProgress(categoryTasks),
            fullMark: 100,
        };
    });
    return data;
  }, [state.dailies, state.goals, state.studyTasks, state.routine, state.journalEntries, state.sleepData]);

  const isVictory = useMemo(() => spiderData.every(d => d.value === 100) && spiderData.length > 0, [spiderData]);

  const value: AppContextType = {
    ...state,
    setActivePage,
    toggleTheme,
    toggleDaily, addDaily, deleteDaily,
    toggleGoal, addGoal, deleteGoal,
    toggleStudyTask, addStudyTask, deleteStudyTask,
    toggleRoutineSlot,
    updateJournalForToday,
    addSleepDataForToday,
    spiderData,
    isVictory,
  };

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
