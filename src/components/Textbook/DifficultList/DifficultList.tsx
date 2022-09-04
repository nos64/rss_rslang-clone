import React from 'react';
import { observer } from 'mobx-react-lite';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './DifficultList.module.scss';
import store from '../../../store/index';
import textbookStore from '../../../store/textbook';
import TextbookCard from '../TextbookCard/TextbookCard';

const DifficultList = observer(() => {
  const { difficultWords } = textbookStore;
  const { isAuth } = store;

  return (
    <ul className={styles.cards}>
      {difficultWords.size ? (
        Array.from(difficultWords).map((card) => (
          <TextbookCard
            card={card}
            isAuth={isAuth}
            isDifficult={!!Array.from(difficultWords).filter((word) => card.id === word.id).length}
            isDifficultPage
            key={card.id}
          />
        ))
      ) : (
        <CircularProgress sx={{ alignSelf: 'center' }} />
      )}
    </ul>
  );
});

export default DifficultList;
