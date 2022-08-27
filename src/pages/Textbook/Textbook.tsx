import React from 'react';
import { observer } from 'mobx-react-lite';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import styles from './Textbook.module.scss';
import textbookStore from '../../store/textbook';
import TextbookCard from '../../components/TextbookCard/TextbookCard';
import store from '../../store';

const Textbook: React.FC = observer(() => {
  const { currentPage, currentGroup, words, difficultWords, learnedWords } = textbookStore;
  const { isAuth } = store;

  // const [value, setValue] = useState(0);

  const handleGroup = (event: React.ChangeEvent<unknown>, group: number) => {
    textbookStore.setCurrentGroup(group);
  };

  const handlePage = (event: React.ChangeEvent<unknown>, page: number) => {
    textbookStore.setCurrentPage(page);
  };

  return (
    <main className={styles.textbook}>
      <Pagination count={6} page={currentGroup} onChange={handleGroup} />
      <section className={styles.cards}>
        {words.length ? (
          words.map((card) => (
            <TextbookCard
              card={card}
              isAuth={isAuth}
              isDifficult={difficultWords.has(card)}
              isLearned={learnedWords.has(card)}
              key={card.id}
            />
          ))
        ) : (
          <CircularProgress sx={{ alignSelf: 'center' }} />
        )}
      </section>
      <Pagination count={30} page={currentPage} onChange={handlePage} />
    </main>
  );
});

export default Textbook;

// учебник
