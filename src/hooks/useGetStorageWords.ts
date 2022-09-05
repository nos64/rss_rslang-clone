import { WordInStatInterface } from '../types/common';

export default function useGetStorageWords(word: string, userId: string) {
  const wordInLocalStorage = localStorage.getItem(`${userId}${word}`);
  if (wordInLocalStorage) {
    return <WordInStatInterface>JSON.parse(wordInLocalStorage);
  }
  return null;
}
