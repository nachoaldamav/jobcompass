import { HomeCard } from '@/components/HomeCard';
import { ArrowDownCircleSolid } from '@graywolfai/react-heroicons';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center z-50 w-full -mt-10">
      <main className="flex flex-col items-center justify-center flex-1 relative min-h-screen w-4/6">
        <div className="flex flex-col items-start justify-start w-full h-full">
          <h1 className="text-6xl font-bold text-left">JobCompass</h1>
          <p className="text-2xl text-left mt-10">
            La herramienta que te ayuda a aplicar a ofertas de trabajo
            <br />
            de forma organizada y eficiente.
          </p>
        </div>
        <span className="absolute bottom-0 mb-8 flex flex-col justify-center items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Desplázate hacia abajo
          </span>
          <ArrowDownCircleSolid className="w-8 h-8 text-gray-500 dark:text-gray-400" />
        </span>
      </main>
      <section className="flex flex-col items-center justify-start min-h-screen mt-16 w-4/6 h-full z-50">
        <h2 className="text-3xl font-bold text-center">¿Cómo funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8 px-10">
          <HomeCard
            number={1}
            title="Inicia sesión con InfoJobs"
            description="Inicia sesión con tu cuenta de InfoJobs y comienza a explorar las ofertas de empleo."
          />
          <HomeCard
            number={2}
            title="Instala la extensión"
            description="Instala la extensión en tu navegador y vincúlala a tu cuenta."
          />
          <HomeCard
            number={3}
            title="Busca y guarda"
            description="Busca ofertas de trabajo y utiliza la extensión para guardarlas."
          />
          <HomeCard
            number={4}
            title="Organiza tus aplicaciones"
            description="Utiliza el panel de control para organizar tus solicitudes y hacer seguimiento de tu progreso."
          />
        </div>
        {/* Banner para instalar la extensión */}
        <div className="flex flex-col items-center justify-center w-full mt-40 relative">
          <div
            className="absolute top-[50px] -left-[50px] opacity-75 homeGradientA homeGradientB"
            style={{
              width: '500px',
              height: '450px',
              borderRadius: '100%',
            }}
          />
          <article className="w-full h-96 bg-[#141521]/50 border border-[#7fcef3]/10 rounded-lg p-10 backdrop-filter backdrop-blur-[2px] bg-opacity-25 flex flex-row gap-10">
            <img
              src="/extension.png"
              alt="Extension"
              className="w-auto h-full rounded-t-lg"
            />

            <header className="flex flex-col items-start justify-start gap-4">
              <h3 className="text-2xl font-bold text-left mt-2 text-[#7fcef3]">
                ¡Instala la extensión!
              </h3>
              <p className="text-lg text-left mt-4">
                La extensión de JobCompass te permite guardar ofertas de trabajo
                desde InfoJobs y organizarlas en tu panel de control.
              </p>
              <Link
                href="/extension"
                className="bg-transparent hover:bg-white text-white font-semibold hover:text-gray-900 py-2 px-4 border border-white hover:border-transparent rounded"
              >
                Más información
              </Link>
            </header>
          </article>
        </div>
      </section>
      <footer className="flex flex-col items-center justify-center min-h-[10rem]">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Made with ❤️ by{' '}
          <a
            href="https://github.com/nachoaldama"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400"
          >
            @nachoaldamav
          </a>
        </p>
      </footer>
    </div>
  );
}
