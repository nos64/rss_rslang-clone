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
  const [isSubmittedForm, setIsSubmittedForm] = React.useState(false);

  function onSubmitForm(event: React.SyntheticEvent): void {
    event.preventDefault();
    setIsSubmittedForm(true);
    store.registration(name, email, password).finally(() => setIsSubmittedForm(false));
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
          value={name}
          fullWidth
          id="name"
          name="name"
          label="Логин"
          variant="outlined"
          required
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
          startIcon={<PersonAddIcon />}
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
