import React from 'react';
import store from '../store';

interface StoreInterface {
  store: typeof store;
}

const Context = React.createContext<StoreInterface>({ store });

export default Context;
