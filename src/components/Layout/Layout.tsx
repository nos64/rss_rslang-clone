import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Body from '../Body/Body';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MiniDrawer from '../MiniDrawer/MiniDrawer';
import { pages } from '../../variables/routes';
import { RoutesPageInterface } from '../../types/common';
import styles from './Lauout.module.scss';

const Layout: React.FC = () => {
  const location = useLocation();
  const pageRouter = location.pathname.substring(1, location.pathname.length);
  const currentPage = pages.find((element: RoutesPageInterface) => element.link === pageRouter);

  return (
    <div className={styles['app-layout']}>
      <Header />
      <Body>
        <MiniDrawer />
        <Box sx={{ width: '100%', maxWidth: '1280px', p: '24px', mx: 'auto' }}>
          <Outlet />
        </Box>
      </Body>
      {!currentPage || !currentPage.footerHide ? <Footer /> : ''}
    </div>
  );
};

export default Layout;
