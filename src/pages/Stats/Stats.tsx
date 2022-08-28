import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import $api from '../../axios';
import useGetUserStats from '../../hooks/useGetUserStats';
import useSetUserStats from '../../hooks/useSetUserStats';
import {
  UserStatsRequestInterface,
  UserStatsForLayoutInterface,
  UserStatsGameInterface,
} from '../../types/common';

const data1 = [
  { name: 'Page A', uv: 3 },
  { name: 'Page B', uv: 2 },
  { name: 'Page C', uv: 5 },
  { name: 'Page D', uv: 0 },
  { name: 'Page E', uv: 7 },
  { name: 'Page F', uv: 2 },
];

const data2 = [
  { name: 'Page A', uv: 3 },
  { name: 'Page B', uv: 2 },
  { name: 'Page C', uv: 5 },
  { name: 'Page D', uv: 0 },
  { name: 'Page E', uv: 7 },
  { name: 'Page F', uv: 2 },
];

const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const height = 400;
const width = 700;

const Stats = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [summaryStats, setSummaryStats] = React.useState({
    learnedWords: 0,
    newWords: 0,
    accuracy: 0,
  });
  const [sprintStats, setSprintStats] = React.useState({} as UserStatsGameInterface);
  const [audioChallengeStats, setAudioChallengeStats] = React.useState(
    {} as UserStatsGameInterface
  );

  React.useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      useGetUserStats(userId)().then((resolve) => {
        const transformedStats = transformStatsForPrintLayout(resolve);
        setSummaryStats({ ...transformedStats.summary });
        setSprintStats({ ...transformedStats.games.sprint });
        setAudioChallengeStats({ ...transformedStats.games.audioChallenge });
        // setTotalStats({ ...transformedStats });
        setIsLoading(true);
      });
    }
  }, []);

  function transformStatsForPrintLayout(
    stats: UserStatsRequestInterface
  ): UserStatsForLayoutInterface {
    const commonAccuracy =
      (stats.optional.sprint.accuracy + stats.optional.audioChallenge.accuracy) / 2;
    const commonNewWords = stats.optional.sprint.newWords + stats.optional.audioChallenge.newWords;
    const learnedWordsPerDay = [...Object.entries(stats.optional.learnedWordsPerDay)];

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
      // learnedWordsPerDay,
    };

    return returnObj;
  }

  async function gg() {
    const userId = localStorage.getItem('userId');
    if (userId) useSetUserStats(userId, 'words', 4);
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
            <div>2 графика</div>
            {/* totalStats.learnedWordsPerDay.map((arr: [string: number], index: number) => (
              <div key={index}>
                {arr[0]} {arr[1]}
              </div>
            )) */}
          </div>
        </div>
      )}
      <LineChart width={width} height={height} data={data1} margin={margin} syncId="test">
        <Line isAnimationActive={false} type="monotone" dataKey="uv" stroke="#ff7300" />
        <Tooltip />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
      <LineChart width={width} height={height} data={data2} margin={margin} syncId="test2">
        <Line isAnimationActive={false} type="monotone" dataKey="uv" stroke="#ff7300" />
        <Tooltip />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
      <button type="button" onClick={gg}>
        Тык
      </button>
    </div>
  );
};

export default Stats;
