'use client';
import { useRouter } from 'next/navigation';
import { Card, Button } from '@/components/ui/elements';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Dashboard() {
  const router = useRouter();
  const [courses] = useLocalStorage('courses', []);
  const [projects] = useLocalStorage('projects', []);
  const [stands] = useLocalStorage('stands', []);

  return (
    <div className="min-h-full py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Visão Geral
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Cursos */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Cursos</h3>
                <p className="text-3xl font-bold text-emerald-600">{courses.length}</p>
              </div>
            </div>
            <div className="h-px bg-gray-100"></div>
            <Button
              variant="outline"
              className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-medium"
              onClick={() => router.push('/dashboard/courses')}
            >
              Gerenciar Cursos
            </Button>
          </div>
        </Card>

        {/* Card de Projetos */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Projetos</h3>
                <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
              </div>
            </div>
            <div className="h-px bg-gray-100"></div>
            <Button
              variant="outline"
              className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 font-medium"
              onClick={() => router.push('/dashboard/projects')}
            >
              Gerenciar Projetos
            </Button>
          </div>
        </Card>

        {/* Card de Estandes */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Estandes</h3>
                <p className="text-3xl font-bold text-purple-600">{stands.length}</p>
              </div>
            </div>
            <div className="h-px bg-gray-100"></div>
            <Button
              variant="outline"
              className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 font-medium"
              onClick={() => router.push('/dashboard/stands')}
            >
              Gerenciar Estandes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
