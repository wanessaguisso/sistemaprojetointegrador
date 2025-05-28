'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui/elements';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Courses() {
  const router = useRouter();
  const [courses, setCourses] = useLocalStorage('courses', []);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
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
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      ...formData,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    setCourses([...courses, newCourse]);
    setIsAddingCourse(false);
    setFormData({
      name: '',
      description: '',
      duration: '',
      instructor: '',
    });
  };

  const handleDelete = (courseId) => {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gerenciamento de Cursos
          </h1>
          <Button onClick={() => router.push('/dashboard')}>
            Voltar ao Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button onClick={() => setIsAddingCourse(!isAddingCourse)}>
            {isAddingCourse ? 'Cancelar' : 'Adicionar Novo Curso'}
          </Button>
        </div>

        {isAddingCourse && (
          <Card className="mb-8">
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
              <Button type="submit">Salvar Curso</Button>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{course.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{course.duration}h</span>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="secondary" 
                    onClick={() => router.push(`/dashboard/courses/${course.id}`)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(course.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
