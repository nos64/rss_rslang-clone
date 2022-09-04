import React from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../context';
import Statistics from '../../components/Statistics/Main/Main';

const Stats = () => {
  const { store } = React.useContext(Context);

  return <div>{store.isAuth ? <Statistics /> : 'Авторизуйтесь'}</div>;
};

export default observer(Stats);
