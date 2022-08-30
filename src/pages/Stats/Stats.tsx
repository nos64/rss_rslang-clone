import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import { observer } from 'mobx-react-lite';
import useGetUserStats from '../../hooks/useGetUserStats';
import {
  UserStatsRequestInterface,
  UserStatsForLayoutInterface,
  UserStatsGameInterface,
  UserStatsLearnedWordsGraph,
} from '../../types/common';
import Context from '../../context';

const Stats = () => {
  const { store } = React.useContext(Context);

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

  function formattedStatsForPrintLayout(
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

  React.useEffect(() => {
    if (store.userId) {
      useGetUserStats(store.userId)().then((resolve) => {
        const transformedStats = formattedStatsForPrintLayout(resolve);

        setSummaryStats({ ...transformedStats.summary });
        setGraphLearnedWords({ ...transformedStats.graph });
        setSprintStats({ ...transformedStats.games.sprint });
        setAudioChallengeStats({ ...transformedStats.games.audioChallenge });

        setIsLoading(false);
      });
    }
  }, [store.userId]);

  const itemTodayStatsCss = {
    p: 1.5,
    boxShadow: '0 0 3px 1px rgba(0,0,0,0.3)',
    borderRadius: 2,
  };
  const titleSectionStatsCss = {
    mb: 1,
  };
  const titleGraphStatsCss = {
    textAlign: 'center',
    mb: 1,
  };
  const itemGraphStatsCss = {
    height: 400,
  };

  return (
    <div>
      <Typography variant="h4">Статистика</Typography>
      {isLoading || !store.isAuth ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ px: 2 }}>
          <Typography sx={titleSectionStatsCss} variant="h5">
            За сегодня
          </Typography>
          <Grid container spacing={3} sx={{ mb: 2 }}>
            <Grid xs={12} md={4}>
              <Box sx={itemTodayStatsCss}>
                <div>Общая статистика</div>
                <hr />
                <div>Новых слов: {summaryStats.newWords}</div>
                <div>Изученных слов: {summaryStats.learnedWords}</div>
                <div>Правильных ответов: {summaryStats.accuracy}%</div>
              </Box>
            </Grid>
            <Grid xs={12} md={4}>
              <Box sx={itemTodayStatsCss}>
                <div>Спринт</div>
                <hr />
                <div>Новых слов: {sprintStats.newWords}</div>
                <div>Правильных ответов: {sprintStats.accuracy}%</div>
                <div>Серия правильных ответов: {sprintStats.seriesCorrectAnswers}</div>
              </Box>
            </Grid>
            <Grid xs={12} md={4}>
              <Box sx={itemTodayStatsCss}>
                <div>Аудиовызов</div>
                <hr />
                <div>Новых слов: {audioChallengeStats.newWords}</div>
                <div>Правильных ответов: {audioChallengeStats.accuracy}%</div>
                <div>Серия правильных ответов: {audioChallengeStats.seriesCorrectAnswers}</div>
              </Box>
            </Grid>
          </Grid>

          <Typography sx={titleSectionStatsCss} variant="h5">
            По дням
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12} md={6} sx={itemGraphStatsCss}>
              <Typography sx={titleGraphStatsCss}>Кол-во изученных слов</Typography>
              <ResponsiveContainer width="100%" height="100%">
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
              </ResponsiveContainer>
            </Grid>
            <Grid xs={12} md={6} sx={itemGraphStatsCss}>
              <Typography sx={titleGraphStatsCss}>Увеличение кол-ва изученных слов</Typography>
              <ResponsiveContainer width="100%" height="100%">
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
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default observer(Stats);
