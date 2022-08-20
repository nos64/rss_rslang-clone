import axios from 'axios';

const USERS_API_URL = `http://localhost:27017/signin`;

interface RequestSignInInterface {
  message: 'string';
  token: 'string';
  refreshToken: 'string';
  userId: 'string';
  name: 'string';
}
interface SignInInterface {
  email: string;
  password: string;
}

export default async function signIn(
  user: SignInInterface
): Promise<RequestSignInInterface | boolean> {
  try {
    const response = await axios.post(USERS_API_URL, user, {
      headers: { 'Content-Type': 'application/json' },
    });
    // 403 incorrect email and password
    if (response.status !== 200) return false;
    return response.data;
  } catch (error) {
    console.log(`Error app/SignIn.ts -> signIn ${error}`);
    return false;
  }
}
