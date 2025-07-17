import { useState } from 'react';
import { useLoginMutation } from '../api/auth';
import type { LoginInput } from '../types';
import { Link } from 'react-router-dom';
import { useAuthReducer } from '../hooks/useAuthReducer';

const LoginForm = () => {
  const [form, setForm] = useState<LoginInput>({ username: '', password: '' });
  const { login } = useAuthReducer();
  const { mutate, isPending, error } = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (data) => {
        login(data);
        localStorage.setItem('user', JSON.stringify(data)); // optional
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 text-zinc-100 p-8 rounded-2xl shadow-lg max-w-md w-full mx-auto mt-20 space-y-6 border border-zinc-800"
    >
      <h2 className="text-2xl font-bold text-center">Welcome Back 👋</h2>

      <div>
        <label htmlFor="username" className="block mb-1 text-sm font-medium text-zinc-300">
          Username
        </label>
        <input
          id="username"
          name="username"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange}
          className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 text-sm font-medium text-zinc-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          required
        />
        <div className="mt-2 text-right">
          <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
          isPending
            ? 'bg-blue-500/60 cursor-not-allowed text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isPending ? 'Logging in...' : 'Login'}
      </button>

      {error && (
        <p className="text-red-400 text-sm text-center">Invalid credentials</p>
      )}

      <p className="text-center text-sm text-zinc-400">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:underline font-medium">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
