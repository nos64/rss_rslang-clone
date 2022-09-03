import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../../variables/routes';
import Layout from '../Layout/Layout';
import Main from '../../pages/Main/Main';
import Textbook from '../../pages/Textbook/Textbook';
import AudioChallenge from '../../pages/AudioChallenge/AudioChallenge';
import Sprint from '../../pages/Sprint/Sprint';
import Stats from '../../pages/Stats/Stats';
import Profile from '../../pages/Profile/Profile';
import Context from '../../context';

const App: React.FC = () => {
  const { store } = React.useContext(Context);
  React.useEffect(() => {
    if (localStorage.getItem('userId') && localStorage.getItem('token')) store.checkAuth();
  }, []);

  return (
    <Routes>
      <Route path={ROUTES.LAYOUT} element={<Layout />}>
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.TEXTBOOK} element={<Textbook />} />
        <Route path={ROUTES.AUDIOCHALLENGE} element={<AudioChallenge />} />
        <Route path={ROUTES.SPRINT} element={<Sprint />} />
        <Route path={ROUTES.STATS} element={<Stats />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
