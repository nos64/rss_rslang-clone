/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { action, makeAutoObservable, reaction } from 'mobx';
import {
  getUserWords,
  getWords,
  getWordById,
  sendUserWord,
  deleteUserWord,
  updateUserWord,
} from '../api/textbook';
import { DifficultyType, WordInterface } from '../types/common';
import store from './index';
import useSetUserStats from '../hooks/useSetUserStats';

class TextBookStore {
  isLoading = false;

  fromTextbook = false;

  userId?: string;

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

    reaction(
      () => store.userId,
      (userId) => {
        this.userId = userId as Readonly<string>;
        this.fetchUserWords();
      }
    );
  }

  setIsLoading = action((val: boolean) => {
    this.isLoading = val;
  });

  setFromTextbook = action(() => {
    this.fromTextbook = !this.fromTextbook;
  });

  fetchWords = () => {
    this.setIsLoading(true);
    action(async () => {
      this.words = (await getWords(this.currentPage, this.currentGroup)).data;
    })();
    this.setIsLoading(false);
  };

  fetchUserWords = action(async () => {
    if (this.userId) {
      this.setIsLoading(true);
      const words = (await getUserWords(this.userId)).data;

      const requests = words.map((word) => getWordById(word.wordId));
      const responses = await axios.all(requests).then((res) => res.map((r) => r.data));

      this.difficultWords.clear();
      this.learnedWords.clear();

      for (let i = 0; i < responses.length; i += 1) {
        if (words[i].difficulty === 'difficult') {
          action(() => this.difficultWords.add(responses[i]))();
        } else if (words[i].difficulty === 'learned') {
          action(() => this.learnedWords.add(responses[i]))();
        } else if (words[i].difficulty === 'difficult & learned') {
          action(() => this.difficultWords.add(responses[i]))();
          action(() => this.learnedWords.add(responses[i]))();
        }
      }
      this.setIsLoading(false);
    }
  });

  setCurrentPage = action((page: number) => {
    this.currentPage = page;
    this.fetchWords();
  });

  setCurrentGroup = action((group: number) => {
    this.currentGroup = group;
    this.fetchWords();
  });

  isDifficult = (word: WordInterface) => {
    return !!Array.from(this.difficultWords).filter((card) => card.id === word.id).length;
  };

  isLearned = (word: WordInterface) => {
    return !!Array.from(this.learnedWords).filter((card) => card.id === word.id).length;
  };

  setDifficultWord = async (word: WordInterface) => {
    if (this.userId && !this.isDifficult(word)) {
      this.difficultWords.add(word);

      if (this.isLearned(word)) {
        await updateUserWord(this.userId, word.id, { difficulty: 'difficult & learned' });
      } else {
        await this.sendUserWord(word.id, 'difficult');
      }
      await this.fetchUserWords();
    }
  };

  deleteDifficultWord = async (word: WordInterface) => {
    if (this.userId) {
      this.difficultWords.delete(word);

      if (this.isLearned(word)) {
        await updateUserWord(this.userId, word.id, { difficulty: 'learned' });
      } else {
        await deleteUserWord(this.userId, word.id);
      }
      await this.fetchUserWords();
    }
  };

  setLearnedWord = async (word: WordInterface) => {
    if (this.userId) {
      this.learnedWords.add(word);

      if (this.isDifficult(word)) {
        this.deleteDifficultWord(word);
      }

      await this.sendUserWord(word.id, 'learned');
      await this.fetchUserWords();
      useSetUserStats(this.userId, 'words', 1);
    }
  };

  deleteLearnedWord = async (word: WordInterface) => {
    if (this.userId) {
      if (this.isDifficult(word)) {
        await updateUserWord(this.userId, word.id, { difficulty: 'difficult' });
      } else {
        await deleteUserWord(this.userId, word.id);
      }
      action(() => this.learnedWords.delete(word))();
      await this.fetchUserWords();
    }
  };

  sendUserWord = async (wordId: string, difficulty: DifficultyType) => {
    if (this.userId) {
      await sendUserWord(this.userId, wordId, { difficulty });
    }
  };
}

const textbookStore = new TextBookStore();
export default textbookStore;
