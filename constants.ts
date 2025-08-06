import { Priority, type Goal, type Task, type RoutineSlot, type SleepData, Category } from './types';

export const TARGET_DATE = new Date('2025-05-30T23:59:59');
export const GLORY_DATE = new Date('2025-02-01T00:00:00');
export const START_DATE = new Date('2024-05-01T00:00:00');

export const LOCAL_STORAGE_KEY = 'apotheosis_data_v3';

export const CATEGORIES = [Category.Fitness, Category.GlowUp, Category.Study, Category.Mind, Category.Football];

export const INITIAL_DAILIES: Task[] = [
    { id: 1, text: 'Review daily goals', completed: false, category: Category.Mind },
    { id: 2, text: '30 minutes of physical activity', completed: false, category: Category.Fitness },
    { id: 3, text: 'Read 10 pages of a book', completed: false, category: Category.Mind },
    { id: 4, text: 'Plan tomorrow\'s tasks', completed: false, category: Category.Study },
];

export const INITIAL_GOALS: Goal[] = [
    { id: 1, text: 'Complete a major project milestone', completed: false, priority: Priority.High, category: Category.Study },
    { id: 2, text: 'Learn a new programming concept', completed: false, priority: Priority.Medium, category: Category.Study },
    { id: 3, text: 'Organize digital files', completed: false, priority: Priority.Low, category: Category.Mind },
];

export const INITIAL_ROUTINE: RoutineSlot[] = [
    // Morning
    { id: 1, time: '06:00', task: 'Wake up, hydrate', completed: false, period: 'Morning', category: Category.GlowUp },
    { id: 2, time: '06:30', task: 'Meditation/Stretching', completed: false, period: 'Morning', category: Category.Mind },
    { id: 3, time: '07:00', task: 'Breakfast', completed: false, period: 'Morning', category: Category.GlowUp },
    { id: 4, time: '07:30', task: 'Deep Work Block 1', completed: false, period: 'Morning', category: Category.Study },
    { id: 5, time: '08:00', task: 'Deep Work Block 1', completed: false, period: 'Morning', category: Category.Study },
    { id: 6, time: '08:30', task: 'Deep Work Block 1', completed: false, period: 'Morning', category: Category.Study },
    // Afternoon
    { id: 7, time: '12:00', task: 'Lunch Break', completed: false, period: 'Afternoon', category: Category.GlowUp },
    { id: 8, time: '13:00', task: 'Study Session 1', completed: false, period: 'Afternoon', category: Category.Study },
    { id: 9, time: '13:30', task: 'Study Session 1', completed: false, period: 'Afternoon', category: Category.Study },
    { id: 10, time: '15:00', task: 'Short Break/Walk', completed: false, period: 'Afternoon', category: Category.Fitness },
    { id: 11, time: '15:30', task: 'Football Practice', completed: false, period: 'Afternoon', category: Category.Football },
    // Night
    { id: 12, time: '19:00', task: 'Dinner', completed: false, period: 'Night', category: Category.GlowUp },
    { id: 13, time: '20:00', task: 'Relax/Hobby', completed: false, period: 'Night', category: Category.Mind },
    { id: 14, time: '21:00', task: 'Review Day & Plan', completed: false, period: 'Night', category: Category.Study },
    { id: 15, time: '21:30', task: 'Reading', completed: false, period: 'Night', category: Category.Mind },
    { id: 16, time: '22:00', task: 'Skincare Routine', completed: false, period: 'Night', category: Category.GlowUp },
];

export const INITIAL_SLEEP_DATA: SleepData[] = [];