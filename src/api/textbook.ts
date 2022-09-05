import axios, { AxiosResponse } from 'axios';
import $api from '../axios';
import { WordInterface, UserWordInterface } from '../types/common';

export const getWords = (page: number, group: number): Promise<AxiosResponse<WordInterface[]>> => {
  return $api.get(`/words?page=${page}&group=${group}`);
};

export const getWordsById = async (ids: string[]) => {
  const urls = ids.map((id) => `/words/${id}`);
  const res = await axios.all(urls.map((url) => $api.get(url)));
  return res.map((r) => r.data);
};

export const getWordById = (id: string): Promise<AxiosResponse<WordInterface>> => {
  return $api.get(`/words/${id}`);
};

export const getUserWords = (userId: string): Promise<AxiosResponse<UserWordInterface[]>> => {
  return $api.get(`/users/${userId}/words`);
};

export const getUserWord = (
  userId: string,
  wordId: UserWordInterface
): Promise<AxiosResponse<UserWordInterface>> => {
  return $api.get(`/users/${userId}/words/${wordId}`);
};

export const sendUserWord = (
  userId: string,
  wordId: string,
  data: Pick<UserWordInterface, 'difficulty'>
): Promise<AxiosResponse<UserWordInterface>> => {
  return $api.post(`/users/${userId}/words/${wordId}`, data);
};

export const updateUserWord = (
  userId: string,
  wordId: string
): Promise<AxiosResponse<UserWordInterface>> => {
  return $api.put(`/users/${userId}/words/${wordId}`);
};

export const deleteUserWord = (
  userId: string,
  wordId: string
): Promise<AxiosResponse<UserWordInterface>> => {
  return $api.delete(`/users/${userId}/words/${wordId}`);
};
