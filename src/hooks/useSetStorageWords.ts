import { WordInterface, WordInStatInterface } from '../types/common';
import textbookStore from '../store/textbook';

export default function useSetStorageWords(
  word: WordInterface,
  isCorrect: boolean,
  userId: string
) {
  const wordInLocalStorage = localStorage.getItem(word.word);
  if (wordInLocalStorage) {
    const parseWordStats: WordInStatInterface = JSON.parse(wordInLocalStorage);
    if (isCorrect) {
      parseWordStats.countWin += 1;
    } else {
      parseWordStats.countLose += 1;
    }
    if (parseWordStats.countWin === 3) {
      textbookStore.setLearnedWord(word);
    }
    localStorage.setItem(word.word, JSON.stringify(parseWordStats));
  } else {
    const newWordStats: WordInStatInterface = {
      countWin: isCorrect ? 1 : 0,
      countLose: isCorrect ? 0 : 1,
    };
    localStorage.setItem(`${userId}${word.word}`, JSON.stringify(newWordStats));
  }
}
