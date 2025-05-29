'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, FormError, FormSuccess } from '@/components/ui/elements';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Stands() {
  const router = useRouter();
  const [stands, setStands] = useLocalStorage('stands', []);
  const [projects] = useLocalStorage('projects', []);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingStand, setIsAddingStand] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    resources: '',
    projectId: '',
    availability: 'disponivel'
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
      
      const newStand = {
        id: Date.now(),
        ...formData,
        capacity: Number(formData.capacity),
        resources: formData.resources.split(',').map(r => r.trim()),
        createdBy: currentUser.id,
        createdAt: new Date().toISOString(),
      };

      setStands([...stands, newStand]);
      setIsAddingStand(false);
      setFormData({
        name: '',
        location: '',
        capacity: '',
        resources: '',
        projectId: '',
        availability: 'disponivel'
      });
      setSuccessMessage('Estande criado com sucesso!');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Erro ao criar estande. Tente novamente.' });
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
      setStands(stands.filter(stand => stand.id !== id));
      setSuccessMessage('Estande excluído com sucesso!');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Erro ao excluir estande. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
      setDeleteConfirmation(null);
    }
  };

  const getAvailabilityBadgeColor = (availability) => {
    switch (availability) {
      case 'disponivel':
        return 'bg-green-100 text-green-700';
      case 'ocupado':
        return 'bg-red-100 text-red-700';
      case 'manutencao':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
            Gerenciamento de Estandes
          </h1>
          <Button onClick={() => router.push('/dashboard')}>
            Voltar ao Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button onClick={() => setIsAddingStand(!isAddingStand)}>
            {isAddingStand ? 'Cancelar' : 'Adicionar Novo Estande'}
          </Button>
        </div>

        {successMessage && <FormSuccess message={successMessage} />}
        {errors.submit && <FormError message={errors.submit} />}

        {isAddingStand && (
          <Card className="mb-8 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Nome do Estande"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Localização"
                name="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
              <Input
                label="Capacidade (pessoas)"
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
              <Input
                label="Recursos Disponíveis (separados por vírgula)"
                name="resources"
                value={formData.resources}
                onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
                required
              />
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Status do Estande
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="disponivel">Disponível</option>
                  <option value="ocupado">Ocupado</option>
                  <option value="manutencao">Em Manutenção</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Projeto Associado
                </label>
                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione um projeto</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit">Salvar Estande</Button>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stands.map((stand) => (
            <Card key={stand.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-800">{stand.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityBadgeColor(stand.availability)}`}>
                    {stand.availability.charAt(0).toUpperCase() + stand.availability.slice(1)}
                  </span>
                </div>
                <div className="text-gray-600">
                  <p><strong>Localização:</strong> {stand.location}</p>
                  <p><strong>Capacidade:</strong> {stand.capacity} pessoas</p>
                  <p><strong>Recursos:</strong> {stand.resources.join(', ')}</p>
                  {stand.projectId && (
                    <p><strong>Projeto:</strong> {projects.find(p => p.id === Number(stand.projectId))?.name || 'N/A'}</p>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="secondary" 
                    onClick={() => router.push(`/dashboard/stands/${stand.id}`)}
                    disabled={isSubmitting}
                  >
                    Editar
                  </Button>
                  {deleteConfirmation === stand.id ? (
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
                        onClick={() => confirmDelete(stand.id)}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Excluindo...' : 'Confirmar'}
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="danger" 
                      onClick={() => handleDelete(stand.id)}
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
