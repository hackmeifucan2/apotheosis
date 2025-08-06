import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import Dailies from './components/Dailies';
import Goals from './components/Goals';
import StudyPlan from './components/StudyPlan';
import DailyRoutine from './components/DailyRoutine';
import Journal from './components/Journal';
import SleepTracker from './components/SleepTracker';
import VictoryScreen from './components/VictoryScreen';
import Countdown from './components/Countdown';
import { Trophy } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import SharePage from './components/SharePage';

const App: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <div>Loading...</div>;
  }
  
  const { isVictory, activePage } = context;

  if (isVictory) {
    return <VictoryScreen />;
  }

  const renderActivePage = () => {
    switch(activePage) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Dailies':
        return <Dailies />;
      case 'Goals':
        return <Goals />;
      case 'Study Plan':
        return <StudyPlan />;
      case 'Daily Routine':
        return <DailyRoutine />;
      case 'Journal':
        return <Journal />;
      case 'Sleep Tracker':
        return <SleepTracker />;
      case 'Share':
        return <SharePage />;
      default:
        return <DashboardPage />;
    }
  }

  return (
    <div className="flex min-h-screen font-sans bg-white text-black dark:bg-black dark:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 border-b border-black/10 dark:border-white/10">
           <div className="flex items-center space-x-3">
             <Trophy className="w-8 h-8 text-black dark:text-white"/>
            <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
              Project: Apotheosis
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Countdown />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
};

export default App;