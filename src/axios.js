import axios from 'axios';

// Optionally set a base URL
const instance = axios.create({
  baseURL: 'https://your-api-base-url.com'
});

export default instance;