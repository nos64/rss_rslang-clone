import { makeAutoObservable } from 'mobx';
import { getWords } from '../api/textbook';
import { WordInterface } from '../types/common';

class TextBookStore {
  words: WordInterface[] = [];

  currentPage = 0;

  currentGroup = 0;

  difficultWords: Set<WordInterface> = new Set();

  learnedWords: Set<WordInterface> = new Set();

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );
    this.fetchWords();
  }

  fetchWords = async () => {
    this.words = await (await getWords(this.currentPage, this.currentGroup)).data;
  };

  setCurrentPage = (page: number) => {
    this.currentPage = page;
    this.fetchWords();
  };

  setCurrentGroup = (group: number) => {
    this.currentGroup = group;
    this.fetchWords();
  };

  setDifficultWord = (word: WordInterface) => {
    this.difficultWords.add(word);
  };

  setLearnedWord = (word: WordInterface) => {
    this.learnedWords.add(word);
  };
}

const textbookStore = new TextBookStore();
export default textbookStore;
