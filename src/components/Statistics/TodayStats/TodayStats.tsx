import React from 'react';
import Box from '@mui/material/Box';

const TodayStats = (props: {
  title: string;
  newWords: number;
  accuracy: number;
  seriesCorrectAnswers: number;
  learnedWords: number;
}) => {
  const { title, newWords, accuracy, seriesCorrectAnswers, learnedWords } = props;
  const itemCss = {
    p: 1.5,
    boxShadow: '0 0 3px 1px rgba(0,0,0,0.3)',
    borderRadius: 2,
  };

  return (
    <Box sx={itemCss}>
      <div>
        <strong>{title}</strong>
      </div>
      <hr />
      {newWords >= 0 ? <div>Новых слов: {newWords}</div> : ''}
      {learnedWords >= 0 ? <div>Изученных слов: {learnedWords}</div> : ''}
      {accuracy >= 0 ? <div>Правильных ответов: {accuracy}%</div> : ''}
      {seriesCorrectAnswers >= 0 ? <div>Серия правильных ответов: {seriesCorrectAnswers}</div> : ''}
    </Box>
  );
};

export default TodayStats;
