
import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';
import PlayerList, { MOCK_PLAYERS } from './components/PlayerList';
import MatchBuilder from './components/MatchBuilder';
import Footer from './components/Footer';
import { PlayerData, CourtSlot } from './types';

const INITIAL_USER: PlayerData = {
  id: 'me',
  fullName: "Invitado",
  whatsapp: "2284000000",
  age: 0,
  availability: "Siempre",
  city: "Olavarría",
  category: "4ta",
  position: "Drive",
  hand: "Diestro",
  magicShot: "Víbora",
  matchPrefs: ['Doble Caballeros'],
  preferredClub: 'Estudiantes'
};

const App: React.FC = () => {
  const [showPlayers, setShowPlayers] = useState(false);
  const [currentUser, setCurrentUser] = useState<PlayerData>(INITIAL_USER);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegForm, setShowRegForm] = useState(false);
  
  // Estado del partido actual
  const [matchPlayers, setMatchPlayers] = useState<Record<CourtSlot, PlayerData | null>>({
    drive_1: null,
    reves_1: null,
    drive_2: null,
    reves_2: null,
  });

  // Slot que se está intentando llenar
  const [activeSlotSelection, setActiveSlotSelection] = useState<CourtSlot | null>(null);
  
  const playersSectionRef = useRef<HTMLElement>(null);
  const regSectionRef = useRef<HTMLElement>(null);
  const playerListRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Inicializar el usuario en la cancha al cargar o registrar
  useEffect(() => {
    if (showPlayers && !matchPlayers.drive_1 && !matchPlayers.reves_1) {
       const initialSlot = currentUser.position === 'Revés' ? 'reves_1' : 'drive_1';
       setMatchPlayers(prev => ({ ...prev, [initialSlot]: currentUser }));
    }
  }, [showPlayers, currentUser]);

  const handleExplore = () => {
    if (!showPlayers) {
      setShowPlayers(true);
      // Forzar scroll después de render
      setTimeout(() => scrollToSection(playersSectionRef), 100);
    } else {
      scrollToSection(playersSectionRef);
    }
  };

  const handleRegisterClick = () => {
    if (isRegistered) {
      handleExplore();
    } else {
      setShowRegForm(true);
      setTimeout(() => scrollToSection(regSectionRef), 100);
    }
  };

  const onRegistrationSuccess = (data: PlayerData) => {
    setCurrentUser(data);
    setIsRegistered(true);
    setShowRegForm(false);
    setShowPlayers(true);
    setTimeout(() => scrollToSection(playersSectionRef), 300);
  };

  // Cuando el usuario toca un slot en la cancha
  const handleSlotClick = (slot: CourtSlot) => {
    setActiveSlotSelection(slot);
    // Hacemos scroll a la lista de jugadores para que elija uno
    setTimeout(() => {
      playerListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  // Cuando el usuario elige un jugador de la lista
  const handleSelectFromList = (player: PlayerData) => {
    if (!activeSlotSelection) return;

    const newMatch = { ...matchPlayers };
    
    // Si el jugador ya estaba en otra posición, lo quitamos de ahí
    Object.keys(newMatch).forEach(key => {
      if (newMatch[key as CourtSlot]?.id === player.id) {
        newMatch[key as CourtSlot] = null;
      }
    });

    newMatch[activeSlotSelection] = player;
    setMatchPlayers(newMatch);
    setActiveSlotSelection(null);
    
    // Volvemos a la cancha para que vea que se cargó
    setTimeout(() => scrollToSection(playersSectionRef), 300);
  };

  const selectedIds = Object.values(matchPlayers)
    .filter((p): p is PlayerData => p !== null)
    .map(p => p.id);

  return (
    <div className="min-h-screen flex flex-col selection:bg-lime-400 selection:text-slate-900">
      <Navbar onRegisterClick={handleRegisterClick} />
      
      <main className="flex-grow">
        <Hero onExplore={handleExplore} onRegister={handleRegisterClick} />
        
        {showRegForm && !isRegistered && (
          <section ref={regSectionRef} className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <span className="text-neon font-black uppercase tracking-widest text-xs mb-4 inline-block">Únete a la elite</span>
                  <h2 className="text-5xl md:text-6xl font-black text-white mb-4">Perfil de <span className="text-neon italic">Jugador</span></h2>
                  <p className="text-slate-400 max-w-xl mx-auto">Completa tus datos para que otros jugadores de Olavarría puedan encontrarte.</p>
                </div>
                <RegistrationForm onComplete={onRegistrationSuccess} />
             </div>
          </section>
        )}

        {showPlayers && (
          <section ref={playersSectionRef} id="explorar" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-20">
                <div className="flex flex-col items-center mb-12">
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-full mb-6 border border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-neon animate-pulse"></span>
                    <span className="text-white text-xs font-bold">
                      {isRegistered ? `Jugando como ${currentUser.fullName}` : 'Modo Explorador (Invitado)'}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-4 uppercase italic">La <span className="text-neon">Cancha</span></h2>
                  <p className="text-slate-400 text-center max-w-2xl mx-auto">
                    Toca un espacio vacío para seleccionar un jugador de la lista de abajo.
                  </p>
                </div>
                
                <MatchBuilder 
                  matchPlayers={matchPlayers}
                  currentUser={currentUser}
                  onSlotClick={handleSlotClick}
                  activeSlot={activeSlotSelection}
                />
              </div>
              
              <div ref={playerListRef} className="pt-20 border-t border-slate-800">
                <PlayerList 
                  selectedIds={selectedIds} 
                  onPlayerClick={activeSlotSelection ? handleSelectFromList : undefined}
                  selectionModeLabel={activeSlotSelection ? `Seleccionando para: ${activeSlotSelection.replace('_', ' ').toUpperCase()}` : undefined}
                />
              </div>
            </div>
          </section>
        )}

        <section id="features" className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-lime-400/50 transition-all group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎾</div>
                <h3 className="text-xl font-bold text-white mb-2">Comunidad Activa</h3>
                <p className="text-slate-400">Más de 600 jugadores registrados en Olavarría listos para entrar a la cancha.</p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-lime-400/50 transition-all group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🏆</div>
                <h3 className="text-xl font-bold text-white mb-2">Torneos Semanales</h3>
                <p className="text-slate-400">Competí en tu categoría y sumá puntos para el ranking oficial de la ciudad.</p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-lime-400/50 transition-all group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">Partidos Flash</h3>
                <p className="text-slate-400">¿Te falta uno? Publicá tu partido y completá el turno en cuestión de minutos.</p>
              </div>
            </div>
          </div>
        </section>

        {!isRegistered && !showRegForm && (
          <section id="cta-registro" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-500/5 rounded-full blur-[120px] -z-10" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
                ¿Todavía no sos parte de <span className="text-neon italic">Ola</span>?
              </h2>
              <button 
                onClick={handleRegisterClick}
                className="px-12 py-5 bg-neon text-slate-950 font-black text-xl rounded-2xl shadow-neon hover:scale-105 transition-all uppercase tracking-tighter"
              >
                UNIRME AHORA GRATIS
              </button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
