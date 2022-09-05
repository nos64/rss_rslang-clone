/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Box from '@mui/material/Box';
import styles from './TeamItem.module.scss';

const TeamItem = (props: {
  imageSrc: string;
  gitLink: string;
  name: string;
  description: string;
  created: string[];
}) => {
  return (
    <Box className={styles['team-item']}>
      <Box className={styles['team-item__wrapper']}>
        <Box className={styles['team-item__info']}>
          <Box className={styles['team-item__avatar']}>
            <img src={props.imageSrc} alt="Avatar" />
          </Box>
          <Box className={styles['team-item__name']}>{props.name}</Box>
          {props.description ? (
            <Box className={styles['team-item__description']}>{props.description}</Box>
          ) : (
            ''
          )}
          <ul className={styles['contribution-list']}>
            <li className="contribution-list__item">
              <strong>Вклад в разработку:</strong>
            </li>
            {props.created.map((item) => (
              <li className="contribution-list__item" key={item}>
                - {item}
              </li>
            ))}
          </ul>
        </Box>
        <Box className={styles['team-item__git-link']}>
          <a href={props.gitLink}>GitHub аккаунт</a>
        </Box>
      </Box>
    </Box>
  );
};

export default TeamItem;
