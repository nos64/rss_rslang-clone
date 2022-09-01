import { AxiosResponse } from 'axios';
import $api from '../axios';
import { UserInterface, AuthInterface, TokensInterface } from '../types/common';

export async function login(
  email: string,
  password: string
): Promise<AxiosResponse<AuthInterface>> {
  return $api.post<AuthInterface>('/signin', { email, password });
}

export async function registration(
  name: string,
  email: string,
  password: string
): Promise<AxiosResponse<UserInterface>> {
  return $api.post('/users', { name, email, password });
}

export function checkAuth(userId: string): Promise<AxiosResponse<TokensInterface>> {
  return $api.get(`/users/${userId}/tokens`);
}
