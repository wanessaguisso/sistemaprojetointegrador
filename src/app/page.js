export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e6f5f2] via-[#f6faf9] to-[#f2f7fa]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center overflow-hidden">
        {/* Organic subtle background waves */}
        <svg
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#b7e0dc" stopOpacity="0.13" />
              <stop offset="1" stopColor="#c9e7e3" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 Q320,160 640,80 T1280,80 V0 H0 Z"
            fill="url(#waveGradient)"
          />
        </svg>
        <h1 className="relative z-10 text-4xl md:text-5xl font-medium text-black mb-4 font-sans">
          Gerencie Seus Projetos Integradores com Excelência
        </h1>
        <p className="relative z-10 max-w-xl mx-auto text-lg md:text-xl text-black/80 font-light mb-8">
          Nosso sistema oferece a solução completa para o cadastro, organização e gestão eficiente de cursos, projetos e estandes.
        </p>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <a
            href="/register"
            className="px-8 py-3 rounded-lg bg-[#2b4e4b] text-white font-medium shadow hover:bg-[#223c3a] transition-colors"
          >
            Comece Agora
          </a>
          <a
            href="/login"
            className="px-8 py-3 rounded-lg border-2 border-[#2b4e4b] text-[#2b4e4b] font-medium bg-white hover:bg-[#f2f7fa] transition-colors"
          >
            Login
          </a>
        </div>
        {/* Subtle organic lines */}
        <svg
          className="absolute right-0 bottom-0 w-1/2 h-24 opacity-30 pointer-events-none"
          aria-hidden="true"
        >
          <path
            d="M0,20 Q80,40 160,20 T320,20"
            fill="none"
            stroke="#b7e0dc"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </section>
      <section className="bg-white/80 py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center border border-[#e6f5f2] transition-shadow hover:shadow-lg">
            <svg width="40" height="40" fill="none" stroke="#222" strokeWidth="2" className="mb-4">
              <path d="M8 32 L32 8 M8 8 L32 32" />
              <circle cx="20" cy="20" r="12" stroke="#2b4e4b" strokeWidth="2" fill="none" />
            </svg>
            <h3 className="text-lg font-semibold text-black mb-2 text-center">Otimize a Gestão de Projetos Integradores</h3>
            <p className="text-black/70 font-light text-center">
              Simplifique cada etapa do seu projeto com uma interface intuitiva e controle total sobre usuários, cursos e estandes.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center border border-[#e6f5f2] transition-shadow hover:shadow-lg">
            <svg width="40" height="40" fill="none" stroke="#222" strokeWidth="2" className="mb-4">
              <circle cx="20" cy="20" r="16" stroke="#2b4e4b" strokeWidth="2" fill="none" />
              <path d="M20 10 V20 L28 24" stroke="#222" strokeWidth="2" />
            </svg>
            <h3 className="text-lg font-semibold text-black mb-2 text-center">Sua Plataforma para Projetos Integradores</h3>
            <p className="text-black/70 font-light text-center">
              Centralize a organização, o controle e o acesso a todos os detalhes de cursos, projetos e estandes.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center border border-[#e6f5f2] transition-shadow hover:shadow-lg">
            <svg width="40" height="40" fill="none" stroke="#222" strokeWidth="2" className="mb-4">
              <rect x="8" y="14" width="24" height="12" rx="6" stroke="#2b4e4b" strokeWidth="2" fill="none" />
              <path d="M14 20 L20 26 L26 20" stroke="#222" strokeWidth="2" />
            </svg>
            <h3 className="text-lg font-semibold text-black mb-2 text-center">Colaboração Simplificada</h3>
            <p className="text-black/70 font-light text-center">
              Unifique equipes e projetos em um só lugar, promovendo comunicação e resultados.
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-[#223c3a] py-8 px-4 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-lg">GestãoComExelência</span>
          </div>
          <nav className="flex gap-6">
            <a href="/privacidade" className="text-gray-200 hover:text-white text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="/termos" className="text-gray-200 hover:text-white text-sm transition-colors">
              Termos de Uso
            </a>
            <a href="/contato" className="text-gray-200 hover:text-white text-sm transition-colors">
              Contato
            </a>
          </nav>
          <div className="flex gap-3">
            <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-white">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="6" width="4" height="12" rx="1" />
                <circle cx="4" cy="4" r="2" />
                <rect x="8" y="10" width="4" height="8" rx="1" />
                <path d="M12 10c0-2 4-2 4 0v8" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="text-gray-300 hover:text-white">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="10" cy="10" r="8" />
                <path d="M6 14c1.5-1 6.5-1 8 0" />
                <path d="M8 12c0-1 4-1 4 0" />
              </svg>
            </a>
          </div>
        </div>
        <div className="text-center text-gray-400 text-xs mt-4">
          © {new Date().getFullYear()} GestãoComExelência. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
