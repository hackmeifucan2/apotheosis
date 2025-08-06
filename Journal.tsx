
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Card, { CardHeader } from './Card';
import { Book } from 'lucide-react';

const Journal: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { journalEntries, updateJournalForToday } = context;

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysJournal = journalEntries.find(entry => entry.date === todayStr) || { text: '' };
  
  const pastEntries = journalEntries.filter(entry => entry.date !== todayStr);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  };

  return (
    <div className="animate-fadeInUp space-y-6">
      <Card>
        <CardHeader icon={<Book size={20}/>}>Today's Journal ({formatDate(todayStr)})</CardHeader>
        <textarea
          value={todaysJournal.text}
          onChange={e => updateJournalForToday(e.target.value)}
          placeholder="Reflect on your day, your struggles, your victories..."
          className="w-full h-64 p-3 bg-transparent text-black dark:text-white border border-black/50 dark:border-white/50 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white transition"
        ></textarea>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
          A thoughtful entry of over 50 characters contributes to your progress.
        </p>
      </Card>
      
      {pastEntries.length > 0 && (
          <Card>
            <CardHeader>Journal Archive</CardHeader>
            <div className="space-y-4">
                {pastEntries.map(entry => (
                    <div key={entry.date} className="border-b border-black/10 dark:border-white/10 pb-2 last:border-b-0">
                        <p className="font-semibold text-sm">{formatDate(entry.date)}</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap mt-1">{entry.text}</p>
                    </div>
                ))}
            </div>
          </Card>
      )}
    </div>
  );
};

export default Journal;