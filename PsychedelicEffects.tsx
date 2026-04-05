import React, { useEffect, useState } from 'react';
import { useGame } from '@/contexts/GameContext';

export const PsychedelicEffects: React.FC = () => {
  const { gameState } = useGame();
  const [glitchActive, setGlitchActive] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [chromatic, setChromatic] = useState(false);
  const phase = gameState.phase;

  // Ativar efeitos progressivamente
  useEffect(() => {
    if (phase >= 3) {
      // Glitch aleatório
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 200);
        }
      }, 2000);
      return () => clearInterval(glitchInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase >= 4) {
      // Screen shake
      const shakeInterval = setInterval(() => {
        if (Math.random() > 0.6) {
          setScreenShake(true);
          setTimeout(() => setScreenShake(false), 300);
        }
      }, 3000);
      return () => clearInterval(shakeInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase >= 5) {
      // Chromatic aberration
      setChromatic(true);
    } else {
      setChromatic(false);
    }
  }, [phase]);

  // Cores dinâmicas baseadas na fase
  const getPhaseColor = () => {
    switch (phase) {
      case 1:
      case 2:
        return 'rgba(255, 255, 255, 0)';
      case 3:
        return 'rgba(0, 255, 0, 0.1)';
      case 4:
        return 'rgba(255, 0, 0, 0.15)';
      case 5:
        return 'rgba(255, 255, 0, 0.2)';
      default:
        return 'rgba(255, 255, 255, 0)';
    }
  };

  return (
    <>
      {/* Overlay de cor dinâmica */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: getPhaseColor(),
          pointerEvents: 'none',
          zIndex: 1000,
          transition: 'background-color 1s ease',
        }}
      />

      {/* Glitch effect */}
      {glitchActive && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 999,
            background: `
              linear-gradient(
                0deg,
                transparent calc(${Math.random() * 100}% - 10px),
                rgba(255, 0, 0, 0.3) calc(${Math.random() * 100}% - 5px),
                transparent calc(${Math.random() * 100}% + 5px)
              )
            `,
            animation: 'glitch 0.2s infinite',
          }}
        />
      )}

      {/* Screen shake */}
      {screenShake && (
        <style>{`
          body {
            animation: shake 0.3s !important;
          }
        `}</style>
      )}

      {/* Chromatic aberration */}
      {chromatic && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 998,
            background: `
              linear-gradient(
                90deg,
                rgba(255, 0, 0, 0.1) 0%,
                transparent 50%,
                rgba(0, 255, 255, 0.1) 100%
              )
            `,
          }}
        />
      )}

      {/* Scan lines intensificadas */}
      <style>{`
        @keyframes scanIntensity {
          0% {
            opacity: ${phase >= 3 ? 0.1 : 0};
          }
          100% {
            opacity: ${Math.min(phase * 0.1, 0.3)};
          }
        }
        
        body::before {
          animation: scanIntensity 0.5s ease-out;
        }
      `}</style>
    </>
  );
};
