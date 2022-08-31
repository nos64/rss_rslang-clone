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
      case 'audioChallenge':
        if (typeof value !== 'number') {
          stats.optional[operation].newWords += value.newWords;

          if (stats.optional.sprint.accuracy > 0) {
            stats.optional[operation].accuracy =
              (stats.optional.sprint.accuracy + value.accuracy) / 2;
          } else {
            stats.optional[operation].accuracy = value.accuracy;
          }

          if (value.seriesCorrectAnswers > stats.optional[operation].seriesCorrectAnswers)
            stats.optional[operation].seriesCorrectAnswers = value.seriesCorrectAnswers;

          stats.optional[operation].date = CURRENT_DATE_FOR_STATS;
        }
        break;
      default:
        break;
    }

    setStats(userId, stats);
  });
}
