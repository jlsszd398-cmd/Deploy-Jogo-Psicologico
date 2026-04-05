import React, { useEffect, useState } from 'react';
import { useGame } from '@/contexts/GameContext';

export const DistortionLayer: React.FC = () => {
  const { gameState } = useGame();
  const [distortionIntensity, setDistortionIntensity] = useState(0);
  const phase = gameState.phase;

  useEffect(() => {
    // Aumentar intensidade de distorção conforme a fase avança
    const intensity = (phase - 1) * 0.25;
    setDistortionIntensity(intensity);
  }, [phase]);

  return (
    <style>{`
      @keyframes distort {
        0% {
          filter: blur(${distortionIntensity}px) brightness(${1 - distortionIntensity * 0.1});
        }
        25% {
          filter: blur(${distortionIntensity * 1.5}px) brightness(${1 - distortionIntensity * 0.2});
        }
        50% {
          filter: blur(${distortionIntensity}px) brightness(${1 - distortionIntensity * 0.1});
        }
        75% {
          filter: blur(${distortionIntensity * 1.2}px) brightness(${1 - distortionIntensity * 0.15});
        }
        100% {
          filter: blur(${distortionIntensity}px) brightness(${1 - distortionIntensity * 0.1});
        }
      }

      @keyframes colorShift {
        0% {
          filter: hue-rotate(0deg);
        }
        50% {
          filter: hue-rotate(${phase >= 4 ? 180 : 0}deg);
        }
        100% {
          filter: hue-rotate(0deg);
        }
      }

      @keyframes wavyText {
        0%, 100% {
          transform: translateY(0px);
        }
        25% {
          transform: translateY(-${distortionIntensity * 2}px);
        }
        50% {
          transform: translateY(${distortionIntensity * 2}px);
        }
        75% {
          transform: translateY(-${distortionIntensity}px);
        }
      }

      ${phase >= 4 ? `
        .game-container {
          animation: distort 3s ease-in-out infinite;
        }
      ` : ''}

      ${phase >= 5 ? `
        .game-container {
          animation: distort 2s ease-in-out infinite, colorShift 4s ease-in-out infinite;
        }
      ` : ''}

      ${phase >= 3 ? `
        .game-message {
          animation: wavyText ${1 + phase * 0.2}s ease-in-out infinite;
        }
      ` : ''}
    `}</style>
  );
};
