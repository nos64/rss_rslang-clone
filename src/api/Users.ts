import { AxiosResponse } from 'axios';
import $api from '../axios';
import { UserStatsRequestInterface, UserInterface } from '../types/common';

export function getStats(userId: string): Promise<AxiosResponse<UserStatsRequestInterface>> {
  return $api.get(`/users/${userId}/statistics`);
}

export function setStats(userId: string, stats: UserStatsRequestInterface) {
  return $api.put(`/users/${userId}/statistics`, stats);
}

export function getUserInfo(userId: string): Promise<AxiosResponse<UserInterface>> {
  return $api.get(`/users/${userId}`);
}

export function setUserInfo(
  userId: string,
  user: {
    name: string;
    email: string;
    password?: string;
  }
): Promise<AxiosResponse<UserInterface>> {
  return $api.put(`/users/${userId}`, user);
}
