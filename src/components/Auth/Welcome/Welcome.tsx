import React from 'react';
import { observer } from 'mobx-react-lite';
import UserNotLogged from '../UserNotLogged/UserNotLogged';
import UserIsLogged from '../UserIsLogged/UserIsLogged';
import Context from '../../../context';

const Welcome: React.FC = () => {
  const { store } = React.useContext(Context);

  return <div>{store.isAuth ? <UserIsLogged /> : <UserNotLogged />}</div>;
};

export default observer(Welcome);
