import { getStats } from '../api/Users';
import { UserStatsRequestInterface } from '../types/common';
import CURRENT_DATE_FOR_STATS from '../variables/common';

const DEFAULT_GAME_STATS = {
  newWords: 0,
  accuracy: 0,
  seriesCorrectAnswers: 0,
  date: CURRENT_DATE_FOR_STATS,
};
const DEFAULT_STATS = {
  learnedWords: 0,
  optional: {
    learnedWordsPerDay: { [`${CURRENT_DATE_FOR_STATS}`]: 0 },
    audioChallenge: { ...DEFAULT_GAME_STATS },
    sprint: { ...DEFAULT_GAME_STATS },
  },
};

function transformStatsRequest(stats?: UserStatsRequestInterface): UserStatsRequestInterface {
  const returnObj = DEFAULT_STATS;

  if (stats) {
    if (stats.optional.audioChallenge.date === CURRENT_DATE_FOR_STATS)
      returnObj.optional.audioChallenge = { ...stats.optional.audioChallenge };

    if (stats.optional.sprint.date === CURRENT_DATE_FOR_STATS)
      returnObj.optional.sprint = { ...stats.optional.sprint };

    returnObj.optional.learnedWordsPerDay = { ...stats.optional.learnedWordsPerDay };
  }

  if (returnObj.optional.learnedWordsPerDay[CURRENT_DATE_FOR_STATS]) {
    returnObj.learnedWords = returnObj.optional.learnedWordsPerDay[CURRENT_DATE_FOR_STATS];
  } else {
    returnObj.optional.learnedWordsPerDay[CURRENT_DATE_FOR_STATS] = 0;
    returnObj.learnedWords = 0;
  }

  return returnObj;
}

export default function useGetUserStats(userId: string): () => Promise<UserStatsRequestInterface> {
  return async (): Promise<UserStatsRequestInterface> => {
    try {
      const response = await getStats(userId);
      return transformStatsRequest(response.data);
    } catch (error) {
      console.log(error, 'getUserStats - store/index.ts');
      return transformStatsRequest();
    }
  };
}
