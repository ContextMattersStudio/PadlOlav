
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-neon rounded flex items-center justify-center rotate-3">
                <span className="text-slate-900 font-black">P</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                Padel <span className="text-neon">Ola</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Impulsando el pádel en Olavarría. Nuestra misión es conectar a todos los amantes de este deporte para fomentar la competencia sana y la amistad.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon="instagram" />
              <SocialIcon icon="facebook" />
              <SocialIcon icon="twitter" />
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Navegación</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-neon transition-colors">Inicio</a></li>
              <li><a href="#features" className="hover:text-neon transition-colors">Beneficios</a></li>
              <li><a href="#torneos" className="hover:text-neon transition-colors">Torneos Activos</a></li>
              <li><a href="#registro" className="hover:text-neon transition-colors">Registro de Jugadores</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contacto</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li>info@padelolavarria.com.ar</li>
              <li>+54 2284 555-666</li>
              <li>Olavarría, Buenos Aires, ARG</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Padel Olavarría Community. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-slate-600 text-xs">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ icon: string }> = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:border-neon hover:text-neon transition-all">
    {icon === 'instagram' && (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    )}
    {icon === 'facebook' && (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    )}
    {icon === 'twitter' && (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
    )}
  </a>
);

export default Footer;
