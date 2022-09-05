/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { WordInterface } from '../../types/common';
import RenderCorrectCard from './RenderCorrectCard';
import RenderUncorrectCard from './RenderUncorrectCard';
import useSetStorageWords from '../../hooks/useSetStorageWords';
import store from '../../store';
import textbookStore from '../../store/textbook';

const RenderAnswerCard = (props: { isCorrectAnswer: boolean; word: WordInterface }) => {
  useEffect(() => {
    if (store.isAuth) {
      if (props.word && textbookStore.userId) {
        useSetStorageWords(props.word, props.isCorrectAnswer, textbookStore.userId);
      }
    }
  }, []);
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
