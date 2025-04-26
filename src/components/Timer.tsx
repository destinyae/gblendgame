import React from 'react';

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, totalTime }) => {
  const percentage = Math.max(0, (timeRemaining / totalTime) * 100);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
      <div 
        className="bg-pink-500 h-6 rounded-full transition-all duration-200 ease-linear flex items-center justify-center text-white text-sm font-medium"
        style={{ width: `${percentage}%` }}
      >
        {timeRemaining.toFixed(1)}s
      </div>
    </div>
  );
};

export default Timer;