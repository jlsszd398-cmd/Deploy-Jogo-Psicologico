/**
 * Configuração Central do Jogo Psicodélico
 * Edite este arquivo para customizar comportamentos e mensagens
 */

export const GAME_CONFIG = {
  // Versão
  version: '1.0',
  theme: 'BRUTALISM DIGITAL',

  // Número de fases
  totalPhases: 5,

  // Número de escolhas para terminar o jogo
  choicesNeededToEnd: 5,

  // Limiares para determinar finais
  endings: {
    anxious: {
      minIndecision: 3,
    },
    dark: {
      fearThreshold: 2, // medo > coragem + threshold
    },
    conscious: {
      courageThreshold: 2,
      consistencyMin: 2,
    },
  },

  // Análise de tempo de resposta (em ms)
  responseTime: {
    quick: 500,
    slow: 2000,
  },

  // Configuração de efeitos
  effects: {
    glitchChance: 0.3, // 30% de chance de glitch por intervalo
    glitchInterval: 2000, // a cada 2 segundos
    shakeChance: 0.4, // 40% de chance de shake
    shakeInterval: 3000, // a cada 3 segundos
  },

  // Velocidade de digitação (ms por caractere)
  typingSpeed: {
    phase1: 50,
    phase2: 75,
    phase3: 100,
    phase4: 100,
    phase5: 100,
  },

  // Delays de transição (ms)
  delays: {
    messageToMessage: 1000,
    choiceToNextPhase: 1000,
    phaseTransition: 500,
  },

  // Cores por fase (CSS)
  colors: {
    phase1: {
      text: '#ffffff',
      border: '#ffffff',
      background: '#000000',
    },
    phase2: {
      text: '#ffffff',
      border: '#ffffff',
      background: '#000000',
    },
    phase3: {
      text: '#00ff00',
      border: '#00ff00',
      background: '#000000',
    },
    phase4: {
      text: '#ff0000',
      border: '#ff0000',
      background: '#000000',
    },
    phase5: {
      text: '#ffff00',
      border: '#ffff00',
      background: '#000000',
    },
  },

  // Mensagens de observação (aleatórias)
  observations: [
    'Você está sendo observado.',
    'Eu vejo suas escolhas.',
    'Você acha que tem controle?',
    'Tudo está sendo registrado.',
    'Você não está sozinho.',
    'Seus padrões são previsíveis.',
    'Você já fez isso antes.',
    'Por que sempre a mesma coisa?',
  ],

  // Mensagens de reflexão por tipo de final
  reflections: {
    neutral: 'Às vezes, a vida é apenas o que acontece enquanto fazemos planos.',
    anxious: 'A indecisão é uma escolha. E escolhas têm consequências.',
    dark: 'O escuro não é mau. É apenas... diferente.',
    conscious: 'A consciência é o primeiro passo para a liberdade.',
  },
};

// Títulos dinâmicos por fase
export const DYNAMIC_TITLES: Record<number, string[]> = {
  1: ['Jogo Psicodélico', 'Bem-vindo'],
  2: ['Você tem certeza?', 'Jogo Psicodélico'],
  3: ['Você está sendo observado', 'Jogo Psicodélico'],
  4: ['Qual é a verdade?', 'Jogo Psicodélico'],
  5: ['Você sempre escolhe isso', 'Jogo Psicodélico'],
};

// Frequências de áudio por fase (Hz)
export const AUDIO_FREQUENCIES: Record<number, number> = {
  1: 440, // A4
  2: 494, // B4
  3: 523, // C5
  4: 587, // D5
  5: 659, // E5
};
