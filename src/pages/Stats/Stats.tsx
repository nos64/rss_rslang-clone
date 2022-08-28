import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import $api from '../../axios';

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
  const [gamesStats, setGamesStats] = React.useState({
    audioChallenge: { newWords: 0, accuracy: 0, seriesCorrectAnswers: 0, date: '' },
    sprint: { newWords: 0, accuracy: 0, seriesCorrectAnswers: 0, date: '' },
  });
  const [commonStats, setCommonStats] = React.useState({
    learnedWords: 0,
    newWords: 0,
    accuracy: 0,
  });
  const [everyDaysStats, setEveryDaysStats] = React.useState<Array<[string, number]>>([]);

  React.useEffect(() => {
    const fetching = async () => {
      const response = await $api.get(`/users/${localStorage.getItem('userId')}/statistics`);
      const statisticsDB = response.data;

      const learnedWords = statisticsDB?.learnedWords ?? 0;
      let newWords = 0;
      if (statisticsDB?.optional?.gamesStats) {
        const nwSpring = statisticsDB?.optional?.gamesStats?.sprint?.newWords ?? 0;
        const nwAudioChallenge = statisticsDB?.optional?.gamesStats?.audioChallenge?.newWords ?? 0;
        newWords = nwSpring + nwAudioChallenge;
      }
      let accuracy = 0;
      if (statisticsDB?.optional?.gamesStats) {
        const aSpring = statisticsDB?.optional?.gamesStats?.sprint?.accuracy ?? 0;
        const aAudioChallenge = statisticsDB?.optional?.gamesStats?.audioChallenge?.accuracy ?? 0;
        accuracy = (aSpring + aAudioChallenge) / 2;
      }

      setGamesStats({ ...gamesStats, ...statisticsDB?.optional?.gamesStats });
      setCommonStats({
        learnedWords,
        newWords,
        accuracy,
      });
      if (statisticsDB?.optional?.learnedWordsPerDay) {
        const edStats: Array<[string, number]> = Object.entries(
          statisticsDB.optional.learnedWordsPerDay
        );
        setEveryDaysStats([...edStats]);
      }
      setIsLoading(false);
    };
    fetching();
  }, []);

  async function gg() {
    const p = {
      learnedWords: 15,
      optional: {
        learnedWordsPerDay: { Дата: 3, Дата1: 3, Дата2: 3 },
        gamesStats: {
          audioChallenge: { newWords: 2, accuracy: 37, seriesCorrectAnswers: 2, date: '' },
          sprint: { newWords: 5, accuracy: 32, seriesCorrectAnswers: 4, date: '' },
        },
      },
    };
    const hh = await $api.put(`/users/${localStorage.getItem('userId')}/statistics`, p);
    // const hh = await $api.get(`/users/${localStorage.getItem('userId')}/statistics`);
    console.log(hh);
  }

  return (
    <div>
      <h1>Статистика</h1>
      {isLoading ? (
        <div>Идет загрузка статистики...</div>
      ) : (
        <div>
          <div>
            <div>За сегодня</div>
            <div>
              <div>Общая статистика</div>
              <div>Кол-во новых слов: {commonStats.newWords}</div>
              <div>Кол-во изученных слов: {commonStats.learnedWords}</div>
              <div>Процент правильных ответов: {commonStats.accuracy}</div>
            </div>
            <hr />
            <hr />
            <div>
              <div>Статистика по играм</div>
              <div>Спринт</div>
              <div>Кол-во новых слов: {gamesStats.sprint.newWords}</div>
              <div>Процент правильных ответов: {gamesStats.sprint.accuracy}</div>
              <div>
                Самая длинная серия правильных ответов: {gamesStats.sprint.seriesCorrectAnswers}
              </div>
              <hr />
              <div>Аудиовызов</div>
              <div>Кол-во новых слов: {gamesStats.audioChallenge.newWords}</div>
              <div>Процент правильных ответов: {gamesStats.audioChallenge.accuracy}</div>
              <div>
                Самая длинная серия правильных ответов:{' '}
                {gamesStats.audioChallenge.seriesCorrectAnswers}
              </div>
            </div>
          </div>
          <div>
            <div>За все время</div>
            <div>2 графика</div>
            {everyDaysStats.map((arr, index) => (
              <div key={index}>
                {arr[0]} {arr[1]}
              </div>
            ))}
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
