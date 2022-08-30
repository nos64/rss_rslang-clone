/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { WordInterface } from '../../types/common';
import RenderCorrectCard from './RenderCorrectCard';
import RenderUncorrectCard from './RenderUncorrectCard';

const RenderAnswerCard = (props: { isCorrectAnswer: boolean; word: WordInterface }) => {
  return (
    <>
      {props.isCorrectAnswer ? (
        <RenderCorrectCard word={props.word} />
      ) : (
        <RenderUncorrectCard word={props.word} />
      )}
    </>
  );
};

export default RenderAnswerCard;
