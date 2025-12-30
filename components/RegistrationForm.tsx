
import React, { useState } from 'react';
import { PlayerData, Category, Position, Hand, MagicShot, LocalClub, MatchType } from '../types';

interface RegistrationFormProps {
  onComplete: (data: PlayerData) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<Partial<PlayerData>>({
    fullName: '',
    whatsapp: '',
    age: 25,
    availability: '',
    city: 'Olavarría',
    category: '6ta',
    position: 'Ambos',
    hand: 'Diestro',
    magicShot: 'Víbora',
    preferredClub: 'Padel Time',
    matchPrefs: ['Doble Caballeros']
  });

  const categories: Category[] = ['1ra', '2da', '3ra', '4ta', '5ta', '6ta', '7ma', '8va', 'Principiante'];
  const positions: Position[] = ['Drive', 'Revés', 'Ambos'];
  const hands: Hand[] = ['Diestro', 'Zurdo'];
  const clubs: LocalClub[] = ['Estudiantes', 'Racing', 'El Fortín', 'San Martín', 'Padel Time', 'La Quinta', 'Otro'];
  const matchTypes: MatchType[] = ['Doble Caballeros', 'Doble Damas', 'Doble Mixto', 'Singles'];
  const magicShots: { name: MagicShot; emoji: string }[] = [
    { name: 'Rulo a la reja', emoji: '🌀' },
    { name: 'Smash al vidrio', emoji: '💥' },
    { name: 'Víbora', emoji: '🐍' },
    { name: 'Globo perfecto', emoji: '🎈' },
    { name: 'Dejada cortada', emoji: '✂️' },
    { name: 'Bajada de pared', emoji: '📉' }
  ];

  const toggleMatchPref = (pref: MatchType) => {
    const current = formData.matchPrefs || [];
    if (current.includes(pref)) {
      setFormData({ ...formData, matchPrefs: current.filter(p => p !== pref) });
    } else {
      setFormData({ ...formData, matchPrefs: [...current, pref] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const completeData = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
    } as PlayerData;
    onComplete(completeData);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="glass p-6 md:p-10 rounded-[2.5rem] shadow-2xl border-white/5 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon/10 blur-[80px] rounded-full"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Section: Personal Data (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-neon font-black text-sm uppercase tracking-[0.2em] mb-4">Información Personal</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5 ml-1">Nombre Completo</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Juan Manuel Belgrano"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5 ml-1">WhatsApp</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">+54</span>
                    <input 
                      type="tel" 
                      required
                      placeholder="2284 123456"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-neon transition-all"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5 ml-1">Edad</label>
                  <input 
                    type="number" 
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-neon"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5 ml-1">Club Preferido</label>
                <select 
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-neon appearance-none"
                  value={formData.preferredClub}
                  onChange={(e) => setFormData({...formData, preferredClub: e.target.value as LocalClub})}
                >
                  {clubs.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5 ml-1">Disponibilidad horaria</label>
                <textarea 
                  rows={2}
                  placeholder="Lunes y Miércoles de 19 a 22. Fines de semana según pactado."
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-neon transition-all resize-none text-sm"
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Center Section: Padel Specs (4 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-neon font-black text-sm uppercase tracking-[0.2em] mb-4">Perfil Deportivo</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-3 ml-1 text-center">Seleccioná tu Categoría</label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({...formData, category: cat})}
                      className={`py-2.5 rounded-xl text-xs font-black transition-all ${formData.category === cat ? 'bg-neon text-slate-950 shadow-neon border-neon scale-105' : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">Lado de Juego</label>
                  <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
                    {positions.map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setFormData({...formData, position: p})}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${formData.position === p ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">Mano Hábil</label>
                  <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
                    {hands.map(h => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setFormData({...formData, hand: h})}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${formData.hand === h ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-3 ml-1">Tipo de Partidos que buscas</label>
                <div className="flex flex-wrap gap-2">
                  {matchTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleMatchPref(type)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold border transition-all ${formData.matchPrefs?.includes(type) ? 'border-neon bg-neon/10 text-white' : 'border-slate-800 bg-slate-900/30 text-slate-500'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Magic Shot (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-neon font-black text-sm uppercase tracking-[0.2em] mb-4">Especialidad</h3>
            <label className="block text-[10px] font-black text-slate-500 uppercase mb-3 ml-1">✨ Mi Golpe Mágico</label>
            <div className="grid grid-cols-1 gap-2">
              {magicShots.map((shot) => (
                <button
                  key={shot.name}
                  type="button"
                  onClick={() => setFormData({...formData, magicShot: shot.name})}
                  className={`px-5 py-3 rounded-2xl text-xs font-bold border transition-all flex items-center gap-3 ${formData.magicShot === shot.name ? 'border-neon bg-neon/20 text-white shadow-[0_0_20px_rgba(190,242,100,0.1)] scale-[1.02]' : 'border-slate-800 bg-slate-900/30 text-slate-400'}`}
                >
                  <span className="text-lg">{shot.emoji}</span>
                  {shot.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-slate-800/50 flex flex-col items-center">
          <button 
            type="submit"
            className="group relative w-full md:w-auto px-16 py-6 bg-neon text-slate-950 font-black text-2xl rounded-3xl shadow-neon hover:scale-105 active:scale-95 transition-all uppercase italic tracking-tighter"
          >
            <span className="relative z-10">CONFIRMAR MI REGISTRO 🚀</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
          </button>
          <p className="mt-6 text-slate-500 text-[10px] uppercase font-bold tracking-widest text-center">
            * Al unirte, aparecerás en la lista de jugadores de Olavarría.
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
