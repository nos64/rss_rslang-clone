import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Context from '../../context';
import { getUserInfo, setUserInfo } from '../../api/Users';
import { UserInterface } from '../../types/common';

const ProfileModal: React.FC = () => {
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

  const [open, setOpen] = React.useState(false);
  const [isLadedUserInfo, setIsLadedUserInfo] = React.useState(false);

  const handleOpen = () => {
    setIsLadedUserInfo(true);
    getUserInfo(store.userId)
      .then((userInfo) => {
        setName(userInfo.data.name);
        setEmail(userInfo.data.email);
        setPassword('');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setOpen(true);
        setIsLadedUserInfo(false);
      });
  };
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
        const passwordValid = password.length >= 8 || !password.length;
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
    if (
      store.userId &&
      validateFields('name') &&
      validateFields('email') &&
      validateFields('password')
    ) {
      setIsSubmittedForm(true);
      const userInfo: UserInterface = {
        name,
        email,
      };
      if (password.length) userInfo.password = password;
      setUserInfo(store.userId, userInfo)
        .then(() => {
          setOpen(false);
          store.setUserName(userInfo.name);
        })
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
    <div>
      <LoadingButton
        type="button"
        variant="contained"
        startIcon={<AccountCircleIcon />}
        loading={isLadedUserInfo}
        size="large"
        onClick={handleOpen}
      >
        Профиль
      </LoadingButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, textAlign: 'center' }}>
              <Typography variant="h5">Редактировать профиль</Typography>
            </Box>
            <form onSubmit={onSubmitForm} noValidate>
              <Box
                sx={{
                  width: 500,
                  p: 3,
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
                  startIcon={<SystemUpdateAltIcon />}
                  loading={isSubmittedForm}
                  size="large"
                >
                  Сохранить
                </LoadingButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
