# Changelog

## [1.0] - 2026-04-05

### Adicionado

- ✅ **Sistema de 5 Fases**: Progressão clara de estranheza
  - Fase 1: Normal (conforto)
  - Fase 2: Estranho leve (questionamento)
  - Fase 3: Observação (invasão)
  - Fase 4: Pressão psicológica (caos)
  - Fase 5: Quebra da realidade (verdade)

- ✅ **Perfil Comportamental**: Rastreamento de 5 dimensões psicológicas
  - Coragem
  - Medo
  - Curiosidade
  - Indecisão
  - Consistência

- ✅ **Análise de Tempo de Resposta**: Detecta padrões comportamentais
  - Respostas rápidas = coragem
  - Respostas lentas = indecisão
  - Respostas hesitantes = medo

- ✅ **Sistema de Finais**: 4 finais diferentes baseados no perfil
  - Neutro: Seguiu o caminho sem questionar
  - Ansioso: Hesitou demais
  - Sombrio: Escolheu o caminho escuro
  - Consciente: Entendeu o jogo

- ✅ **Efeitos Visuais Psicodélicos**
  - Cursor piscante
  - Linhas de scan (CRT effect)
  - Glitch aleatório
  - Tremor de tela
  - Distorção progressiva
  - Aberração cromática

- ✅ **Tipografia Monospace**: IBM Plex Mono em todo o projeto
  - Efeito de digitação progressiva
  - Cores dinâmicas por fase
  - Animações de fade-in/fade-out

- ✅ **Título Dinâmico**: Muda conforme a fase avança

- ✅ **Efeitos Sonoros**: Web Audio API
  - Frequências diferentes por fase
  - Ondas quadradas nas fases finais

- ✅ **Persistência**: localStorage
  - Salva estado do jogo automaticamente
  - Permite retomar partida anterior

- ✅ **Roteamento**: 3 páginas principais
  - Welcome: Tela inicial com input de nome
  - Game: Página principal do jogo
  - Ending: Página de finais personalizada

- ✅ **Componentes Reutilizáveis**
  - GameMessage: Mensagens com digitação
  - GameButton: Botões com cores dinâmicas
  - PsychedelicEffects: Efeitos visuais
  - DistortionLayer: Distorção progressiva
  - DynamicTitle: Título dinâmico
  - AudioEffects: Efeitos sonoros
  - ObservationMessage: Mensagens de observação

- ✅ **Hooks Customizados**
  - useGame: Gerenciamento de estado global
  - useGamePhases: Lógica de fases e mensagens
  - usePsychologicalBehavior: Análise comportamental

- ✅ **Configuração Centralizada**: gameConfig.ts
  - Fácil customização de mensagens, cores, delays
  - Constantes para efeitos e comportamentos

### Design

- **Filosofia**: Brutalism Digital + Glitch Progressivo
- **Paleta**: Branco → Verde/Ciano → Vermelho → Amarelo
- **Tema**: Preto puro com branco/cores neon
- **Tipografia**: IBM Plex Mono (monospace)

### Técnico

- React 19 + TypeScript
- TailwindCSS 4
- Wouter para roteamento
- localStorage para persistência
- Web Audio API para efeitos sonoros
- CSS animations e keyframes

### Documentação

- README.md completo
- CHANGELOG.md (este arquivo)
- Comentários no código
- Configuração centralizada

## Roadmap Futuro

### v1.1 (Possível)

- [ ] Suporte a múltiplos idiomas
- [ ] Leaderboard com scores
- [ ] Compartilhamento de resultados
- [ ] Modo "hardcore" com mais fases
- [ ] Customização de dificuldade

### v2.0 (Conceitual)

- [ ] Multiplayer (observar outros jogadores)
- [ ] Integração com APIs externas
- [ ] Análise profunda de comportamento
- [ ] Narrativa mais complexa
- [ ] Efeitos visuais 3D

---

**Status**: Completo e pronto para jogar  
**Versão**: 1.0  
**Data**: 2026-04-05
