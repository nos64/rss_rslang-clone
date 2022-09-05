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
  password?: string;
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

export interface UserStatsGameInterface {
  newWords: number;
  accuracy: number;
  seriesCorrectAnswers: number;
  date: string;
}
export interface UserStatsRequestOptionalInterface {
  learnedWordsPerDay: { [index: string]: number };
  audioChallenge: UserStatsGameInterface;
  sprint: UserStatsGameInterface;
}
export interface UserStatsRequestInterface {
  learnedWords: number;
  optional: UserStatsRequestOptionalInterface;
}
export type UserStatsLearnedWordsGraph = Array<{ name: string; 'Кол-во слов': number }>;
export interface UserStatsForLayoutInterface {
  summary: {
    learnedWords: number;
    newWords: number;
    accuracy: number;
  };
  games: {
    sprint: UserStatsGameInterface;
    audioChallenge: UserStatsGameInterface;
  };
  graph: {
    learnedWordsPerDay: UserStatsLearnedWordsGraph;
    increasedLEarnedWordsPerDay: UserStatsLearnedWordsGraph;
  };
}

export interface RoutesPageInterface {
  text: string;
  link: string;
  isAuth: boolean;
  icon: string;
  footerHide: boolean;
}
