import React from 'react';
import TextField from '@mui/material/TextField';
import $api from '../../axios';

const Profile: React.FC = () => {
  const [birthDate, setBirthDate] = React.useState('');

  async function gg() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const response = await $api.put(`/users/${userId}`, { name: 'test3333' });
      console.log(response);
    }
  }

  return (
    <div>
      <form noValidate>
        <TextField
          value={birthDate}
          fullWidth
          id="birth-day"
          name="birth-day"
          label="Дата рождения"
          variant="outlined"
        />
      </form>
      <button type="button" onClick={gg}>
        Тык
      </button>
    </div>
  );
};

export default Profile;
