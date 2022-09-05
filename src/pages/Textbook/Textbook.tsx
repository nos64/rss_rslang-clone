import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from './Textbook.module.scss';
import textbookStore from '../../store/textbook';
import TextbookCard from '../../components/Textbook/TextbookCard/TextbookCard';
import store from '../../store';
import DifficultList from '../../components/Textbook/DifficultList/DifficultList';
import { WordInterface } from '../../types/common';
import PageTitle from '../../components/PageTitle/PageTitle';

const Textbook: React.FC = observer(() => {
  const { currentPage, currentGroup, words, difficultWords, learnedWords, isLearned } =
    textbookStore;
  const { isAuth } = store;

  const [isDifficultPage, setIsDifficultPage] = useState(false);

  const handleGroup = (event: React.ChangeEvent<unknown>, group: number) => {
    textbookStore.setCurrentGroup(group);
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

  const groups = [0, 1, 2, 3, 4, 5];

  const isLearnedPage = (cards: WordInterface[]) => {
    const isLearnedArray = cards.map((word) => isLearned(word));
    return !isLearnedArray.includes(false);
  };

  return (
    <main className={styles.textbook}>
      {!isDifficultPage && <PageTitle title="Учебник" />}
      <div className={styles.links}>
        {!isDifficultPage && (
          <>
            <Button
              href="/rs-lang/#/audioChallenge"
              variant="contained"
              onClick={handleGame}
              disabled={isLearnedPage(words)}
            >
              Аудиовызов
            </Button>
            <Button
              href="/rs-lang/#/sprint"
              variant="contained"
              onClick={handleGame}
              disabled={isLearnedPage(words)}
            >
              Спринт
            </Button>
          </>
        )}
        {isAuth && (
          <Button variant="text" onClick={handleDifficult}>
            {isDifficultPage ? 'Вернуться в учебник' : 'Показать словарь'}
          </Button>
        )}
      </div>
      {isLearnedPage(words) && (
        <div className={styles.warning}>
          Все слова на этой странице уже изучены, выберите другую, чтобы поиграть
        </div>
      )}
      {!isDifficultPage ? (
        <>
          <Tabs value={currentGroup} onChange={handleGroup} aria-label="group tabs">
            {groups.map((item) => (
              <Tab label={(item + 1).toString()} key={item} />
            ))}
          </Tabs>
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
