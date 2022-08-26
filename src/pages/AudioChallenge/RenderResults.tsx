/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { WordInterface } from '../../types/common';
import GenerateResults from './GenerateResults';

const RenderResults = (props: { countWin: WordInterface[]; countLose: WordInterface[] }) => {
  return (
    <div className="result-wrapper">
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
        <button className="new-game-btn" type="button">
          Новая игра
        </button>
        <button className="in-textbook-btn" type="button">
          К учебнику
        </button>
      </div>
    </div>
  );
};

export default RenderResults;
