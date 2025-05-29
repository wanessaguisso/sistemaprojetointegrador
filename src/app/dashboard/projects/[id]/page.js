'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui/elements';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function EditProject({ params }) {
  const router = useRouter();
  const [projects, setProjects] = useLocalStorage('projects', []);
  const [courses] = useLocalStorage('courses', []);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    courseId: '',
    students: '',
    status: ''
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
    } else {
      setCurrentUser(JSON.parse(user));
      const project = projects.find(p => p.id === Number(params.id));
      if (project) {
        setFormData({
          ...project,
          students: project.students.join(', ')
        });
      }
    }
  }, [router, projects, params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProjects = projects.map(project => 
      project.id === Number(params.id) ? {
        ...project,
        ...formData,
        students: formData.students.split(',').map(s => s.trim())
      } : project
    );
    setProjects(updatedProjects);
    router.push('/dashboard/projects');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(160,40%,98%)] to-[hsl(100,10%,99%)]">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Editar Projeto
          </h1>
          <Button onClick={() => router.push('/dashboard/projects')}>
            Voltar para Projetos
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nome do Projeto"
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
            <div>
              <label className="text-sm font-medium text-gray-700">
                Curso Associado
              </label>
              <select
                name="courseId"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecione um curso</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Alunos (separados por vírgula)"
              name="students"
              value={formData.students}
              onChange={(e) => setFormData({ ...formData, students: e.target.value })}
              required
            />
            <div>
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="em_andamento">Em Andamento</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <div className="flex gap-4 justify-end">
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => router.push('/dashboard/projects')}
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
