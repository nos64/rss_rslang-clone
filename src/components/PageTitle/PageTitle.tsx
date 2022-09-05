import React from 'react';
import styles from './PageTitle.module.scss';

const PageTitle = (props: { title: string }) => {
  const { title } = props;

  return <h1 className={styles['page-title']}>{title}</h1>;
};

export default PageTitle;
