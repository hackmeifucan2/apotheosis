import React from 'react';
import SpiderChart from './SpiderChart';
import Journal from './Journal';

const DashboardPage: React.FC = () => {
  return (
    <div className="animate-fadeInUp grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
             <SpiderChart />
        </div>
        <div className="xl:col-span-1">
             <Journal />
        </div>
    </div>
  );
};

export default DashboardPage;
