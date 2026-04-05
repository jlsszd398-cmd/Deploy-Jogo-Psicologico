import { useGame } from '@/contexts/GameContext';
import { useEffect } from 'react';

export const usePsychologicalBehavior = () => {
  const { gameState, updateProfile } = useGame();

  // Analisar padrões de comportamento
  const analyzePatterns = () => {
    const choices = gameState.choices;
    const responseTimes = gameState.responseTime;
    const profile = gameState.profile;

    // Detectar padrão de repetição
    if (choices.length >= 3) {
      const lastThree = choices.slice(-3);
      const allSame = lastThree.every(c => c === lastThree[0]);
      if (allSame) {
        updateProfile({ consistencia: (profile.consistencia || 0) + 1 });
      }
    }

    // Detectar aceleração nas respostas (ansiedade)
    if (responseTimes.length >= 2) {
      const lastTwo = responseTimes.slice(-2);
      if (lastTwo[1] < lastTwo[0] * 0.7) {
        updateProfile({ medo: (profile.medo || 0) + 0.5 });
      }
    }

    // Detectar desaceleração (indecisão)
    if (responseTimes.length >= 2) {
      const lastTwo = responseTimes.slice(-2);
      if (lastTwo[1] > lastTwo[0] * 1.5) {
        updateProfile({ indecisao: (profile.indecisao || 0) + 0.5 });
      }
    }
  };

  // Gerar mensagens contextuais baseadas no comportamento
  const getContextualMessage = (phase: number): string => {
    const profile = gameState.profile;
    const choices = gameState.choices;

    // Fase 3: Começar a observar padrões
    if (phase === 3) {
      if (profile.coragem > profile.medo) {
        return 'Você é corajoso. Ou impulsivo?';
      } else if (profile.medo > profile.coragem) {
        return 'Você tem medo. Do que, exatamente?';
      }
    }

    // Fase 4: Questionar profundamente
    if (phase === 4) {
      if (profile.indecisao > 1) {
        return 'Você nunca consegue decidir, não é?';
      } else if (profile.consistencia > 1) {
        return 'Você é previsível. Sempre a mesma coisa.';
      }
    }

    // Fase 5: Revelar verdade
    if (phase === 5) {
      if (choices.length > 0) {
        const lastChoice = choices[choices.length - 1];
        return `Você escolheu "${lastChoice}" novamente. Sempre escolhe.`;
      }
    }

    return '';
  };

  // Simular "observação" do jogo
  const simulateObservation = () => {
    // Chance de mensagem aleatória de observação
    if (Math.random() > 0.7) {
      const observations = [
        'Você está sendo observado.',
        'Eu vejo suas escolhas.',
        'Você acha que tem controle?',
        'Tudo está sendo registrado.',
        'Você não está sozinho.',
      ];
      return observations[Math.floor(Math.random() * observations.length)];
    }
    return '';
  };

  return {
    analyzePatterns,
    getContextualMessage,
    simulateObservation,
  };
};
