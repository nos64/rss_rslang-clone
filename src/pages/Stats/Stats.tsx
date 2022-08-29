import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import useGetUserStats from '../../hooks/useGetUserStats';
import useSetUserStats from '../../hooks/useSetUserStats';
import {
  UserStatsRequestInterface,
  UserStatsForLayoutInterface,
  UserStatsGameInterface,
  UserStatsLearnedWordsGraph,
} from '../../types/common';

const Stats = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [summaryStats, setSummaryStats] = React.useState({
    learnedWords: 0,
    newWords: 0,
    accuracy: 0,
  });
  const [graphLearnedWords, setGraphLearnedWords] = React.useState(
    {} as { [index: string]: UserStatsLearnedWordsGraph }
  );
  const [sprintStats, setSprintStats] = React.useState({} as UserStatsGameInterface);
  const [audioChallengeStats, setAudioChallengeStats] = React.useState(
    {} as UserStatsGameInterface
  );

  function transformStatsForPrintLayout(
    stats: UserStatsRequestInterface
  ): UserStatsForLayoutInterface {
    const commonAccuracy =
      (stats.optional.sprint.accuracy + stats.optional.audioChallenge.accuracy) / 2;
    const commonNewWords = stats.optional.sprint.newWords + stats.optional.audioChallenge.newWords;

    const graphLearnedWordsPerDay: UserStatsLearnedWordsGraph = [];
    const graphIncreaseLearnedWordsPerDay: UserStatsLearnedWordsGraph = [];
    const learnedWordsPerDay = Object.entries(stats.optional.learnedWordsPerDay);
    learnedWordsPerDay.forEach((element, index) => {
      graphLearnedWordsPerDay.push({
        name: element[0],
        'Кол-во слов': element[1],
      });
      const prevEl = graphIncreaseLearnedWordsPerDay[index - 1]?.['Кол-во слов'] ?? 0;
      graphIncreaseLearnedWordsPerDay.push({
        name: element[0],
        'Кол-во слов': prevEl + element[1],
      });
    });

    const returnObj = {
      summary: {
        learnedWords: stats.learnedWords,
        newWords: commonNewWords,
        accuracy: commonAccuracy,
      },
      games: {
        sprint: { ...stats.optional.sprint },
        audioChallenge: { ...stats.optional.audioChallenge },
      },
      graph: {
        learnedWordsPerDay: graphLearnedWordsPerDay,
        increasedLEarnedWordsPerDay: graphIncreaseLearnedWordsPerDay,
      },
    };

    return returnObj;
  }

  async function gg() {
    // const userId = localStorage.getItem('userId');
    // if (userId) useSetUserStats(userId, 'words', 4);
    /* const hh = await $api.put(`/users/${localStorage.getItem('userId')}/statistics`, {
      learnedWords: 5,
      optional: {
        learnedWordsPerDay: { '28.8.2022': 5 },
        audioChallenge: { newWords: 2, accuracy: 37, seriesCorrectAnswers: 2, date: '28.8.2022' },
        sprint: { newWords: 5, accuracy: 32, seriesCorrectAnswers: 4, date: '28.8.2022' },
      },
    });
    // const hh = await $api.get(`/users/${localStorage.getItem('userId')}/statistics`);
    console.log(hh); */
    // const nowDate = new Date();
    // console.log(nowDate.toLocaleDateString());
  }

  React.useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      useGetUserStats(userId)().then((resolve) => {
        const transformedStats = transformStatsForPrintLayout(resolve);
        setSummaryStats({ ...transformedStats.summary });
        setGraphLearnedWords({ ...transformedStats.graph });
        setSprintStats({ ...transformedStats.games.sprint });
        setAudioChallengeStats({ ...transformedStats.games.audioChallenge });

        setIsLoading(true);
      });
    }
  }, []);

  return (
    <div>
      <h1>Статистика</h1>
      {!isLoading ? (
        <div>Не авторизованным не доступно...</div>
      ) : (
        <div>
          <div>
            <div>За сегодня</div>
            <div>
              <div>Общая статистика</div>
              <div>Кол-во новых слов: {summaryStats.newWords}</div>
              <div>Кол-во изученных слов: {summaryStats.learnedWords}</div>
              <div>Процент правильных ответов: {summaryStats.accuracy}</div>
            </div>
            <hr />
            <hr />
            <div>
              <div>Статистика по играм</div>
              <div>Спринт</div>
              <div>Кол-во новых слов: {sprintStats.newWords}</div>
              <div>Процент правильных ответов: {sprintStats.accuracy}</div>
              <div>Самая длинная серия правильных ответов: {sprintStats.seriesCorrectAnswers}</div>
              <hr />
              <div>Аудиовызов</div>
              <div>Кол-во новых слов: {audioChallengeStats.newWords}</div>
              <div>Процент правильных ответов: {audioChallengeStats.accuracy}</div>
              <div>
                Самая длинная серия правильных ответов: {audioChallengeStats.seriesCorrectAnswers}
              </div>
            </div>
          </div>
          <div>
            <div>За все время</div>
            <div>Кол-во новых слов по дням изучения</div>
            <AreaChart
              width={500}
              height={400}
              data={graphLearnedWords.learnedWordsPerDay}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="Кол-во слов" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>

            <div>Увеличение общего кол-ва изученных слов по дням изучения</div>
            <AreaChart
              width={500}
              height={400}
              data={graphLearnedWords.increasedLEarnedWordsPerDay}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="Кол-во слов" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </div>
        </div>
      )}

      <button type="button" onClick={gg}>
        Тык
      </button>
    </div>
  );
};

export default Stats;
