import React, { useState } from 'react';
import { Challenge } from '../types';

interface ChallengeCardProps {
  challenge: Challenge;
  onDecline: (id: string) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onDecline }) => {
  const [status, setStatus] = useState<'pending' | 'accepting' | 'ready'>('pending');
  const [isDeclined, setIsDeclined] = useState(false);

  const handleAccept = () => {
    setStatus('accepting');
    setTimeout(() => {
      setStatus('ready');
    }, 800);
  };

  const handleDecline = () => {
    setIsDeclined(true);
    setTimeout(() => {
      onDecline(challenge.id);
    }, 300);
  };

  if (isDeclined) {
    return (
      <div className="glass-card rounded-xl p-md flex flex-col gap-md opacity-0 -translate-x-5 transition-all duration-300">
        <div className="h-40" />
      </div>
    );
  }

  const isVersus = challenge.type === 'versus';
  const isCoop = challenge.type === 'coop';
  const isEvent = challenge.type === 'event';

  return (
    <div
      className={`glass-card rounded-xl p-md flex flex-col gap-md relative ${
        isEvent ? 'border-primary/40' : ''
      }`}
    >
      {isVersus && !isEvent && <div className="scanning-line"></div>}

      <div className="flex justify-between items-start">
        <div className="flex gap-md">
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-lg overflow-hidden border ${
                isEvent ? 'border-primary/50 shadow-[0_0_10px_rgba(255,177,195,0.2)]' : 'border-outline-variant/50'
              }`}
            >
              <img
                className="w-full h-full object-cover"
                alt="Challenger avatar"
                src={challenge.challengerAvatar}
              />
            </div>
            <div
              className={`absolute -bottom-1 -right-1 bg-surface border rounded-full p-1 ${
                isEvent ? 'border-primary/50' : 'border-outline-variant'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[16px] ${
                  isVersus && !isEvent ? 'text-error' : isCoop ? 'text-secondary' : 'text-primary'
                }`}
                style={isEvent ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {isVersus && !isEvent ? 'swords' : isCoop ? 'handshake' : 'bolt'}
              </span>
            </div>
          </div>
          <div>
            {isEvent ? (
              <div className="flex items-center gap-1">
                <p className="font-label-caps text-label-caps text-primary mb-unit">LEGENDARY DUEL</p>
                <span className="text-[10px] text-primary animate-pulse">● LIVE</span>
              </div>
            ) : (
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-unit">
                {isVersus ? 'CHALLENGER' : 'SQUAD REQUEST'}
              </p>
            )}
            <h3 className="font-headline-md text-headline-md text-on-surface">{challenge.challengerName}</h3>
            <div className="flex items-center gap-unit text-tertiary">
              <span className="material-symbols-outlined text-[14px]">
                {isCoop ? 'diversity_3' : 'military_tech'}
              </span>
              <span className="font-label-md text-label-md">Rank: {challenge.challengerRank}</span>
            </div>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full border ${
            isVersus && !isEvent
              ? 'bg-error-container/20 border-error/30'
              : isCoop
              ? 'bg-secondary-container/20 border-secondary/30'
              : 'bg-primary-container/30 border-primary/50'
          }`}
        >
          <span
            className={`font-label-caps text-[10px] ${
              isVersus && !isEvent ? 'text-error' : isCoop ? 'text-secondary' : 'text-primary'
            }`}
          >
            {isEvent ? 'ELITE' : isVersus ? 'VERSUS' : 'CO-OP'}
          </span>
        </div>
      </div>

      <div
        className={`rounded-lg p-md border ${
          isEvent ? 'bg-primary/5 border-primary/20' : 'bg-surface-container-low/50 border-white/5'
        }`}
      >
        <p
          className={`font-label-caps text-[10px] uppercase tracking-widest mb-1 ${
            isEvent ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          Mission Objective
        </p>
        <p
          className={`font-body-md text-body-md ${
            isEvent ? 'text-on-surface text-body-lg' : isVersus ? 'text-primary' : 'text-secondary'
          }`}
        >
          {challenge.objective}
        </p>
        
        {isEvent ? (
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 rounded bg-error text-on-error font-label-caps text-[10px]">
              {challenge.difficulty || 'HARD'}
            </span>
            <span className="text-on-surface-variant text-[12px]">Reward: {challenge.reward}</span>
          </div>
        ) : (
          <p className="font-label-md text-label-md text-on-surface-variant/70 mt-1 italic">
            "{challenge.description}"
          </p>
        )}
      </div>

      <div className="flex gap-md">
        <button
          onClick={handleAccept}
          disabled={status !== 'pending'}
          className={`flex-1 font-label-caps py-3 rounded-lg uppercase tracking-widest transition-all ${
            status === 'pending'
              ? 'bg-primary text-on-primary glow-pink active:scale-95'
              : status === 'accepting'
              ? 'bg-primary/50 text-on-primary/50 cursor-not-allowed flex items-center justify-center'
              : 'bg-tertiary text-on-tertiary shadow-[0_0_15px_rgba(89,222,155,0.4)]'
          }`}
        >
          {status === 'pending' && 'Accept'}
          {status === 'accepting' && (
            <span className="material-symbols-outlined animate-spin text-2xl">sync</span>
          )}
          {status === 'ready' && 'READY'}
        </button>
        <button
          onClick={handleDecline}
          disabled={status !== 'pending'}
          className={`flex-1 glass-card bg-transparent text-on-surface-variant font-label-caps py-3 rounded-lg uppercase tracking-widest transition-all ${
            status === 'pending' ? 'active:bg-white/10 hover:text-white' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Decline
        </button>
      </div>
    </div>
  );
};
