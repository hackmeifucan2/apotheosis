
import React from 'react';
import { CheckCircle } from 'lucide-react';

const VictoryScreen: React.FC = () => {
  return (
    <div className="dark">
      <div className="flex items-center justify-center min-h-screen bg-black text-white p-8 animate-fadeIn">
        <div className="text-center max-w-2xl">
          <div className="flex justify-center mb-8">
            <CheckCircle className="w-20 h-20 text-white" style={{ animation: `fadeInUp 1s ease-out 0.5s backwards` }} />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-white" style={{ animation: `fadeInUp 1s ease-out 1s backwards` }}>One day has arrived.</h1>
          <div className="space-y-4 text-lg text-neutral-300 leading-relaxed">
            <p style={{ animation: `fadeInUp 1s ease-out 1.5s backwards` }}>
              AP is yours. The one who cried, stood. The one who hoped, won.
            </p>
            <p className="font-bold text-xl text-white" style={{ animation: `fadeInUp 1s ease-out 2s backwards` }}>
              You have done it.
            </p>
            <p style={{ animation: `fadeInUp 1s ease-out 2.5s backwards` }}>
              Go to that bridge and laugh. I am satisfied.
            </p>
            <p className="mt-8 text-2xl font-serif italic text-neutral-200" style={{ animation: `fadeInUp 1s ease-out 3s backwards` }}>
              ...I have defeated him...
            </p>
            <p className="font-serif italic text-neutral-200" style={{ animation: `fadeInUp 1s ease-out 3.5s backwards` }}>
              ...I stood, and everything went good...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen;