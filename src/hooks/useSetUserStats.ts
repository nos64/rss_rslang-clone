import { setStats } from '../api/Users';
import useGetUserStats from './useGetUserStats';
import CURRENT_DATE_FOR_STATS from '../variables/common';
import { UserStatsGameInterface } from '../types/common';

export default function useSetUserStats(
  userId: string,
  operation: 'words' | 'sprint' | 'audioChallenge',
  value: number | UserStatsGameInterface
): void {
  useGetUserStats(userId)().then((resolve) => {
    const stats = resolve;
    switch (operation) {
      case 'words':
        if (typeof value === 'number') {
          stats.learnedWords += value;
          stats.optional.learnedWordsPerDay[CURRENT_DATE_FOR_STATS] += value;
        }
        break;
      case 'sprint':
        if (typeof value !== 'number') {
          stats.optional.sprint.newWords += value.newWords;
          stats.optional.sprint.accuracy += value.accuracy;
          stats.optional.sprint.seriesCorrectAnswers += value.seriesCorrectAnswers;
          stats.optional.sprint.date = CURRENT_DATE_FOR_STATS;
        }
        break;
      case 'audioChallenge':
        if (typeof value !== 'number') {
          stats.optional.audioChallenge.newWords += value.newWords;
          stats.optional.audioChallenge.accuracy += value.accuracy;
          stats.optional.audioChallenge.seriesCorrectAnswers += value.seriesCorrectAnswers;
          stats.optional.audioChallenge.date = CURRENT_DATE_FOR_STATS;
        }
        break;
      default:
        break;
    }

    setStats(userId, stats);
  });
}
