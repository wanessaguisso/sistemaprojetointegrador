'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui/elements';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useLocalStorage('projects', []);
  const [courses] = useLocalStorage('courses', []);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    courseId: '',
    students: '',
    status: 'em_andamento',
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
    const newProject = {
      id: Date.now(),
      ...formData,
      students: formData.students.split(',').map(s => s.trim()),
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    setProjects([...projects, newProject]);
    setIsAddingProject(false);
    setFormData({
      name: '',
      description: '',
      courseId: '',
      students: '',
      status: 'em_andamento',
    });
  };

  const handleDelete = (projectId) => {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      setProjects(projects.filter(project => project.id !== projectId));
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      em_andamento: 'bg-yellow-100 text-yellow-800',
      concluido: 'bg-green-100 text-green-800',
      cancelado: 'bg-red-100 text-red-800',
    };
    return colors[status] || colors.em_andamento;
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gerenciamento de Projetos
          </h1>
          <Button onClick={() => router.push('/dashboard')}>
            Voltar ao Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button onClick={() => setIsAddingProject(!isAddingProject)}>
            {isAddingProject ? 'Cancelar' : 'Adicionar Novo Projeto'}
          </Button>
        </div>

        {isAddingProject && (
          <Card className="mb-8">
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
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Curso
                </label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <Button type="submit">Salvar Projeto</Button>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>Curso: {courses.find(c => c.id === Number(project.courseId))?.name || 'N/A'}</p>
                  <p>Alunos: {project.students.join(', ')}</p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="secondary" 
                    onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(project.id)}
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
