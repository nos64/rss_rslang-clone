import React from 'react';
import TeamItem from './TeamItem';

const AboutTeam = () => {
  return (
    <div>
      <TeamItem
        imageSrc="123"
        gitLink="href..."
        name="Анна"
        description="Тим-лид..."
        created={['1', '2', '3']}
      />
      <TeamItem
        imageSrc="123"
        gitLink="href..."
        name="Евгений"
        description="Фронт, бэк..."
        created={['4', '5', '6']}
      />
      <TeamItem
        imageSrc="123"
        gitLink="href..."
        name="Михаил"
        description="Фронт..."
        created={['7', '8', '9']}
      />
    </div>
  );
};

export default AboutTeam;
