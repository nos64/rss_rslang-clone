/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Box from '@mui/material/Box';
import styles from './ProjectItem.module.scss';

const ProjectItem = (props: { title: string; image: React.ReactElement; description: string }) => {
  return (
    <Box className={styles['project-item']}>
      <Box className={styles['project-item__wrapper']}>
        <Box className={styles['project-item__title']}>{props.title}</Box>
        <Box className={styles['project-item__title']}>{props.image}</Box>
        <Box className={styles['project-item__description']}>{props.description}</Box>
      </Box>
    </Box>
  );
};

export default ProjectItem;
