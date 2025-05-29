'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, FormError, FormSuccess } from '@/components/ui/elements';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Courses() {
  const router = useRouter();
  const [courses, setCourses] = useLocalStorage('courses', []);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    instructor: '',
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Nome do curso é obrigatório';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Nome do curso deve ter pelo menos 3 caracteres';
    }
    
    if (!formData.description) {
      newErrors.description = 'Descrição é obrigatória';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Descrição deve ter pelo menos 10 caracteres';
    }
    
    if (!formData.duration) {
      newErrors.duration = 'Duração é obrigatória';
    } else if (Number(formData.duration) <= 0) {
      newErrors.duration = 'Duração deve ser maior que zero';
    }
    
    if (!formData.instructor) {
      newErrors.instructor = 'Nome do instrutor é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
      setSuccessMessage('Curso criado com sucesso!');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Erro ao criar curso. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro do campo quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
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
      setCourses(courses.filter(course => course.id !== id));
      setSuccessMessage('Curso excluído com sucesso!');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Erro ao excluir curso. Tente novamente.' });
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

        {successMessage && <FormSuccess message={successMessage} />}
        {errors.submit && <FormError message={errors.submit} />}

        {isAddingCourse && (
          <Card className="mb-8 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Nome do Curso"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              <Input
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                required
              />
              <Input
                label="Duração (em horas)"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                error={errors.duration}
                required
              />
              <Input
                label="Instrutor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                error={errors.instructor}
                required
              />
              <Button type="submit" loading={isSubmitting}>
                Salvar Curso
              </Button>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
                <p className="text-gray-600">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{course.duration}h</span>
                  <span>{course.instructor}</span>
                </div>
                {deleteConfirmation === course.id ? (
                  <div className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="secondary" 
                      onClick={() => setDeleteConfirmation(null)}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => confirmDelete(course.id)}
                      loading={isSubmitting}
                    >
                      Confirmar
                    </Button>
                  </div>
                ) : (
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
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
