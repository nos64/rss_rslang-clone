import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';

const FormLogin: React.FC = () => {
  return (
    <div>
      <form action="">
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
            '& .MuiTextField-root': { m: '0 0 1.5rem 0' },
          }}
        >
          <TextField fullWidth id="name" label="Логин" variant="outlined" />
          <TextField fullWidth id="password" type="password" label="Пароль" variant="outlined" />
          <Button fullWidth variant="contained" endIcon={<LoginIcon />} size="large">
            Авторизоваться
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default FormLogin;
