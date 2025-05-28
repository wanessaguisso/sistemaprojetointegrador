'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui/elements';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function EditStand({ params }) {
  const router = useRouter();
  const [stands, setStands] = useLocalStorage('stands', []);
  const [projects] = useLocalStorage('projects', []);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    resources: '',
    availability: '',
    projectId: '',
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
    } else {
      setCurrentUser(JSON.parse(user));
    }

    // Carregar dados do estande
    const stand = stands.find(s => s.id === Number(params.id));
    if (stand) {
      setFormData({
        name: stand.name,
        location: stand.location,
        capacity: stand.capacity,
        resources: stand.resources.join(', '),
        availability: stand.availability,
        projectId: stand.projectId || '',
      });
    } else {
      router.push('/dashboard/stands');
    }
  }, [params.id, stands, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStands = stands.map(stand => {
      if (stand.id === Number(params.id)) {
        return {
          ...stand,
          ...formData,
          resources: formData.resources.split(',').map(r => r.trim()),
          capacity: parseInt(formData.capacity),
          updatedAt: new Date().toISOString(),
        };
      }
      return stand;
    });

    setStands(updatedStands);
    router.push('/dashboard/stands');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Editar Estande
          </h1>
          <Button onClick={() => router.push('/dashboard/stands')}>
            Voltar para Estandes
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
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
              placeholder="Ex: Projetor, TV, Mesa, Cadeiras"
              required
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Status de Disponibilidade
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="disponivel">Disponível</option>
                <option value="ocupado">Ocupado</option>
                <option value="manutencao">Em Manutenção</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Projeto Associado
              </label>
              <select
                name="projectId"
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Selecione um projeto</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-4 justify-end">
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => router.push('/dashboard/stands')}
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
