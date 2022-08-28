/* eslint-disable react/destructuring-assignment */
import { Button } from '@mui/material';
import React from 'react';
import { WordInterface } from '../../types/common';
import GenerateResults from './GenerateResults';

const RenderResults = (props: { countWin: WordInterface[]; countLose: WordInterface[] }) => {
  const allWordsInRound = 20;
  return (
    <div className="result-wrapper">
      <h3>Показано слов: {props.countWin.length + props.countLose.length}</h3>
      <h3>Процент правильных ответов: {(props.countWin.length * 100) / allWordsInRound}%</h3>
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
        <Button variant="contained" className="new-game-btn" type="button">
          Новая игра
        </Button>
        <Button variant="contained" className="in-textbook-btn" type="button">
          К учебнику
        </Button>
      </div>
    </div>
  );
};

export default RenderResults;
