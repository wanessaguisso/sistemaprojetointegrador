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
    projectId: '',
    availability: ''
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
    } else {
      setCurrentUser(JSON.parse(user));
      const stand = stands.find(s => s.id === Number(params.id));
      if (stand) {
        setFormData({
          ...stand,
          resources: stand.resources.join(', ')
        });
      }
    }
  }, [router, stands, params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStands = stands.map(stand => 
      stand.id === Number(params.id) ? {
        ...stand,
        ...formData,
        capacity: Number(formData.capacity),
        resources: formData.resources.split(',').map(r => r.trim())
      } : stand
    );
    setStands(updatedStands);
    router.push('/dashboard/stands');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(160,40%,98%)] to-[hsl(100,10%,99%)]">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Editar Estande
          </h1>
          <Button onClick={() => router.push('/dashboard/stands')}>
            Voltar para Estandes
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
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
