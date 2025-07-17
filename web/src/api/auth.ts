import { useMutation } from '@tanstack/react-query';
import type { LoginInput, AuthResponse, RegisterInput } from '../types/index';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/auth';

export const loginUser = async (credentials: LoginInput): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const registerUser = async (data: RegisterInput): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const useLoginMutation = () =>
  useMutation({ mutationFn: loginUser });

export const useRegisterMutation = () =>
  useMutation({ mutationFn: registerUser });
