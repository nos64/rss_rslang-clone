import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import { observer } from 'mobx-react-lite';
import useGetUserStats from '../../../hooks/useGetUserStats';
import {
  UserStatsRequestInterface,
  UserStatsForLayoutInterface,
  UserStatsGameInterface,
  UserStatsLearnedWordsGraph,
} from '../../../types/common';
import Context from '../../../context';
import Graph from '../Graph/Graph';
import TodayStats from '../TodayStats/TodayStats';
import PageTitle from '../../PageTitle/PageTitle';

const Statistics: React.FC = () => {
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

  const titleSectionStatsCss = {
    mb: 1,
  };
  const itemGraphStatsCss = {
    height: 400,
  };

  return (
    <div>
      <PageTitle title="Статистика" />
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
              <TodayStats
                title="Общая статистика"
                newWords={summaryStats.newWords}
                learnedWords={summaryStats.learnedWords}
                accuracy={summaryStats.accuracy}
                seriesCorrectAnswers={-1}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <TodayStats
                title="Спринт"
                newWords={sprintStats.newWords}
                learnedWords={-1}
                accuracy={sprintStats.accuracy}
                seriesCorrectAnswers={sprintStats.seriesCorrectAnswers}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <TodayStats
                title="Аудиовызов"
                newWords={audioChallengeStats.newWords}
                learnedWords={-1}
                accuracy={audioChallengeStats.accuracy}
                seriesCorrectAnswers={audioChallengeStats.seriesCorrectAnswers}
              />
            </Grid>
          </Grid>

          <Typography sx={titleSectionStatsCss} variant="h5">
            По дням
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12} md={6} sx={itemGraphStatsCss}>
              <Graph
                title="Кол-во изученных слов"
                graphData={graphLearnedWords.learnedWordsPerDay}
                graphDataKey="Кол-во слов"
              />
            </Grid>
            <Grid xs={12} md={6} sx={itemGraphStatsCss}>
              <Graph
                title="Увеличение кол-ва изученных слов"
                graphData={graphLearnedWords.increasedLEarnedWordsPerDay}
                graphDataKey="Кол-во слов"
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default observer(Statistics);
