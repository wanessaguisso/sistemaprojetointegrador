'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui/elements';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Login() {
  const router = useRouter();
  const [users, setUsers] = useLocalStorage('users', []);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      // Salvar usuário atual
      localStorage.setItem('currentUser', JSON.stringify(user));
      router.push('/dashboard');
    } else {
      setError('Email ou senha inválidos');
    }
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
            Login
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button type="submit" className="w-full">
            Entrar
          </Button>

          <p className="text-center text-sm">
            Não tem uma conta?{' '}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Registre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
