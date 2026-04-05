import React, { useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';

export const DynamicTitle: React.FC = () => {
  const { gameState } = useGame();
  const phase = gameState.phase;

  useEffect(() => {
    const titles: Record<number, string[]> = {
      1: ['Jogo Psicodélico', 'Bem-vindo'],
      2: ['Você tem certeza?', 'Jogo Psicodélico'],
      3: ['Você está sendo observado', 'Jogo Psicodélico'],
      4: ['Qual é a verdade?', 'Jogo Psicodélico'],
      5: ['Você sempre escolhe isso', 'Jogo Psicodélico'],
    };

    const titleList = titles[phase] || titles[1];
    let currentIndex = 0;

    const interval = setInterval(() => {
      document.title = titleList[currentIndex];
      currentIndex = (currentIndex + 1) % titleList.length;
    }, 2000);

    return () => clearInterval(interval);
  }, [phase]);

  return null;
};
