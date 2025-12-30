
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-neon rounded-lg flex items-center justify-center rotate-3 shadow-neon">
            <span className="text-slate-900 font-black text-xl">P</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
            Padel <span className="text-neon">Ola</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-semibold text-slate-300 hover:text-neon transition-colors">Inicio</a>
          <a href="#features" className="text-sm font-semibold text-slate-300 hover:text-neon transition-colors">Comunidad</a>
          <a href="#torneos" className="text-sm font-semibold text-slate-300 hover:text-neon transition-colors">Torneos</a>
          <button 
            onClick={onRegisterClick}
            className="px-5 py-2 rounded-full bg-neon text-slate-950 text-sm font-bold shadow-neon hover:scale-105 transition-transform active:scale-95"
          >
            Registrarme
          </button>
        </div>

        <button className="md:hidden text-white p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
