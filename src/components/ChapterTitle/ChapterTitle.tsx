import React from 'react';
import styles from './ChapterTitle.module.scss';

const ChapterTitle = (props: { title: string }) => {
  const { title } = props;

  return <h4 className={styles['chapter-title']}>{title}</h4>;
};

export default ChapterTitle;
