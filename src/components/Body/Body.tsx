import React, { ReactNode } from 'react';
import styles from './Body.module.scss';

const Body: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.body}>{children}</div>;
};

export default Body;
