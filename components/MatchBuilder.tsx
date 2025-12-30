
import React, { useState, useEffect } from 'react';
import { PlayerData, CourtSlot, MatchState } from '../types';

interface MatchBuilderProps {
  matchPlayers: Record<CourtSlot, PlayerData | null>;
  currentUser: PlayerData;
  onSlotClick: (slot: CourtSlot) => void;
  activeSlot: CourtSlot | null;
}

const MatchBuilder: React.FC<MatchBuilderProps> = ({ matchPlayers, currentUser, onSlotClick, activeSlot }) => {
  const [status, setStatus] = useState<'planning' | 'inviting' | 'confirmed'>('planning');
  const [timer, setTimer] = useState(660);

  useEffect(() => {
    let interval: any;
    if (status === 'inviting' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setStatus('planning');
      setTimer(660);
    }
    return () => clearInterval(interval);
  }, [status, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInvite = () => {
    const allSet = Object.values(matchPlayers).every(p => p !== null);
    if (!allSet) {
      alert("Debes completar los 4 jugadores para invitar.");
      return;
    }
    setStatus('inviting');
  };

  const renderSlot = (slot: CourtSlot, label: string) => {
    const player = matchPlayers[slot];
    const isCurrentUser = player?.id === currentUser.id;
    const isBeingSelected = activeSlot === slot;

    return (
      <div 
        onClick={() => status === 'planning' && onSlotClick(slot)}
        className={`relative group cursor-pointer transition-all duration-300 flex flex-col items-center justify-center p-4 rounded-2xl
          ${isBeingSelected ? 'ring-4 ring-neon scale-110 bg-slate-800 shadow-[0_0_30px_rgba(190,242,100,0.3)]' : ''}
          ${player ? 'bg-slate-800/90 border border-slate-700' : 'bg-slate-900/40 border-2 border-dashed border-slate-700 hover:border-neon/50'}
          ${status !== 'planning' ? 'pointer-events-none' : ''}
        `}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-xl mb-2 border-2 transition-all
          ${isCurrentUser ? 'bg-neon text-slate-950 border-white' : 'bg-slate-700 text-neon border-slate-600'}
          ${isBeingSelected ? 'animate-pulse' : ''}
        `}>
          {player ? player.fullName.split(' ').map(n => n[0]).join('') : '?'}
        </div>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
        {player && (
          <span className="text-xs text-white font-bold mt-1">{player.fullName}</span>
        )}
        
        {/* Selector overlay */}
        {!player && !isBeingSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
            <span className="text-neon font-black text-[10px] uppercase">Elegir Jugador</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="relative aspect-[16/10] bg-blue-600 rounded-[3rem] border-[12px] border-slate-800 shadow-2xl overflow-hidden p-6 md:p-12">
        {/* Court Lines */}
        <div className="absolute inset-6 md:inset-12 border-2 border-white pointer-events-none opacity-60"></div>
        <div className="absolute top-1/2 left-6 right-6 h-1 bg-white opacity-60 pointer-events-none"></div>
        <div className="absolute left-1/2 top-6 bottom-6 w-1 bg-white opacity-30 pointer-events-none"></div>
        
        <div className="relative h-full w-full grid grid-cols-2 grid-rows-2 gap-x-12 gap-y-16">
          <div className="flex items-center justify-center">{renderSlot('reves_1', 'Revés A')}</div>
          <div className="flex items-center justify-center">{renderSlot('drive_1', 'Drive A')}</div>
          <div className="flex items-center justify-center">{renderSlot('drive_2', 'Drive B')}</div>
          <div className="flex items-center justify-center">{renderSlot('reves_2', 'Revés B')}</div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-6">
        {status === 'planning' && (
          <button 
            onClick={handleInvite}
            className="px-16 py-5 bg-neon text-slate-950 font-black text-2xl rounded-2xl shadow-neon hover:scale-105 transition-all group overflow-hidden relative"
          >
            <span className="relative z-10">¡ARMUEMOS EL PARTIDO! 🎾</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </button>
        )}

        {status === 'inviting' && (
          <div className="w-full max-w-md glass p-8 rounded-3xl flex flex-col items-center border-neon animate-pulse text-center">
            <div className="text-neon text-5xl font-black mb-2">{formatTime(timer)}</div>
            <p className="text-white font-bold text-lg mb-2">Enviando invitaciones...</p>
            <p className="text-slate-400 text-sm">Avisaremos a los jugadores por WhatsApp.</p>
          </div>
        )}

        {status === 'confirmed' && (
          <div className="w-full max-w-md bg-green-500/20 border border-green-500 p-8 rounded-3xl text-center">
            <h4 className="text-green-500 text-3xl font-black mb-2">¡TODO LISTO! 🏆</h4>
            <p className="text-white/80">Cancha reservada en Padel Time.</p>
            <button onClick={() => setStatus('planning')} className="mt-6 text-sm text-white/50 underline hover:text-white">Reiniciar cancha</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchBuilder;
