import axios from 'axios';

export const baseURL = 'https://rs-react-learnwords.herokuapp.com';
// export const baseURL = 'http://localhost:27017';

export default axios.create({
  // baseURL: 'http://localhost:27017',
  baseURL,
});
