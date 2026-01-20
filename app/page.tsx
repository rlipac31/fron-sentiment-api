import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary text-[--color-primary] selection:bg-[--color-three] selection:text-white">
      {/* Navegación Estilo Dashboard */}
      <nav className="flex items-center justify-between px-10 py-5 bg-three shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg  flex items-center justify-center text-white font-bold"></div>
          <span className="text-2xl font-extrabold tracking-tight text-white">SentimentAPI </span>
        </div>
        <Link 
          href="/login" 
          className="px-8 py-2.5 bg-primary/70 text-white hover:bg-primary rounded-xl font-semibold hover:opacity-90 transition-all shadow-md active:scale-95"
        >
          Acceder al Panel
        </Link>
      </nav>

      <main>
        {/* Hero Section: El Speech Vendedor */}
        <section className="max-w-6xl mx-auto px-6 py-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-white uppercase rounded-full bg-[--bg-gradient-dashboard]">
            Impulsado por Inteligencia Artificial
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-2 leading-[1.1] tracking-tight text-accent/70">
            Deja de adivinar. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--color-three] to-[--color-accent]">
              Escucha a tus clientes a escala.
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/80 mb-12 leading-relaxed">
            Las empresas pierden el 40% de sus clientes por no responder a tiempo. 
            <span className="font-bold text-[--color-primary]"> SentimentAPI</span> analiza miles de comentarios en segundos, separando el ruido de las oportunidades reales para que tu equipo actúe donde realmente importa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/login" 
              className="px-10 py-5 bg-accent text-white rounded-2xl font-bold text-lg shadow-2xl hover:bg-accent/80 hover:translate-y-[-2px] transition-all transition-discrete"
            >
              Comenzar a Analizar Gratis
            </Link>
          </div>
        </section>

        {/* Sección del Problema y Solución (Visualmente inspirada en tu Dashboard) */}
        <section className="bg-[--color-primary] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Columna Texto: El Problema */}
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-6 italic">¿El problema? El volumen te está ganando.</h2>
                <div className="space-y-6 text-gray-300 text-lg">
                  <p>
                    Recibir miles de menciones diarias es una señal de éxito, pero procesarlas manualmente es una receta para el 
                    <span className="text-white font-semibold"> desastre operativo</span>.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="text-red-500 font-bold">✕</span> Lenta atención al cliente insatisfecho.
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-red-500 font-bold">✕</span> Pérdida de oportunidades de ventas inmediatas.
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-red-500 font-bold">✕</span> Imposibilidad de medir el éxito de campañas en tiempo real.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Columna Visual: Simulación de tu Dashboard */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[--color-three] to-[--color-accent] rounded-[2rem] blur opacity-30"></div>
                <div className="relative bg-white p-8 rounded-[2rem] shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-gray-100 italic text-gray-500">
                      "No superó mis expectativas..."
                    </div>
                    <div className="flex items-center justify-between p-5 bg-white border-2 border-[--color-five]/20 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">☹️</span>
                        <span className="font-bold text-[--color-five]">NEGATIVO</span>
                      </div>
                      <span className="text-2xl font-black text-[--color-primary]">92.4%</span>
                    </div>
                    <p className="text-center text-xs text-gray-400 font-medium">RESULTADO DEL MODELO SENTIMENTAPI AI</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Cierre de Venta */}
        <section className="py-24 text-center px-6">
          <h3 className="text-3xl font-bold mb-6 text-accent">¿Listo para transformar datos en decisiones?</h3>
          <p className="text-white/80 mb-10 max-w-xl mx-auto">
            Únete a las empresas que ya están automatizando su análisis de reputación con nuestra carga masiva de archivos .CSV.
          </p>
          <Link 
            href="/login" 
            className="px-12 py-4 border-2 border-three text-four rounded-2xl font-black  hover:text-accent transition-all inline-block"
          >
            IR AL DASHBOARD
          </Link>
        </section>
      </main>

      <footer className="py-10 border-t border-gray-200 text-center text-gray-400 text-sm flex flex-col items-center">
        &copy; 2024 SentimentAPI AI - El poder de la comprensión.
        <span className='text-accent font-bold'>Elaborado por el equipo: H12-25-L-Equipo 60</span>
      </footer>
    </div>
  );
}