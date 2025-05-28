'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from '@/components/ui/elements';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Dashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [courses] = useLocalStorage('courses', []);
  const [projects] = useLocalStorage('projects', []);
  const [stands] = useLocalStorage('stands', []);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
    } else {
      setCurrentUser(JSON.parse(user));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-300">
              Olá, {currentUser.name}
            </span>
            <Button variant="secondary" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Cursos">
            <div className="space-y-4">
              <p className="text-2xl font-bold">{courses.length}</p>
              <p className="text-gray-600 dark:text-gray-300">Cursos cadastrados</p>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push('/dashboard/courses')}
              >
                Gerenciar Cursos
              </Button>
            </div>
          </Card>

          <Card title="Projetos">
            <div className="space-y-4">
              <p className="text-2xl font-bold">{projects.length}</p>
              <p className="text-gray-600 dark:text-gray-300">Projetos cadastrados</p>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push('/dashboard/projects')}
              >
                Gerenciar Projetos
              </Button>
            </div>
          </Card>

          <Card title="Estandes">
            <div className="space-y-4">
              <p className="text-2xl font-bold">{stands.length}</p>
              <p className="text-gray-600 dark:text-gray-300">Estandes cadastrados</p>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push('/dashboard/stands')}
              >
                Gerenciar Estandes
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
