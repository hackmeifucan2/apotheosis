
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card, { CardHeader } from './Card';
import { BedDouble, Plus } from 'lucide-react';

const SleepTracker: React.FC = () => {
  const context = useContext(AppContext);
  const [hours, setHours] = useState('');

  if (!context) return null;

  const { sleepData, addSleepDataForToday, theme } = context;
  
  const lineColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const gridColor = theme === 'dark' ? '#444444' : '#DDDDDD';
  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const tooltipStyle = {
      backgroundColor: theme === 'dark' ? '#111' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      border: `1px solid ${theme === 'dark' ? '#fff' : '#000'}`,
      borderRadius: '6px',
  };

  const handleAddSleep = (e: React.FormEvent) => {
    e.preventDefault();
    const numHours = parseFloat(hours);
    if (!isNaN(numHours) && numHours > 0 && numHours <= 24) {
      addSleepDataForToday(numHours);
      setHours('');
    }
  };
  
  const formatDateTick = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', timeZone: 'UTC' });
  };
  
  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysSleep = sleepData.find(d => d.date === todayStr);

  return (
    <div className="animate-fadeInUp space-y-6">
        <Card className="flex flex-col h-full">
            <CardHeader icon={<BedDouble size={20}/>}>Sleep Schedule</CardHeader>
            <div className="flex-grow h-80 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sleepData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="date" tick={{ fill: textColor, fontSize: 12 }} tickFormatter={formatDateTick} />
                    <YAxis domain={[0, 10]} tick={{ fill: textColor, fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: textColor }}/>
                    <Line type="monotone" dataKey="hours" stroke={lineColor} strokeWidth={2} dot={{ r: 4, fill: lineColor }} activeDot={{ r: 6, stroke: lineColor }} />
                </LineChart>
                </ResponsiveContainer>
            </div>
            <form onSubmit={handleAddSleep} className="flex items-center space-x-2">
                <input
                type="number"
                value={hours}
                onChange={e => setHours(e.target.value)}
                placeholder={todaysSleep ? `Update today's hours (${todaysSleep.hours}h)` : "Today's hours"}
                min="0"
                max="24"
                step="0.5"
                className="w-full px-3 py-2 bg-transparent border border-black/50 dark:border-white/50 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white transition text-black dark:text-white"
                />
                <button type="submit" className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition">
                <Plus size={20}/>
                </button>
            </form>
        </Card>
        
        {sleepData.length > 0 && (
            <Card>
                <CardHeader>Sleep Log</CardHeader>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {sleepData.slice().reverse().map(entry => (
                        <div key={entry.date} className="flex justify-between items-center text-sm border-b border-black/10 dark:border-white/10 pb-2 last:border-b-0">
                            <span className="text-neutral-800 dark:text-neutral-200">{formatDateForDisplay(entry.date)}</span>
                            <span className="font-bold text-black dark:text-white">{entry.hours.toFixed(1)} hours</span>
                        </div>
                    ))}
                </div>
            </Card>
        )}
    </div>
  );
};

export default SleepTracker;