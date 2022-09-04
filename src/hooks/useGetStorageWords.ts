import { WordInStatInterface } from '../types/common';

export default function useGetStorageWords(word: string) {
  const wordInLocalStorage = localStorage.getItem(word);
  if (wordInLocalStorage) {
    return <WordInStatInterface>JSON.parse(wordInLocalStorage);
  }
  return null;
}
