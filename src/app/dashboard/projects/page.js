'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, FormError, FormSuccess } from '@/components/ui/elements';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useLocalStorage('projects', []);
  const [courses] = useLocalStorage('courses', []);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    courseId: '',
    students: '',
    status: 'em_andamento',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
    } else {
      setCurrentUser(JSON.parse(user));
      setIsLoading(false);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
      setSuccessMessage('Projeto criado com sucesso!');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Erro ao criar projeto. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteConfirmation(id);
  };

  const confirmDelete = async (id) => {
    setIsSubmitting(true);
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProjects(projects.filter(project => project.id !== id));
      setSuccessMessage('Projeto excluído com sucesso!');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Erro ao excluir projeto. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
      setDeleteConfirmation(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(160,40%,98%)] to-[hsl(100,10%,99%)]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(160,40%,98%)] to-[hsl(100,10%,99%)]">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
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

        {successMessage && <FormSuccess message={successMessage} />}
        {errors.submit && <FormError message={errors.submit} />}

        {isAddingProject && (
          <Card className="mb-8 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
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
              <Button type="submit">Salvar Projeto</Button>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'em_andamento' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'concluido' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {project.status === 'em_andamento' ? 'Em Andamento' :
                     project.status === 'concluido' ? 'Concluído' : 'Cancelado'}
                  </span>
                </div>
                <p className="text-gray-600">{project.description}</p>
                <div className="text-sm text-gray-500">
                  <p>Curso: {courses.find(c => c.id === Number(project.courseId))?.name || 'N/A'}</p>
                  <p>Alunos: {project.students.join(', ')}</p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="secondary" 
                    onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                    disabled={isSubmitting}
                  >
                    Editar
                  </Button>
                  {deleteConfirmation === project.id ? (
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => setDeleteConfirmation(null)}
                        disabled={isSubmitting}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => confirmDelete(project.id)}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Excluindo...' : 'Confirmar'}
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="danger" 
                      onClick={() => handleDelete(project.id)}
                      disabled={isSubmitting}
                    >
                      Excluir
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
