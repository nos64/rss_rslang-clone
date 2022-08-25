import React from 'react';
import { Outlet } from 'react-router-dom';
import Body from '../Body/Body';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MiniDrawer from '../MiniDrawer/MiniDrawer';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Body>
        <MiniDrawer />
        <Outlet />
      </Body>
      <Footer />
    </>
  );
};

export default Layout;
