import { WordInterface } from '../../types/common';

/** Перемешать массив с ответами */
// export const shuffle = (array: WordInterface[]) => {
//   const newArray = [...array];
//   for (let i = newArray.length - 1; i > 0; i -= 1) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//   }
//   return newArray;
// };
export const shuffle = (arr: WordInterface[]) => arr.sort(() => Math.random() - 0.6);

/** Получить рандомную страницу при выборе сложности */
export const getRandomPage = () => Math.floor(Math.random() * 30);

export const getRandomTranslate = (allWords: string[]) =>
  allWords[Math.floor(Math.random() * allWords.length)];
