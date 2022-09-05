import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import Context from '../../../context';

const FormLogin: React.FC = () => {
  const { store } = React.useContext(Context);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [formErrors, setFormErrors] = React.useState({
    email: '',
    password: '',
  });
  const [isSubmittedForm, setIsSubmittedForm] = React.useState(false);

  function validateFields(fieldName: keyof typeof formErrors): boolean {
    let errorMessage = '';
    switch (fieldName) {
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

  function onSubmitForm(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (validateFields('email') && validateFields('password')) {
      setIsSubmittedForm(true);
      store.login(email, password).finally(() => setIsSubmittedForm(false));
    }
  }

  function onBlurInput(event: React.SyntheticEvent): void {
    const element = event.target;
    if (element instanceof HTMLInputElement && element.name in formErrors)
      validateFields(element.name as keyof typeof formErrors);
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
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => onBlurInput(e)}
            value={email}
            fullWidth
            id="email"
            name="email"
            label="Email"
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
            type="password"
            name="password"
            label="Пароль"
            variant="outlined"
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<LoginIcon />}
            loading={isSubmittedForm}
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
