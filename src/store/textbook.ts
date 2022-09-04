/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { action, makeAutoObservable, reaction } from 'mobx';
import { getUserWords, getWords, getWordById, sendUserWord } from '../api/textbook';
import { DifficultyType, WordInterface } from '../types/common';
import store from './index';

class TextBookStore {
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

  setFromTextbook = action(() => {
    this.fromTextbook = !this.fromTextbook;
  });

  fetchWords = () => {
    action(async () => {
      this.words = (await getWords(this.currentPage, this.currentGroup)).data;
    })();
  };

  private fetchWord = async (wordId: string) => {
    const word = (await getWordById(wordId)).data;
    return word;
  };

  fetchUserWords = action(async () => {
    if (this.userId) {
      const words = (await getUserWords(this.userId)).data;

      const requests = words.map((word) => getWordById(word.wordId));
      const responses = await axios.all(requests).then((res) => res.map((r) => r.data));

      for (let i = 0; i < responses.length; i += 1) {
        if (words[i].difficulty === 'difficult') {
          action(() => this.difficultWords.add(responses[i]))();
        } else if (words[i].difficulty === 'learned') {
          action(() => this.learnedWords.add(responses[i]))();
        }
      }
    }
  });

  setCurrentPage = (page: number) => {
    this.currentPage = page;
    this.fetchWords();
  };

  setCurrentGroup = (group: number) => {
    this.currentGroup = group;
    this.fetchWords();
  };

  setDifficultWord = async (word: WordInterface) => {
    this.difficultWords.add(word);
    await this.sendUserWord(word.id, 'difficult');
    await this.fetchUserWords();
  };

  deleteDifficultWord = async (word: WordInterface) => {
    this.difficultWords.delete(word);
  };

  setLearnedWord = async (word: WordInterface) => {
    this.learnedWords.add(word);
    await this.sendUserWord(word.id, 'learned');
    await this.fetchUserWords();
  };

  sendUserWord = async (wordId: string, difficulty: DifficultyType) => {
    if (this.userId) {
      await sendUserWord(this.userId, wordId, { difficulty });
    }
  };
}

const textbookStore = new TextBookStore();
export default textbookStore;
