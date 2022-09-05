import React from 'react';
import Box from '@mui/material/Box';
import ProjectItem from '../ProjectItem/ProjectItem';
import styles from './AboutProject.module.scss';
import ChapterTitle from '../../ChapterTitle/ChapterTitle';

const AboutProject = () => {
  return (
    <Box className={styles['about-project']}>
      <ChapterTitle title="Возможности нашего приложения" />
      <Box className={styles['about-project__list']}>
        <ProjectItem
          title="Учебник"
          description="Электронный учебник содержит в себя 3600 слов, которые разбиты по уровням сложности."
        />
        <ProjectItem
          title="Словарь"
          description="Словарь дает возможность добавлять слова, которым вы бы хотели уделить больше внимания."
        />
        <ProjectItem
          title="Игры"
          description="Игры - Саванна и Аудиовызов помогут улучшить визуальное и слуховое восприятие слов."
        />
        <ProjectItem
          title="Статистика"
          description="Статистика поможет наглядно отслеживать ваш прогресс в изучении слов."
        />
      </Box>
    </Box>
  );
};

export default AboutProject;
