/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WordInterface } from '../../types/common';
import GenerateResults from './GenerateResults';
import useSetUserStats from '../../hooks/useSetUserStats';
import store from '../../store/index';
import { ROUTES } from '../../variables/routes';

const RenderResults = (props: {
  countWin: WordInterface[];
  countLose: WordInterface[];
  unbeatenStreak: number;
  countNewWordsInStats: number;
  handleClickNewGameBtn: () => void;
}) => {
  const allWordsInRound = 20;
  useEffect(() => {
    if (store.isAuth) {
      useSetUserStats(store.userId, 'audioChallenge', {
        newWords: props.countNewWordsInStats,
        accuracy: (props.countWin.length * 100) / allWordsInRound,
        seriesCorrectAnswers: props.unbeatenStreak,
        date: '',
      });
    }
  }, []);

  return (
    <div className="result-wrapper">
      <h3>Показано слов: {props.countWin.length + props.countLose.length}</h3>
      <h3>Процент правильных ответов: {(props.countWin.length * 100) / allWordsInRound}%</h3>
      <h3>Самая длинная серия угаданных слов: {props.unbeatenStreak}</h3>
      <h3>Количество новых слов за игру: {props.countNewWordsInStats}</h3>
      <GenerateResults
        arrayWord={props.countWin}
        title="Правильные ответы"
        titleClass="correct-result__title"
      />
      <GenerateResults
        arrayWord={props.countLose}
        title="Не правильные ответы"
        titleClass="uncorrect-result__title"
      />
      <div className="buttons-wrapper">
        <Button
          variant="contained"
          className="new-game-btn"
          type="button"
          onClick={() => props.handleClickNewGameBtn()}
        >
          Новая игра
        </Button>

        <Button
          variant="contained"
          className="in-textbook-btn"
          component={Link}
          to={`/${ROUTES.TEXTBOOK}`}
        >
          К учебнику
        </Button>
      </div>
    </div>
  );
};

export default RenderResults;