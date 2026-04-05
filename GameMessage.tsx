import React, { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';

interface GameMessageProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

export const GameMessage: React.FC<GameMessageProps> = ({
  text,
  delay = 0,
  onComplete,
}) => {
  const { gameState } = useGame();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const phase = gameState.phase;

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        typeText();
      }, delay);
      return () => clearTimeout(timer);
    } else {
      typeText();
    }
  }, [text, delay]);

  const typeText = () => {
    let currentIndex = 0;
    const speed = phase === 1 ? 50 : phase === 2 ? 75 : phase >= 3 ? 100 : 50;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    }, speed);

    return () => clearInterval(interval);
  };

  // Efeito de glitch nas fases avançadas
  const shouldGlitch = phase >= 4;

  // Cor do texto baseada na fase
  const getTextColor = () => {
    switch (phase) {
      case 1:
      case 2:
        return 'text-white';
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
        game-message font-mono text-xl md:text-2xl leading-relaxed
        ${getTextColor()}
        ${shouldGlitch ? 'glitch' : ''}
        transition-colors duration-500
      `}
    >
      {displayedText}
      {!isComplete && <span className="cursor-blink">_</span>}
    </div>
  );
};
