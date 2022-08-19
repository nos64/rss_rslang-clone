import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';

const FormRegister: React.FC = () => {
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
          <TextField fullWidth id="email" type="email" label="E-mail" variant="outlined" />
          <TextField fullWidth id="password" type="password" label="Пароль" variant="outlined" />
          <Button fullWidth variant="contained" endIcon={<PersonAddIcon />} size="large">
            Зарегистрироваться
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default FormRegister;
