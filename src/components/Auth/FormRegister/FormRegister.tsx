import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoadingButton from '@mui/lab/LoadingButton';
import { createdUser } from '../../../api/Users';

const FormRegister: React.FC = () => {
  const [newUser, setNewUser] = React.useState({
    name: 'test',
    email: 'test@mal.ru',
    password: '12345678',
  });
  const [isSubmittedForm, setIsSubmittedForm] = React.useState(false);

  const changeInputForm = (event: React.SyntheticEvent): void => {
    setNewUser((prevObj) => {
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

    createdUser(newUser).then((resolve) => {
      if (resolve === true) {
        console.log('Пользователь успешно создан');
      } else {
        console.log('Ошибка при создании пользователя');
      }
      setIsSubmittedForm(false);
    });
  };

  return (
    <form onSubmit={onSubmitForm} noValidate>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          '& .MuiTextField-root': { m: '0 0 1.5rem 0' },
        }}
      >
        <TextField
          onInput={changeInputForm}
          value={newUser.name}
          fullWidth
          id="name"
          name="name"
          label="Логин"
          variant="outlined"
          required
        />
        <TextField
          onInput={changeInputForm}
          value={newUser.email}
          fullWidth
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          label="E-mail"
          variant="outlined"
          required
          // error={!isSubmittedForm}
          // helperText="Incorrect entry."
        />
        <TextField
          onInput={changeInputForm}
          value={newUser.password}
          fullWidth
          id="password"
          name="password"
          type="password"
          label="Пароль"
          variant="outlined"
          required
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          endIcon={<PersonAddIcon />}
          loading={isSubmittedForm}
          loadingPosition="end"
          size="large"
        >
          Зарегистрироваться
        </LoadingButton>
      </Box>
    </form>
  );
};

export default FormRegister;
