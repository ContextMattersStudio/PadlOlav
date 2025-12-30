
import React from 'react';
import { PlayerData } from '../types';

export const MOCK_PLAYERS: PlayerData[] = [
  { id: '1', fullName: "Facundo G.", whatsapp: "2284112233", age: 28, availability: "Tardes", city: "Olavarría", category: "4ta", position: "Revés", hand: "Diestro", magicShot: "Víbora", matchPrefs: ['Doble Caballeros', 'Doble Mixto'] },
  { id: '2', fullName: "Martina S.", whatsapp: "2284445566", age: 24, availability: "Mañanas", city: "Olavarría", category: "5ta", position: "Drive", hand: "Diestro", magicShot: "Globo perfecto", matchPrefs: ['Doble Damas', 'Doble Mixto'] },
  { id: '3', fullName: "Bauti R.", whatsapp: "2284998877", age: 21, availability: "Fines de semana", city: "Olavarría", category: "2da", position: "Revés", hand: "Zurdo", magicShot: "Smash al vidrio", matchPrefs: ['Doble Caballeros', 'Singles'] },
  { id: '4', fullName: "Carla L.", whatsapp: "2284223344", age: 30, availability: "Todo el día", city: "Olavarría", category: "6ta", position: "Drive", hand: "Diestro", magicShot: "Dejada cortada", matchPrefs: ['Doble Damas'] },
  { id: '5', fullName: "Enzo P.", whatsapp: "2284554433", age: 35, availability: "Noches", city: "Olavarría", category: "3ra", position: "Ambos", hand: "Diestro", magicShot: "Rulo a la reja", matchPrefs: ['Doble Caballeros', 'Doble Mixto'] },
  { id: '6', fullName: "Santi V.", whatsapp: "2284667788", age: 19, availability: "Lunes a Viernes", city: "Olavarría", category: "7ma", position: "Revés", hand: "Diestro", magicShot: "Víbora", matchPrefs: ['Doble Caballeros', 'Singles'] },
];

interface PlayerListProps {
  selectedIds?: string[];
  onPlayerClick?: (player: PlayerData) => void;
  selectionModeLabel?: string;
}

const PlayerList: React.FC<PlayerListProps> = ({ selectedIds = [], onPlayerClick, selectionModeLabel }) => {
  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          {selectionModeLabel ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon text-slate-950 rounded-full font-black text-[10px] uppercase mb-4 animate-bounce">
              <span className="w-2 h-2 bg-slate-950 rounded-full"></span>
              {selectionModeLabel}
            </div>
          ) : (
            <span className="text-neon font-black uppercase tracking-widest text-xs mb-4 inline-block">Comunidad Activa</span>
          )}
          <h2 className="text-4xl font-black text-white leading-tight">
            Jugadores <span className="text-neon">Disponibles</span>
          </h2>
          <p className="text-slate-400 mt-2">
            {selectionModeLabel 
              ? "Hacé clic en un jugador de abajo para asignarlo a la posición seleccionada en la cancha." 
              : "Explorá los perfiles y contactalos para armar tu próximo partido."}
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs text-white">
            <span className="text-slate-500 mr-2 uppercase font-black">Filtrar:</span>
            Categoría
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PLAYERS.map((player) => {
          const isSelected = selectedIds.includes(player.id);
          const canClick = !!onPlayerClick;
          
          return (
            <div 
              key={player.id} 
              onClick={() => canClick && onPlayerClick && onPlayerClick(player)}
              className={`glass p-8 rounded-[2.5rem] transition-all group relative overflow-hidden border-2 
                ${isSelected ? 'border-neon ring-4 ring-neon/10 bg-slate-800/90' : 'border-white/5 hover:border-neon hover:scale-[1.02] cursor-pointer'}
                ${canClick && !isSelected ? 'hover:shadow-neon' : ''}
              `}
            >
              {isSelected && (
                <div className="absolute top-4 right-8 flex items-center gap-1.5 px-2.5 py-1 bg-neon text-slate-950 text-[10px] font-black rounded-full uppercase tracking-tighter z-20">
                  <span className="w-1.5 h-1.5 bg-slate-950 rounded-full animate-pulse"></span>
                  En Cancha
                </div>
              )}
              
              <div className="flex items-start gap-5">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center font-black text-2xl border-2 transition-all rotate-3
                  ${isSelected ? 'bg-neon text-slate-950 border-white' : 'bg-slate-700 text-neon border-slate-600 group-hover:rotate-0'}
                `}>
                  {player.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col">
                    <h3 className={`text-xl font-black transition-colors ${isSelected ? 'text-neon' : 'text-white'}`}>
                      {player.fullName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-neon font-black text-sm uppercase">{player.category}</span>
                      <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{player.hand}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                  <div className="text-[9px] uppercase font-black text-slate-600 mb-1">Posición</div>
                  <div className="text-xs text-white font-bold">{player.position}</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                  <div className="text-[9px] uppercase font-black text-slate-600 mb-1">Golpe Maestro</div>
                  <div className="text-xs text-white font-bold italic">{player.magicShot}</div>
                </div>
              </div>

              {!isSelected && !canClick && (
                <div className="mt-8 flex items-center justify-between">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Disponibilidad: <span className="text-slate-300">{player.availability}</span></div>
                  <a 
                    href={`https://wa.me/54${player.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </a>
                </div>
              )}

              {canClick && !isSelected && (
                <div className="mt-6 flex justify-center">
                   <div className="text-[10px] font-black text-neon uppercase tracking-widest animate-pulse">Click para elegir</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerList;
