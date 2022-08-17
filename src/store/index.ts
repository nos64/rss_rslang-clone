import { makeAutoObservable } from 'mobx';

class Store {
  // properties

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );
  }

  // methods for properties
}

const store = new Store();
export default store;
