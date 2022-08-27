import $api from '../axios';

export const getWords = async (page: number, group: number) => {
  return $api.get(`/words?page=${page}&group=${group}`);
};

export const getWord = async (id: string) => {
  return $api.get(`/words/${id}`);
};
