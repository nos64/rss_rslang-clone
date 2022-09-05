import React from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../context';
import Statistics from '../../components/Statistics/Main/Main';
import PageTitle from '../../components/PageTitle/PageTitle';

const Stats = () => {
  const { store } = React.useContext(Context);

  return (
    <div>
      {store.isAuth ? (
        <Statistics />
      ) : (
        <PageTitle title="Для просмотра страницы нужно авторизоваться" />
      )}
    </div>
  );
};

export default observer(Stats);
