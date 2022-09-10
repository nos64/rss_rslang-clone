import React, { useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { observer } from 'mobx-react-lite';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link, useLocation } from 'react-router-dom';
import { pages } from '../../variables/routes';
import Context from '../../context';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(1, 1),
  // necessary for content to be below app bar
  position: 'relative',
  top: 0,
  left: 0,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    position: 'relative',
    top: '100px',
    left: 0,
    zIndex: 5,
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const MiniDrawer = () => {
  const location = useLocation();
  const [selectedListItem, setSelectedListItem] = useState(location.pathname);

  const { store } = React.useContext(Context);

  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const listItemImages = {
    Home: <HomeIcon />,
    MenuBook: <MenuBookIcon />,
    Headphones: <HeadphonesIcon />,
    AccessAlarm: <AccessAlarmIcon />,
    BarChart: <BarChartIcon />,
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {open ? (
        <Box
          onClick={handleDrawerToggle}
          sx={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
            left: 0,
            top: 0,
          }}
        />
      ) : (
        ''
      )}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box>
            {pages.map((page) =>
              page.isAuth && !store.isAuth ? null : (
                <Link key={page.text} to={page.link}>
                  <ListItemButton
                    sx={{ display: 'flex' }}
                    selected={selectedListItem === `/${page.link}`}
                    onClick={() => setSelectedListItem(`/${page.link}`)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {listItemImages[`${page.icon}` as keyof typeof listItemImages]}
                    </ListItemIcon>
                    <ListItemText primary={page.text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Link>
              )
            )}
          </Box>
          {store.isAuth ? (
            <Box>
              <ListItemButton onClick={store.logout} sx={{ display: 'flex' }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Выход" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Box>
          ) : (
            ''
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default observer(MiniDrawer);
