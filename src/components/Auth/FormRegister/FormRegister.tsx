import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoadingButton from '@mui/lab/LoadingButton';
import Context from '../../../context';

const FormRegister: React.FC = () => {
  const { store } = React.useContext(Context);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [formErrors, setFormErrors] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmittedForm, setIsSubmittedForm] = React.useState(false);

  function validateFields(fieldName: keyof typeof formErrors): boolean {
    let errorMessage = '';
    switch (fieldName) {
      case 'name': {
        const nameValid = name.length >= 3;
        if (!nameValid) errorMessage = 'Имя не менее 3-х символов';
        break;
      }
      case 'email': {
        if (!email.length) {
          errorMessage = 'Введите Email';
        } else {
          const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          if (!emailValid) errorMessage = 'Email введен не верно';
        }
        break;
      }
      case 'password': {
        const passwordValid = password.length >= 8;
        if (!passwordValid) errorMessage = 'Пароль не менее 8-ми символов';
        break;
      }
      default:
        break;
    }
    formErrors[fieldName] = errorMessage;
    setFormErrors({ ...formErrors });

    return !errorMessage;
  }

  function onBlurInput(event: React.SyntheticEvent): void {
    const element = event.target;
    if (element instanceof HTMLInputElement && element.name in formErrors)
      validateFields(element.name as keyof typeof formErrors);
  }

  function onSubmitForm(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (validateFields('name') && validateFields('email') && validateFields('password')) {
      setIsSubmittedForm(true);
      store
        .registration(name, email, password)
        .catch((e) => {
          if (e.response.status === 417) {
            formErrors.email = 'Email уже занят';
            setFormErrors({ ...formErrors });
          }
        })
        .finally(() => setIsSubmittedForm(false));
    }
  }

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
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => onBlurInput(e)}
          value={name}
          fullWidth
          id="name"
          name="name"
          label="Логин"
          variant="outlined"
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => onBlurInput(e)}
          value={email}
          fullWidth
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          label="E-mail"
          variant="outlined"
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => onBlurInput(e)}
          value={password}
          fullWidth
          id="password"
          name="password"
          type="password"
          label="Пароль"
          variant="outlined"
          error={!!formErrors.password}
          helperText={formErrors.password}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          startIcon={<PersonAddIcon />}
          loading={isSubmittedForm}
          size="large"
        >
          Зарегистрироваться
        </LoadingButton>
      </Box>
    </form>
  );
};

export default FormRegister;
