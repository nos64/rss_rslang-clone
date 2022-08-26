/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { WordInterface } from '../../types/common';
import RenderCorrectCard from './RenderCorrectCard';
import RenderUncorrectCard from './RenderUncorrectCard';

// eslint-disable-next-line react/no-unused-prop-types
const RenderAnswerCard = (props: { isCorrectAnswer: boolean; word: WordInterface }) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
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
