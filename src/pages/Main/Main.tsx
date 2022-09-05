import React from 'react';
import AboutProject from './AboutProject';
import AboutTeam from './AboutTeam';
import './Main.scss';

const Main: React.FC = () => {
  return (
    <div>
      <h1 className="main__title">RSLang</h1>
      <p className="main__description">С RSLang изучать английсский язык увлекательно и итересно</p>
      <AboutProject />
      <AboutTeam />
    </div>
  );
};

export default Main;
