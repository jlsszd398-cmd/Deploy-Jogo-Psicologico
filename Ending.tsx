import React, { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useGamePhases } from '@/hooks/useGamePhases';
import { GameMessage } from '@/components/GameMessage';
import { GameButton } from '@/components/GameButton';
import { DynamicTitle } from '@/components/DynamicTitle';
import { PsychedelicEffects } from '@/components/PsychedelicEffects';
import { DistortionLayer } from '@/components/DistortionLayer';

interface EndingNarrative {
  title: string;
  emoji: string;
  messages: string[];
  reflection: string;
  color: string;
}

export default function Ending() {
  const { gameState, resetGame } = useGame();
  const { getEnding } = useGamePhases();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showReflection, setShowReflection] = useState(false);

  const ending = getEnding();

  // Narrativas detalhadas por tipo de final
  const narratives: Record<string, EndingNarrative> = {
    neutral: {
      title: 'NEUTRO',
      emoji: '😐',
      messages: [
        'Você seguiu o caminho.',
        'Como sempre faz.',
        'Sem questionamentos profundos.',
        'Sem grandes revelações.',
        'Apenas... o caminho.',
      ],
      reflection: 'Às vezes, a vida é apenas o que acontece enquanto fazemos planos.',
      color: 'text-gray-400',
    },
    anxious: {
      title: 'ANSIOSO',
      emoji: '😰',
      messages: [
        'Você hesitou.',
        'Muitas vezes.',
        'A incerteza consumiu você.',
        'Cada escolha era um peso.',
        'Você nunca teve certeza.',
      ],
      reflection: 'A indecisão é uma escolha. E escolhas têm consequências.',
      color: 'text-yellow-400',
    },
    dark: {
      title: 'SOMBRIO',
      emoji: '😈',
      messages: [
        'Você escolheu o caminho escuro.',
        'Sem hesitação.',
        'Sem remorso.',
        'Você sabia o que queria.',
        'E o conseguiu.',
      ],
      reflection: 'O escuro não é mau. É apenas... diferente.',
      color: 'text-red-500',
    },
    conscious: {
      title: 'CONSCIENTE',
      emoji: '🧠',
      messages: [
        'Você entendeu o jogo.',
        'Você viu através das camadas.',
        'Você compreendeu a estrutura.',
        'Você é o jogo.',
        'E o jogo é você.',
      ],
      reflection: 'A consciência é o primeiro passo para a liberdade.',
      color: 'text-green-400',
    },
  };

  const narrative = narratives[ending.type] || narratives.neutral;

  const handleMessageComplete = () => {
    if (currentMessageIndex < narrative.messages.length - 1) {
      setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 1500);
    } else {
      setShowReflection(true);
    }
  };

  const handleRestart = () => {
    resetGame();
    window.location.href = '/';
  };

  return (
    <>
      <PsychedelicEffects />
      <DistortionLayer />
      <DynamicTitle />
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Título do Final */}
          <div className="mb-12">
            <div className="text-6xl mb-4">{narrative.emoji}</div>
            <h1 className={`text-5xl md:text-6xl font-bold font-mono ${narrative.color}`}>
              {narrative.title}
            </h1>
          </div>

          {/* Narrativa */}
          <div className="min-h-32 flex items-center justify-center">
            <GameMessage
              text={narrative.messages[currentMessageIndex]}
              delay={0}
              onComplete={handleMessageComplete}
            />
          </div>

          {/* Reflexão */}
          {showReflection && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-t-2 border-gray-600 pt-8">
                <p className="text-lg font-mono text-gray-300 italic leading-relaxed">
                  "{narrative.reflection}"
                </p>
              </div>

              {/* Estatísticas */}
              <div className="bg-gray-900 bg-opacity-50 p-6 font-mono text-sm text-gray-400 space-y-2">
                <p>Total de escolhas: <span className="text-white">{gameState.choices.length}</span></p>
                <p>Tempo médio de resposta: <span className="text-white">{Math.round(gameState.responseTime.reduce((a, b) => a + b, 0) / gameState.responseTime.length)}ms</span></p>
                <p>Coragem: <span className="text-white">{gameState.profile.coragem}</span></p>
                <p>Medo: <span className="text-white">{gameState.profile.medo}</span></p>
                <p>Curiosidade: <span className="text-white">{gameState.profile.curiosidade}</span></p>
                <p>Indecisão: <span className="text-white">{gameState.profile.indecisao}</span></p>
              </div>

              {/* Botão de reinício */}
              <GameButton onClick={handleRestart}>
                Jogar Novamente
              </GameButton>
            </div>
          )}
        </div>

        {/* Créditos */}
        <div className="absolute bottom-4 text-xs font-mono text-gray-700">
          <p>Jogo Psicodélico v1.0 | Brutalism Digital</p>
        </div>
      </div>
    </>
  );
}
