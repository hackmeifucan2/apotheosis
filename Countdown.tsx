import React, { useState, useEffect } from 'react';
import { TARGET_DATE, GLORY_DATE, START_DATE } from '../constants';
import { Calendar, Flag, Star } from 'lucide-react';

const Countdown: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const today = new Date();
  
  const totalDuration = TARGET_DATE.getTime() - START_DATE.getTime();
  const elapsedDuration = today.getTime() - START_DATE.getTime();
  
  const dayNumber = Math.floor(elapsedDuration / (1000 * 60 * 60 * 24)) + 1;
  const daysUntilTarget = Math.ceil((TARGET_DATE.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-3 rounded-xl border border-black/20 dark:border-white/20 text-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-black dark:text-white">
          <Calendar size={18} />
          <span className="font-bold">Day {dayNumber > 0 ? dayNumber : 1}</span>
        </div>
        <div className="w-px h-5 bg-black/20 dark:bg-white/20"></div>
        <div className="flex items-center space-x-2 text-black dark:text-white">
          <Flag size={18} />
          <span>{daysUntilTarget > 0 ? `${daysUntilTarget} days left` : 'Final Day!'}</span>
        </div>
        <div className="w-px h-5 bg-black/20 dark:bg-white/20"></div>
         <div className="flex items-center space-x-2 text-black dark:text-white">
          <Star size={18} />
          <span>Glory: {GLORY_DATE.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
