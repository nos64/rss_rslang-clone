import React from 'react';
import AboutProject from '../../components/Main/AboutProject/AboutProject';
import AboutTeam from '../../components/Main/AboutTeam/AboutTeam';
import PageTitle from '../../components/PageTitle/PageTitle';

const Main: React.FC = () => {
  return (
    <div className="main">
      <PageTitle title="RSLang - изучать английский язык увлекательно и интересно" />
      <AboutProject />
      <AboutTeam />
    </div>
  );
};

export default Main;
