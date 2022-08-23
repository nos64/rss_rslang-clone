import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { login, registration, checkAuth } from '../api/Auth';

class Store {
  userName = '';

  isCheckAuth = false;

  isAuth = false;

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );
  }

  setAuth(value: boolean) {
    this.isAuth = value;
  }

  setUserName(value: string) {
    this.userName = value;
  }

  setIsCheckAuth(value: boolean) {
    this.isCheckAuth = value;
  }

  async login(email: string, password: string) {
    try {
      const response = await login(email, password);
      console.log('log--', response);

      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      this.setAuth(true);
      this.setUserName(response.data.name);
    } catch (error) {
      console.log(error, 'login - store/index.ts');
    }
  }

  async registration(name: string, email: string, password: string) {
    try {
      const responseReg = await registration(name, email, password);
      console.log('reg--', responseReg);
      if (responseReg.status !== 200) throw Error('Ошибка при регистрации');
      await this.login(email, password);
    } catch (error) {
      console.log(error, 'registration - store/index.ts');
      throw error;
    }
  }

  async checkAuth() {
    try {
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');

      if (userId && !this.isCheckAuth) {
        this.setIsCheckAuth(true);
        const response = await checkAuth(userId);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        this.setAuth(true);
        if (userName) this.setUserName(userName);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.status === 401) {
        this.logout();
      }
      console.log(error, 'checkAuth - store/index.ts');
    }
  }

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.setAuth(false);
    this.setUserName('');
  }
}
const store = new Store();
export default store;
