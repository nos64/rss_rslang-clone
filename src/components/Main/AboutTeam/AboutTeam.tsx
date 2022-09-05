import React from 'react';
import Box from '@mui/material/Box';
import TeamItem from '../TeamItem/TeamItem';
import ChapterTitle from '../../ChapterTitle/ChapterTitle';
import styles from './AboutTeam.module.scss';

const AboutTeam = () => {
  return (
    <Box className="about-team">
      <ChapterTitle title="Над проектом работали" />
      <Box className={styles['about-team__list']}>
        <TeamItem
          imageSrc="https://avatars.githubusercontent.com/u/51365924"
          gitLink="https://github.com/a-bodrova"
          name="Анна"
          description=""
          created={['Разработка учебника', 'Разработка словаря', 'Помощь в архитектурных вопросах']}
        />
        <TeamItem
          imageSrc="https://avatars.githubusercontent.com/u/67101576"
          gitLink="https://github.com/nos64"
          name="Михаил"
          description=""
          created={['Разработка игры "Спринт"', 'Разработка игры "Аудиовызов"']}
        />
        <TeamItem
          imageSrc="https://avatars.githubusercontent.com/u/101117026"
          gitLink="https://github.com/JelbyDev"
          name="Евгений"
          description=""
          created={[
            'Разработка авторизации',
            'Разработка статистики',
            'Разработка доп. функционала',
          ]}
        />
      </Box>
    </Box>
  );
};

export default AboutTeam;
