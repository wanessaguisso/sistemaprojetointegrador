'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui/elements';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Register() {
  const router = useRouter();
  const [users, setUsers] = useLocalStorage('users', []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não conferem');
      return;
    }

    if (users.some(user => user.email === formData.email)) {
      setError('Este email já está cadastrado');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    setUsers([...users, newUser]);
    router.push('/login');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Criar Conta
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirmar Senha"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button type="submit" className="w-full">
            Registrar
          </Button>

          <p className="text-center text-sm">
            Já tem uma conta?{' '}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Faça login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
