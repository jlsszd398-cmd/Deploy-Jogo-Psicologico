import { useGame } from '@/contexts/GameContext';
import { GamePhase } from '@/contexts/GameContext';

export const useGamePhases = () => {
  const { gameState, updateProfile, recordChoice } = useGame();

  // Mensagens por fase - mais sofisticadas e psicológicas
  const getPhaseMessages = (phase: GamePhase) => {
    const messages: Record<GamePhase, string[]> = {
      1: [
        'Olá. Vamos jogar um jogo?',
        'Será rápido.',
        'Ou talvez não.',
      ],
      2: [
        'Você tem certeza disso?',
        'Realmente?',
        'Você hesitou.',
      ],
      3: [
        'Você clicou rápido.',
        'Muito rápido.',
        'Você está com pressa de quê?',
      ],
      4: [
        'Você foge das coisas?',
        'Você mente pra si mesmo?',
        'Qual é a verdade?',
      ],
      5: [
        'Você sempre escolhe isso.',
        'Sempre.',
        'Somos prisioneiros de nós mesmos.',
      ],
    };
    return messages[phase];
  };

  // Opções de escolha por fase
  const getPhaseChoices = (phase: GamePhase) => {
    const choices: Record<GamePhase, string[]> = {
      1: ['Sim', 'Não'],
      2: ['Continuar', 'Parar'],
      3: ['Avançar', 'Recuar'],
      4: ['Verdade', 'Mentira'],
      5: ['Aceitar', 'Negar'],
    };
    return choices[phase];
  };

  // Calcular impacto da escolha no perfil
  const processChoice = (choice: string, responseTime: number) => {
    const phase = gameState.phase;

    // Análise de tempo de resposta
    const isQuick = responseTime < 500;
    const isSlow = responseTime > 2000;
    const isHesitant = responseTime > 1000 && responseTime < 2000;

    // Atualizar perfil baseado na escolha
    const updates: Record<string, number> = {};

    switch (phase) {
      case 1:
        // Fase 1: Ambas as escolhas levam ao mesmo caminho
        if (choice === 'Não') {
          updates.medo = (gameState.profile.medo || 0) + 1;
        } else {
          updates.coragem = (gameState.profile.coragem || 0) + 1;
        }
        break;

      case 2:
        // Fase 2: Começa a questionar
        if (choice === 'Continuar') {
          updates.curiosidade = (gameState.profile.curiosidade || 0) + 1;
        } else {
          updates.medo = (gameState.profile.medo || 0) + 1;
        }
        break;

      case 3:
        // Fase 3: Observação comportamental
        if (isQuick) {
          updates.coragem = (gameState.profile.coragem || 0) + 1;
        } else if (isSlow) {
          updates.indecisao = (gameState.profile.indecisao || 0) + 1;
        } else if (isHesitant) {
          updates.medo = (gameState.profile.medo || 0) + 1;
        }
        break;

      case 4:
        // Fase 4: Pressão psicológica
        if (choice === 'Verdade') {
          updates.coragem = (gameState.profile.coragem || 0) + 1;
        } else {
          updates.medo = (gameState.profile.medo || 0) + 1;
        }
        break;

      case 5:
        // Fase 5: Quebra da realidade
        updates.consistencia = (gameState.profile.consistencia || 0) + 1;
        break;
    }

    recordChoice(choice, responseTime);
    updateProfile(updates);
  };

  // Determinar fim do jogo baseado no perfil
  const getEnding = () => {
    const profile = gameState.profile;

    // Calcular scores
    const coragem = profile.coragem || 0;
    const medo = profile.medo || 0;
    const curiosidade = profile.curiosidade || 0;
    const indecisao = profile.indecisao || 0;
    const consistencia = profile.consistencia || 0;

    // Determinar tipo de final
    if (indecisao > 3) {
      return {
        type: 'anxious',
        title: '😰 Ansioso',
        description: 'Você hesitou demais. A incerteza consumiu você.',
      };
    } else if (medo > coragem + 2) {
      return {
        type: 'dark',
        title: '😈 Sombrio',
        description: 'Você escolheu o caminho escuro. Não há volta.',
      };
    } else if (coragem > medo + 2 && consistencia > 2) {
      return {
        type: 'conscious',
        title: '🧠 Consciente',
        description: 'Você entendeu o jogo. Você é o jogo.',
      };
    } else {
      return {
        type: 'neutral',
        title: '😐 Neutro',
        description: 'Você seguiu o caminho. Como sempre.',
      };
    }
  };

  // Mensagens de observação contextual
  const getObservationMessage = (): string => {
    const profile = gameState.profile;
    const phase = gameState.phase;
    const choices = gameState.choices;

    if (phase < 3) return '';

    // Detectar padrões
    if (choices.length >= 2) {
      const lastTwo = choices.slice(-2);
      if (lastTwo[0] === lastTwo[1]) {
        return 'Você repete padrões.';
      }
    }

    // Análise de perfil
    if (profile.indecisao > 2) {
      return 'Você não consegue decidir.';
    }
    if (profile.coragem > profile.medo + 2) {
      return 'Você é corajoso. Ou tolo.';
    }
    if (profile.medo > profile.coragem + 2) {
      return 'Você tem muito medo.';
    }

    return '';
  };

  return {
    getPhaseMessages,
    getPhaseChoices,
    processChoice,
    getEnding,
    getObservationMessage,
  };
};
