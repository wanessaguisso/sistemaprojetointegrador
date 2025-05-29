'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, FormError, FormSuccess } from '@/components/ui/elements';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function EditCourse({ params }) {
  const router = useRouter();
  const [courses, setCourses] = useLocalStorage('courses', []);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    instructor: ''
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
    } else {
      setCurrentUser(JSON.parse(user));
      const course = courses.find(c => c.id === Number(params.id));
      if (course) {
        setFormData(course);
      }
      setIsLoading(false);
    }
  }, [router, courses, params.id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Nome do curso é obrigatório';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'Duração deve ser maior que zero';
    }
    if (!formData.instructor.trim()) {
      newErrors.instructor = 'Instrutor é obrigatório';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrors({});

    try {
      const updatedCourses = courses.map(course => 
        course.id === Number(params.id) ? { ...course, ...formData } : course
      );
      setCourses(updatedCourses);
      setSuccessMessage('Curso atualizado com sucesso!');
      setTimeout(() => {
        router.push('/dashboard/courses');
      }, 1500);
    } catch (error) {
      setErrors({ submit: 'Erro ao atualizar o curso. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) return null;
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(160,40%,98%)] to-[hsl(100,10%,99%)]">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Editar Curso
          </h1>
          <Button 
            onClick={() => router.push('/dashboard/courses')}
            disabled={isSubmitting}
          >
            Voltar para Cursos
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {successMessage && (
              <FormSuccess message={successMessage} />
            )}
            {errors.submit && (
              <FormError message={errors.submit} />
            )}
            <Input
              label="Nome do Curso"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              required
              disabled={isSubmitting}
            />
            <Input
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              error={errors.description}
              required
              disabled={isSubmitting}
            />
            <Input
              label="Duração (em horas)"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              error={errors.duration}
              required
              disabled={isSubmitting}
            />
            <Input
              label="Instrutor"
              name="instructor"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              error={errors.instructor}
              required
              disabled={isSubmitting}
            />
            <div className="flex gap-4 justify-end">
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => router.push('/dashboard/courses')}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
