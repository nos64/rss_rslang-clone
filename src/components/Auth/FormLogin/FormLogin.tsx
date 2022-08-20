import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import signIn from '../../../api/SignIn';

const FormLogin: React.FC = () => {
  const [user, setUser] = React.useState({
    email: 'test@mal.ru',
    password: '12345678',
  });
  const [isSubmittedForm, setIsSubmittedForm] = React.useState(false);

  const changeInputForm = (event: React.SyntheticEvent): void => {
    setUser((prevObj) => {
      const targetElement = event.target as HTMLInputElement;
      return {
        ...prevObj,
        [targetElement.name]: targetElement.value,
      };
    });
  };

  const onSubmitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsSubmittedForm(true);

    signIn(user).then((resolve) => {
      if (resolve === false) {
        console.log('Ошибка авторизации');
      } else {
        console.log('Авторизация прошла успешна');
      }
      setIsSubmittedForm(false);
    });
  };

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
            value={user.email}
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            onInput={changeInputForm}
          />
          <TextField
            value={user.password}
            fullWidth
            id="password"
            type="password"
            name="password"
            label="Пароль"
            variant="outlined"
            onInput={changeInputForm}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            endIcon={<LoginIcon />}
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
