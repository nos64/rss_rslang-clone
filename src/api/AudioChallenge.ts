import axios from 'axios';
import { WordInterface } from '../types/common';
import $api from '../axios/index';

const getWords = (group: number, page: number): Promise<WordInterface[]> =>
  $api.get(`/words?group=${group}&page=${page}`).then((res) => res.data);
export default getWords;

// export const getGroupWords = (group: number): Promise<WordInterface[]> => {
//   const endpoints: string[] = [];
//   for (let i = 0; i <= 29; i += 1) {
//     endpoints.push(`/words?group=${group}&page=${i}`);
//   }
//   return axios.all(
//     endpoints.map((endpoint) => axiosInstance.get(endpoint).then((res) => res.data))
//   );
// };

export const getGroupWords = (group: number): Promise<string[]> => {
  const endpoints: string[] = [];
  for (let i = 0; i <= 29; i += 1) {
    endpoints.push(`/words?group=${group}&page=${i}`);
  }
  return axios
    .all(
      endpoints.map((endpoint) =>
        $api
          .get(endpoint)
          .then((res) => res.data)
          .then((res) => res.map((item: { wordTranslate: string[] }) => item.wordTranslate))
      )
    )
    .then((res) => res.flat());
};
