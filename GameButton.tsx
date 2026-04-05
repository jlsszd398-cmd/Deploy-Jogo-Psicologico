import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';

interface GameButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const GameButton: React.FC<GameButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  const { gameState } = useGame();
  const [isHovered, setIsHovered] = useState(false);
  const phase = gameState.phase;

  // Cores progressivas baseadas na fase
  const getButtonStyles = () => {
    let borderColor = '#ffffff';
    let hoverColor = '#ffffff';
    let backgroundColor = 'transparent';

    switch (phase) {
      case 1:
      case 2:
        borderColor = '#ffffff';
        hoverColor = '#ffffff';
        break;
      case 3:
        borderColor = '#00ff00';
        hoverColor = '#00ff00';
        break;
      case 4:
        borderColor = '#ff0000';
        hoverColor = '#ff0000';
        break;
      case 5:
        borderColor = '#ffff00';
        hoverColor = '#ff00ff';
        break;
    }

    return {
      borderColor: isHovered ? hoverColor : borderColor,
      color: isHovered ? hoverColor : borderColor,
      backgroundColor: isHovered ? `${hoverColor}20` : backgroundColor,
    };
  };

  const styles = getButtonStyles();

  // Adicionar efeitos de lag/delay conforme a fase avança
  const getDelay = () => {
    switch (phase) {
      case 1:
        return 0;
      case 2:
        return 100;
      case 3:
        return 200;
      case 4:
        return 300;
      case 5:
        return 500;
      default:
        return 0;
    }
  };

  const handleClick = () => {
    if (!disabled) {
      const delay = getDelay();
      if (delay > 0) {
        setTimeout(() => onClick(), delay);
      } else {
        onClick();
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: styles.borderColor,
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        transition: `all 0.3s ease, border-color 0.3s ease`,
      }}
      className={`
        px-6 py-3 border-2 font-mono font-bold text-lg
        hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
        ${phase >= 4 ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
