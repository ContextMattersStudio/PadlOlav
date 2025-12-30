
import React from 'react';

interface HeroProps {
  onExplore: () => void;
  onRegister: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, onRegister }) => {
  return (
    <div className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image: High Quality Blue Padel Court */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1626225443592-d6773369a838?auto=format&fit=crop&q=80&w=2000" 
          alt="Cancha de Padel Azul Cristal" 
          className="w-full h-full object-cover scale-105 animate-[pulse_15s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-lime-400/30 bg-lime-400/10 text-neon font-bold text-xs uppercase tracking-widest animate-bounce">
          📍 Olavarría, Provincia de Buenos Aires
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
          La Red de Padel <br />
          <span className="text-neon italic underline decoration-lime-500/30">N°1 de la Ciudad</span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Unite a la comunidad más activa de Olavarría. Encontrá tu pareja ideal, desafiá a otros niveles y reservá tu lugar en el ranking.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onExplore}
            className="group relative px-8 py-4 bg-neon text-slate-950 font-black text-lg rounded-xl overflow-hidden shadow-neon transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">QUIERO JUGAR YA</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
          <button 
            onClick={onRegister}
            className="px-8 py-4 bg-transparent border-2 border-slate-600 text-white font-bold text-lg rounded-xl hover:bg-slate-800 transition-colors"
          >
            Registrarme como Jugador
          </button>
        </div>

        {/* Floating Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 hover:opacity-100 transition-opacity">
          <div>
            <div className="text-2xl font-black text-white">650+</div>
            <div className="text-xs uppercase tracking-widest text-slate-400">Jugadores</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">15</div>
            <div className="text-xs uppercase tracking-widest text-slate-400">Clubes Locales</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">8</div>
            <div className="text-xs uppercase tracking-widest text-slate-400">Categorías</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">24/7</div>
            <div className="text-xs uppercase tracking-widest text-slate-400">Actividad</div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
      </div>
    </div>
  );
};

export default Hero;
