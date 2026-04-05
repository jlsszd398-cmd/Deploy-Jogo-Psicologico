import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { GameMessage } from '@/components/GameMessage';
import { GameButton } from '@/components/GameButton';
import { DynamicTitle } from '@/components/DynamicTitle';
import { useLocation } from 'wouter';

export default function Welcome() {
  const { updatePlayerName } = useGame();
  const [, navigate] = useLocation();
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      updatePlayerName(playerName);
      setShowStartButton(true);
    }
  };

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <>
      <DynamicTitle />
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Título */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold font-mono mb-4">
              JOGO
            </h1>
            <div className="text-gray-500 font-mono text-sm">
              v1.0 | BRUTALISM DIGITAL
            </div>
          </div>

          {/* Mensagem de boas-vindas */}
          <GameMessage
            text="Bem-vindo. Este é um jogo sobre escolhas."
            delay={500}
            onComplete={() => setShowNameInput(true)}
          />

          {/* Input de nome */}
          {showNameInput && !showStartButton && (
            <form onSubmit={handleNameSubmit} className="space-y-4 animate-fade-in">
              <input
                type="text"
                placeholder="Qual é seu nome?"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 bg-black border-2 border-white text-white font-mono text-lg focus:outline-none focus:border-green-400 placeholder-gray-600"
                autoFocus
              />
              <GameButton onClick={() => handleNameSubmit({} as React.FormEvent)}>
                Continuar
              </GameButton>
            </form>
          )}

          {/* Botão de início */}
          {showStartButton && (
            <div className="space-y-4 animate-fade-in">
              <p className="font-mono text-lg">
                Bem-vindo, <span className="text-green-400">{playerName}</span>.
              </p>
              <GameButton onClick={handleStart}>
                Iniciar Jogo
              </GameButton>
            </div>
          )}

          {/* Descrição */}
          <div className="mt-16 text-gray-500 font-mono text-sm leading-relaxed">
            <p>Este jogo começa simples.</p>
            <p className="mt-2">Mas evoluirá.</p>
            <p className="mt-2">Prepare-se.</p>
          </div>
        </div>
      </div>
    </>
  );
}
