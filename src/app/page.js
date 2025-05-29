import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <main className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-700 dark:text-blue-400">
          Bem-vindo ao Sistema de Gerenciamento
        </h1>
        <p className="text-xl mb-8 text-gray-700 dark:text-gray-200">
          Gerencie cursos, projetos e estandes de forma simples, rápida e eficiente.<br />
          Este sistema foi desenvolvido para facilitar o controle e a organização das suas atividades acadêmicas e profissionais.
        </p>
        <div className="mb-12 flex justify-center">
          <Image
            src="/presentation.svg"
            alt="Apresentação do Sistema"
            width={320}
            height={200}
            className="mx-auto"
            priority
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">O que você pode fazer?</h2>
            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-200">
              <li>• Cadastrar e gerenciar cursos</li>
              <li>• Organizar projetos e equipes</li>
              <li>• Acompanhar estandes e apresentações</li>
              <li>• Visualizar relatórios e estatísticas</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">Por que usar?</h2>
            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-200">
              <li>• Interface intuitiva e responsiva</li>
              <li>• Segurança e confiabilidade</li>
              <li>• Suporte ao modo escuro</li>
              <li>• Otimizado para SEO</li>
            </ul>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Entrar
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
        <p>
          &copy; {new Date().getFullYear()} Sistema de Gerenciamento — Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
