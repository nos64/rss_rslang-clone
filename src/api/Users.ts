import { AxiosResponse } from 'axios';
import $api from '../axios';
import { UserStatsRequestInterface } from '../types/common';

export function getStats(userId: string): Promise<AxiosResponse<UserStatsRequestInterface>> {
  return $api.get(`/users/${userId}/statistics`);
}

export function setStats(userId: string, stats: UserStatsRequestInterface) {
  return $api.put(`/users/${userId}/statistics`, stats);
}
