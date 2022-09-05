/* eslint-disable no-nested-ternary */
import React from 'react';
import { observer } from 'mobx-react-lite';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './DifficultList.module.scss';
import store from '../../../store/index';
import textbookStore from '../../../store/textbook';
import TextbookCard from '../TextbookCard/TextbookCard';
import PageTitle from '../../PageTitle/PageTitle';

const DifficultList = observer(() => {
  const { difficultWords, isLoading, isDifficult, isLearned } = textbookStore;
  const { isAuth } = store;

  return (
    <ul className={styles.cards}>
      <PageTitle title="Словарь" />
      {isLoading ? (
        <CircularProgress sx={{ alignSelf: 'center' }} />
      ) : difficultWords.size ? (
        Array.from(difficultWords).map((card) => (
          <TextbookCard
            card={card}
            isAuth={isAuth}
            isDifficult={isDifficult(card)}
            isLearned={isLearned(card)}
            isDifficultPage
            key={card.id}
          />
        ))
      ) : (
        <div className={styles['no-words']}>Нет сложных слов</div>
      )}
    </ul>
  );
});

export default DifficultList;
