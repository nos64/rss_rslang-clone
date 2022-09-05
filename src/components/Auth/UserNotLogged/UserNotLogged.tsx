/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tab from '@mui/material/Tab';
import FormLogin from '../FormLogin/FormLogin';
import FormRegister from '../FormRegister/FormRegister';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const UserNotLogged: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <LoadingButton
        type="button"
        variant="contained"
        startIcon={<AccountCircleIcon />}
        sx={{ color: '#fff', boxShadow: 'none' }}
        onClick={handleOpen}
      >
        Вход
      </LoadingButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Авторизация/Регистрация"
                centered
              >
                <Tab label="Авторизация" {...a11yProps(0)} />
                <Tab label="Регистрация" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <FormLogin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FormRegister />
            </TabPanel>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UserNotLogged;
