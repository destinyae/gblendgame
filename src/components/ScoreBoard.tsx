import React from 'react';

interface ScoreBoardProps {
  score: number;
  isGameOver: boolean;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, isGameOver }) => {
  return (
    <div className={`text-center ${isGameOver ? 'text-5xl' : 'text-3xl'} font-bold mb-4 transition-all duration-300`}>
      <span className="text-blue-600">Score: </span>
      <span className="text-pink-500">{score}</span>
    </div>
  );
};

export default ScoreBoard;