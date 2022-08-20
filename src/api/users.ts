import axios from 'axios';
import { UserInterface } from '../types/common';

const USERS_API_URL = `http://localhost:27017/users`;

export async function createdUser(user: UserInterface): Promise<boolean> {
  try {
    const response = await axios.post(USERS_API_URL, user, {
      headers: { 'Content-Type': 'application/json' },
    });
    // 417 - Такой пользак уже есть
    if (response.status !== 200) return false;
    return true;
  } catch (error) {
    console.log(`Error app/Users.ts -> createdUser ${error}`);
    return false;
  }
}

export const gg = '123';
