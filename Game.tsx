import React, { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useGamePhases } from '@/hooks/useGamePhases';
import { GameMessage } from '@/components/GameMessage';
import { GameButton } from '@/components/GameButton';
import { PsychedelicEffects } from '@/components/PsychedelicEffects';
import { DistortionLayer } from '@/components/DistortionLayer';
import { DynamicTitle } from '@/components/DynamicTitle';
import { AudioEffects } from '@/components/AudioEffects';
import { useLocation } from 'wouter';

export default function Game() {
  const { gameState, updatePhase, setIsTransitioning } = useGame();
  const { getPhaseMessages, getPhaseChoices, processChoice } = useGamePhases();
  const [, navigate] = useLocation();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [responseStartTime, setResponseStartTime] = useState<number>(0);
  const [showChoices, setShowChoices] = useState(false);

  const phase = gameState.phase;
  const messages = getPhaseMessages(phase);
  const choices = getPhaseChoices(phase);
  const currentMessage = messages[currentMessageIndex] || messages[0];

  // Determinar se o jogo deve terminar
  useEffect(() => {
    if (gameState.choices.length >= 5) {
      // Navegar para página de finais
      setTimeout(() => {
        navigate('/ending');
      }, 1000);
    }
  }, [gameState.choices.length, navigate]);

  // Efeito de scan lines
  useEffect(() => {
    const body = document.body;
    if (phase >= 3) {
      body.classList.add('scan-lines');
    } else {
      body.classList.remove('scan-lines');
    }
  }, [phase]);

  // Efeito de shake nas fases finais
  useEffect(() => {
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
      if (phase >= 4) {
        gameContainer.classList.add('shake');
      } else {
        gameContainer.classList.remove('shake');
      }
    }
  }, [phase]);

  const handleMessageComplete = () => {
    if (currentMessageIndex < messages.length - 1) {
      setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 1000);
    } else {
      setShowChoices(true);
      setResponseStartTime(Date.now());
    }
  };

  const handleChoice = (choice: string) => {
    const responseTime = Date.now() - responseStartTime;
    setIsTransitioning(true);
    setShowChoices(false);

    // Processar a escolha
    processChoice(choice, responseTime);

    // Avançar para próxima fase
    setTimeout(() => {
      if (phase < 5) {
        updatePhase((phase + 1) as any);
      }
      setCurrentMessageIndex(0);
      setIsTransitioning(false);
    }, 1000);
  };



  return (
    <>
      <PsychedelicEffects />
      <DistortionLayer />
      <DynamicTitle />
      <AudioEffects />
      <div className="game-container min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {/* Indicador de fase */}
      <div className="absolute top-4 left-4 font-mono text-sm text-gray-500">
        FASE {phase}/5
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Mensagem */}
        <div className="min-h-24 flex items-center justify-center">
          <GameMessage
            text={currentMessage}
            delay={currentMessageIndex === 0 ? 500 : 0}
            onComplete={handleMessageComplete}
          />
        </div>

        {/* Escolhas */}
        {showChoices && !gameState.isTransitioning && (
          <div className="space-y-4 animate-fade-in">
            {choices.map((choice, index) => (
              <GameButton
                key={index}
                onClick={() => handleChoice(choice)}
              >
                {choice}
              </GameButton>
            ))}
          </div>
        )}

        {/* Indicador de carregamento */}
        {gameState.isTransitioning && (
          <div className="text-gray-500 font-mono animate-pulse">
            ...
          </div>
        )}
      </div>

      {/* Debug info (remover em produção) */}

    </div>
    </>
  );
}
