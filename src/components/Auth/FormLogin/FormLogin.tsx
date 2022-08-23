import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import Context from '../../../context';

import $api from '../../../axios';

const FormLogin: React.FC = () => {
  const { store } = React.useContext(Context);

  const [email, setEmail] = React.useState('test@mal.ru');
  const [password, setPassword] = React.useState('12345678');
  const [isSubmittedForm, setIsSubmittedForm] = React.useState(false);

  function onSubmitForm(event: React.SyntheticEvent): void {
    event.preventDefault();
    setIsSubmittedForm(true);
    store.login(email, password).finally(() => setIsSubmittedForm(false));
  }

  return (
    <div>
      <form onSubmit={onSubmitForm} noValidate>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
            '& .MuiTextField-root': { m: '0 0 1.5rem 0' },
          }}
        >
          <TextField
            value={email}
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            value={password}
            fullWidth
            id="password"
            type="password"
            name="password"
            label="Пароль"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<LoginIcon />}
            loading={isSubmittedForm}
            loadingPosition="end"
            size="large"
          >
            Авторизоваться
          </LoadingButton>
        </Box>
      </form>
    </div>
  );
};

export default FormLogin;
