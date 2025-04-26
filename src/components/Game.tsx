import React, { useState } from 'react';
import Snowfall from 'react-snowfall';
import Button from './Button';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';
import GameOver from './GameOver';
import { useGameState, GameState } from '../hooks/useGameState';
import { Play, Twitter, Disc } from 'lucide-react';

const Game: React.FC = () => {
  const GAME_DURATION = 10; // 10 seconds
  const {
    gameState,
    score,
    timeRemaining,
    buttonColors,
    startGame,
    incrementScore,
  } = useGameState(GAME_DURATION);
  
  // Button animation state
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    if (gameState === GameState.PLAYING) {
      incrementScore();
      setActiveButton(index);
      setTimeout(() => setActiveButton(null), 100);
    }
  };

  // Render grid of buttons
  const renderButtons = () => {
    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full max-w-md aspect-[3/2]">
        {buttonColors.map((color, index) => (
          <div
            key={index}
            className={`aspect-square transition-transform duration-100 ${
              activeButton === index ? 'scale-95' : ''
            }`}
          >
            <Button
              color={color}
              onClick={() => handleButtonClick(index)}
              disabled={gameState !== GameState.PLAYING}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderSocialLinks = () => (
    <div className="absolute top-4 right-4 flex gap-4">
      <a
        href="https://x.com/fluentxyz"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-pink-500 transition-colors"
        aria-label="Twitter"
      >
        <Twitter size={24} />
      </a>
      <a
        href="https://discord.com/invite/fluentxyz"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-400 transition-colors"
        aria-label="Discord"
      >
        <Disc size={24} />
      </a>
    </div>
  );

  const renderGameContent = () => {
    switch (gameState) {
      case GameState.INIT:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-4 text-center leading-relaxed">gBlend w/FLUENT</h1>
            <p className="text-white text-lg mb-6 text-center leading-relaxed">
              Tap the buttons as many times as possible in {GAME_DURATION} seconds!
            </p>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={startGame}
                className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <Play size={24} />
                <span>gBlend</span>
              </button>
              <span className="text-gray-400 text-xs mt-1">built by boyD</span>
            </div>
          </div>
        );
      
      case GameState.PLAYING:
        return (
          <>
            <Timer timeRemaining={timeRemaining} totalTime={GAME_DURATION} />
            <ScoreBoard score={score} isGameOver={false} />
            {renderButtons()}
            <p className="text-blue-400 text-sm mt-4 text-center animate-pulse">
              Score 60+ to mint a gBlend NFT!
            </p>
          </>
        );
      
      case GameState.GAME_OVER:
        return <GameOver score={score} onRestart={startGame} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-blue-900 min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {renderSocialLinks()}
      <Snowfall snowflakeCount={200} />
      <div className="blend-text">BLEND</div>
      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        {renderGameContent()}
      </div>
    </div>
  );
};

export default Game;