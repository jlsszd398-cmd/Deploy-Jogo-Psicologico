import React, { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';

interface ObservationMessageProps {
  message: string;
  visible: boolean;
}

export const ObservationMessage: React.FC<ObservationMessageProps> = ({ message, visible }) => {
  const { gameState } = useGame();
  const phase = gameState.phase;

  if (!visible || !message) return null;

  // Cor baseada na fase
  const getColor = () => {
    switch (phase) {
      case 3:
        return 'text-green-400';
      case 4:
        return 'text-red-500';
      case 5:
        return 'text-yellow-300';
      default:
        return 'text-white';
    }
  };

  return (
    <div
      className={`
        fixed top-1/4 right-4 max-w-xs p-4 border-2 border-dashed
        font-mono text-sm ${getColor()} animate-pulse
        ${phase >= 4 ? 'border-red-500' : 'border-white'}
        bg-black bg-opacity-80
      `}
      style={{
        animation: `fadeIn 0.5s ease-in-out, fadeOut 0.5s ease-in-out ${phase >= 4 ? 3 : 5}s`,
      }}
    >
      {message}
    </div>
  );
};
