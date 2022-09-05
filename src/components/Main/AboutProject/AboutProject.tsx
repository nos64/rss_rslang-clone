import React from 'react';
import Box from '@mui/material/Box';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import SportsEsportsTwoToneIcon from '@mui/icons-material/SportsEsportsTwoTone';
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
          image={<AutoStoriesTwoToneIcon color="action" sx={{ fontSize: 80 }} />}
          description="Электронный учебник включает в себя 3600 часто употребляемых английских слов, которые разбиты по уровням сложности на шесть разделов."
        />
        <ProjectItem
          title="Словарь"
          image={<MenuBookTwoToneIcon color="action" sx={{ fontSize: 80 }} />}
          description="Словарь дает возможность сохранять слова, которым вы бы хотели уделить больше внимания."
        />
        <ProjectItem
          title="Игры"
          image={<SportsEsportsTwoToneIcon color="action" sx={{ fontSize: 80 }} />}
          description="Игры - ‟Аудиовызов” и ‟Спринт”  помогут улучшить визуальное и слуховое восприятие слов, а также лучше закрепить изученный в учебнике материал."
        />
        <ProjectItem
          title="Статистика"
          image={<AssessmentIcon color="action" sx={{ fontSize: 80 }} />}
          description="Статистика поможет наглядно отслеживать Ваш прогресс в изучении слов."
        />
      </Box>
    </Box>
  );
};

export default AboutProject;
