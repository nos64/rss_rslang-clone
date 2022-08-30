import React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './Header.module.scss';
import { pages } from '../../variables/routes';

const Header: React.FC = () => {
  const { pathname } = useLocation();

  const title = pages.filter((page) => page.link.toLowerCase() === pathname.slice(1)).pop()?.text;

  return (
    <Box>
      <AppBar position="static" className={styles.header}>
        <Toolbar className={styles.toolbar}>
          <Typography component="h1" variant="h4">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
