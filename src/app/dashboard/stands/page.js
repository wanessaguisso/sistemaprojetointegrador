'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui/elements';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Stands() {
  const router = useRouter();
  const [stands, setStands] = useLocalStorage('stands', []);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAddingStand, setIsAddingStand] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    resources: '',
    availability: 'disponivel',
    projectId: '',
  });

  // Carregar projetos para associação
  const [projects] = useLocalStorage('projects', []);

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
    const newStand = {
      id: Date.now(),
      ...formData,
      resources: formData.resources.split(',').map(r => r.trim()),
      capacity: parseInt(formData.capacity),
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
      availability: 'disponivel',
      projectId: '',
    });
  };

  const handleDelete = (standId) => {
    if (confirm('Tem certeza que deseja excluir este estande?')) {
      setStands(stands.filter(stand => stand.id !== standId));
    }
  };

  const getAvailabilityBadgeColor = (availability) => {
    const colors = {
      disponivel: 'bg-green-100 text-green-800',
      ocupado: 'bg-red-100 text-red-800',
      manutencao: 'bg-yellow-100 text-yellow-800',
    };
    return colors[availability] || colors.disponivel;
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
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

        {isAddingStand && (
          <Card className="mb-8">
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
              <Button type="submit">Salvar Estande</Button>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stands.map((stand) => (
            <Card key={stand.id}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{stand.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityBadgeColor(stand.availability)}`}>
                    {stand.availability.charAt(0).toUpperCase() + stand.availability.slice(1)}
                  </span>
                </div>
                <div className="text-gray-600 dark:text-gray-300">
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
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(stand.id)}
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
