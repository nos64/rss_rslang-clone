import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { login, registration, checkAuth } from '../api/Auth';

class Store {
  userName = '';

  userId = '';

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

  setUserId(value: string) {
    this.userId = value;
  }

  setUserName(value: string) {
    this.userName = value;
    localStorage.setItem('userName', value);
  }

  setIsCheckAuth(value: boolean) {
    this.isCheckAuth = value;
  }

  async login(email: string, password: string) {
    try {
      const response = await login(email, password);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      this.setAuth(true);
      this.setUserId(response.data.userId);
      this.setUserName(response.data.name);
    } catch (error) {
      console.log(error, 'login - store/index.ts');
    }
  }

  async registration(name: string, email: string, password: string) {
    try {
      const responseReg = await registration(name, email, password);
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
        this.setUserId(userId);
        if (userName) this.setUserName(userName);
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        (error?.response?.status === 401 || error?.response?.status === 403)
      ) {
        this.logout();
      }
      console.log(error, 'checkAuth - store/index.ts');
    }
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.setAuth(false);
    this.setUserId('');
    this.setUserName('');
  }
}
const store = new Store();
export default store;
