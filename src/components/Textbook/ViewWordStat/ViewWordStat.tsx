import React from 'react';
import useGetStorageWords from '../../../hooks/useGetStorageWords';
import styles from './ViewWordStat.module.scss';

interface IViewWordStatProps {
  word: string;
  userId: string;
}

const ViewWordStat: React.FC<IViewWordStatProps> = ({ word, userId }) => {
  const { countWin, countLose } = useGetStorageWords(word, userId) ?? { countWin: 0, countLose: 0 };

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        position: 'absolute',
        top: '10px',
        left: '10px',
      }}
    >
      <div className={`${styles.stat__view} ${styles.stat__view_success}`}>{countWin}</div>
      <div className={`${styles.stat__view} ${styles.stat__view_error}`}>{countLose}</div>
    </div>
  );
};

export default ViewWordStat;
