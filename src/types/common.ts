export interface WordInterface {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface UserInterface {
  name: string;
  email: string;
  password: string;
}

export interface AuthInterface {
  message: 'string';
  token: 'string';
  refreshToken: 'string';
  userId: 'string';
  name: 'string';
}

export interface TokensInterface {
  token: 'string';
  refreshToken: 'string';
}

export interface UserWordInterface {
  difficulty: string;
  optional?: Record<string, unknown>;
}

export const baseURL = 'http://localhost:27017';
