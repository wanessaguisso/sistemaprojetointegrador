'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui/elements';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function EditCourse({ params }) {
  const router = useRouter();
  const [courses, setCourses] = useLocalStorage('courses', []);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    instructor: '',
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
    } else {
      setCurrentUser(JSON.parse(user));
    }

    // Carregar dados do curso
    const course = courses.find(c => c.id === Number(params.id));
    if (course) {
      setFormData({
        name: course.name,
        description: course.description,
        duration: course.duration,
        instructor: course.instructor,
      });
    } else {
      router.push('/dashboard/courses');
    }
  }, [params.id, courses, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCourses = courses.map(course => {
      if (course.id === Number(params.id)) {
        return {
          ...course,
          ...formData,
          updatedAt: new Date().toISOString(),
        };
      }
      return course;
    });

    setCourses(updatedCourses);
    router.push('/dashboard/courses');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Editar Curso
          </h1>
          <Button onClick={() => router.push('/dashboard/courses')}>
            Voltar para Cursos
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nome do Curso"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <Input
              label="Duração (em horas)"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
            <Input
              label="Instrutor"
              name="instructor"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              required
            />
            
            <div className="flex gap-4 justify-end">
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => router.push('/dashboard/courses')}
              >
                Cancelar
              </Button>
              <Button type="submit">
                Salvar Alterações
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
