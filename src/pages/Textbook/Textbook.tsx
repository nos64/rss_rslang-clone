import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import styles from './Textbook.module.scss';
import textbookStore from '../../store/textbook';
import TextbookCard from '../../components/Textbook/TextbookCard/TextbookCard';
import store from '../../store';
import DifficultList from '../../components/Textbook/DifficultList/DifficultList';

const Textbook: React.FC = observer(() => {
  const { currentPage, currentGroup, words, difficultWords, learnedWords } = textbookStore;
  const { isAuth } = store;

  const [isDifficultPage, setIsDifficultPage] = useState(false);

  const handleGroup = (event: React.ChangeEvent<unknown>, group: number) => {
    textbookStore.setCurrentGroup(group - 1);
  };

  const handlePage = (event: React.ChangeEvent<unknown>, page: number) => {
    textbookStore.setCurrentPage(page - 1);
  };

  const handleGame = () => {
    textbookStore.setFromTextbook();
  };

  const handleDifficult = () => {
    setIsDifficultPage(!isDifficultPage);
  };

  return (
    <main className={styles.textbook}>
      <div className={styles.links}>
        <Button href="/#/audioChallenge" variant="contained" onClick={handleGame}>
          Audiochallenge
        </Button>
        <Button href="/#/sprint" variant="contained" onClick={handleGame}>
          Sprint
        </Button>
        {isAuth && (
          <Button variant="text" onClick={handleDifficult}>
            {isDifficultPage ? 'Вернуться в учебник' : 'Показать только сложные слова'}
          </Button>
        )}
      </div>
      {!isDifficultPage ? (
        <>
          <Pagination count={6} page={currentGroup + 1} onChange={handleGroup} />
          <ul className={styles.cards}>
            {words.length ? (
              words.map((card) => (
                <TextbookCard
                  card={card}
                  isAuth={isAuth}
                  isDifficult={
                    !!Array.from(difficultWords).filter((word) => card.id === word.id).length
                  }
                  isDifficultPage={false}
                  isLearned={
                    !!Array.from(learnedWords).filter((word) => card.id === word.id).length
                  }
                  key={card.id}
                />
              ))
            ) : (
              <CircularProgress sx={{ alignSelf: 'center' }} />
            )}
          </ul>
          <Pagination
            count={30}
            page={currentPage + 1}
            variant="outlined"
            shape="rounded"
            onChange={handlePage}
          />
        </>
      ) : (
        <DifficultList />
      )}
    </main>
  );
});

export default Textbook;
