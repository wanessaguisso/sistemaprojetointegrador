import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <main className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Sistema de Gerenciamento
        </h1>

        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          Um projeto moderno construído com Next.js, React e Tailwind CSS
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Tecnologias</h2>
            <ul className="text-left space-y-2">
              <li>✨ Next.js 13+ com App Router</li>
              <li>⚛️ React para UI</li>
              <li>🎨 Tailwind CSS</li>
              <li>📝 ESLint</li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Recursos</h2>
            <ul className="text-left space-y-2">
              <li>🚀 Rápido e Otimizado</li>
              <li>📱 Design Responsivo</li>
              <li>🌙 Modo Escuro</li>
              <li>🔍 SEO Otimizado</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Entrar no Sistema
          </a>
          <a
            href="/register"
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
          >
            Criar Conta
          </a>
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
        <p>Sistema de Gerenciamento de Cursos, Projetos e Estandes</p>
      </footer>
    </div>
  );
}
