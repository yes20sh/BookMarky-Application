import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import type { RegisterInput } from '../types/index';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const { setUser } = useAuth();

  const [form, setForm] = useState<RegisterInput>({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string>('');

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setForm({ username: '', password: '' });
    },
    onError: (err: Error) => {
      setError(err.message || 'Registration failed. Try a different username.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    mutation.mutate(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
   className="bg-zinc-900 text-zinc-100 p-8 rounded-2xl shadow-lg max-w-md w-full mx-auto mt-20 space-y-6 border border-zinc-800"
    >
      <h2 className="text-2xl font-bold text-center">Create an Account</h2>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-zinc-300 mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Choose a username"
          value={form.username}
          onChange={handleChange}
          className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          aria-label="Username"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
          className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          aria-label="Password"
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          mutation.isPending
            ? 'bg-blue-500/60 text-white cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {mutation.isPending ? 'Registering...' : 'Register'}
      </button>

      <p className="text-sm text-zinc-400 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:text-blue-400 font-medium">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
