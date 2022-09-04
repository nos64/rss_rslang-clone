import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <Box>
      <AppBar position="static" className={styles.header}>
        <Toolbar className={styles.toolbar} />
      </AppBar>
    </Box>
  );
};

export default Header;
