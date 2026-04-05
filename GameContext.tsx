import React, { createContext, useContext, useState, useEffect } from 'react';

export type GamePhase = 1 | 2 | 3 | 4 | 5;

export interface PlayerProfile {
  coragem: number;
  medo: number;
  curiosidade: number;
  indecisao: number;
  consistencia: number;
}

export interface GameState {
  phase: GamePhase;
  playerName: string;
  profile: PlayerProfile;
  responseTime: number[];
  choices: string[];
  currentMessage: string;
  isTransitioning: boolean;
}

interface GameContextType {
  gameState: GameState;
  updatePhase: (phase: GamePhase) => void;
  updatePlayerName: (name: string) => void;
  updateProfile: (updates: Partial<PlayerProfile>) => void;
  recordChoice: (choice: string, responseTime: number) => void;
  setCurrentMessage: (message: string) => void;
  setIsTransitioning: (value: boolean) => void;
  resetGame: () => void;
  loadGameState: () => void;
  saveGameState: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialGameState: GameState = {
  phase: 1,
  playerName: '',
  profile: {
    coragem: 0,
    medo: 0,
    curiosidade: 0,
    indecisao: 0,
    consistencia: 0,
  },
  responseTime: [],
  choices: [],
  currentMessage: '',
  isTransitioning: false,
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Load game state from localStorage on mount
  useEffect(() => {
    loadGameState();
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState();
  }, [gameState]);

  const loadGameState = () => {
    try {
      const saved = localStorage.getItem('psychedelic_game_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        setGameState(parsed);
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  };

  const saveGameState = () => {
    try {
      localStorage.setItem('psychedelic_game_state', JSON.stringify(gameState));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  const updatePhase = (phase: GamePhase) => {
    setGameState(prev => ({ ...prev, phase }));
  };

  const updatePlayerName = (name: string) => {
    setGameState(prev => ({ ...prev, playerName: name }));
  };

  const updateProfile = (updates: Partial<PlayerProfile>) => {
    setGameState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }));
  };

  const recordChoice = (choice: string, responseTime: number) => {
    setGameState(prev => ({
      ...prev,
      choices: [...prev.choices, choice],
      responseTime: [...prev.responseTime, responseTime],
    }));
  };

  const setCurrentMessage = (message: string) => {
    setGameState(prev => ({ ...prev, currentMessage: message }));
  };

  const setIsTransitioning = (value: boolean) => {
    setGameState(prev => ({ ...prev, isTransitioning: value }));
  };

  const resetGame = () => {
    setGameState(initialGameState);
    localStorage.removeItem('psychedelic_game_state');
  };

  const value: GameContextType = {
    gameState,
    updatePhase,
    updatePlayerName,
    updateProfile,
    recordChoice,
    setCurrentMessage,
    setIsTransitioning,
    resetGame,
    loadGameState,
    saveGameState,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
