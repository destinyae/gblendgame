import { useState, useEffect, useCallback } from 'react';

// Define game states
export enum GameState {
  INIT = 'init',
  PLAYING = 'playing',
  GAME_OVER = 'gameOver'
}

// Define button colors
const BUTTON_COLORS = [
  '#FF1493', // Deep Pink
  '#FF69B4', // Hot Pink
  '#C71585', // Medium Violet Red
  '#1E90FF', // Dodger Blue
  '#00BFFF', // Deep Sky Blue
  '#4169E1', // Royal Blue
];

export const useGameState = (gameDuration = 10) => {
  const [gameState, setGameState] = useState<GameState>(GameState.INIT);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  const [buttonColors] = useState(BUTTON_COLORS);

  const startGame = useCallback(() => {
    setGameState(GameState.PLAYING);
    setScore(0);
    setTimeRemaining(gameDuration);
  }, [gameDuration]);

  const endGame = useCallback(() => {
    setGameState(GameState.GAME_OVER);
  }, []);

  const incrementScore = useCallback(() => {
    if (gameState === GameState.PLAYING) {
      setScore(prevScore => prevScore + 1);
    }
  }, [gameState]);

  // Timer logic
  useEffect(() => {
    let timerId: number | undefined;
    
    if (gameState === GameState.PLAYING && timeRemaining > 0) {
      timerId = window.setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 0.1;
          if (newTime <= 0) {
            clearInterval(timerId);
            endGame();
            return 0;
          }
          return Number(newTime.toFixed(1));
        });
      }, 100);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [gameState, timeRemaining, endGame]);

  return {
    gameState,
    score,
    timeRemaining,
    buttonColors,
    startGame,
    endGame,
    incrementScore,
  };
};