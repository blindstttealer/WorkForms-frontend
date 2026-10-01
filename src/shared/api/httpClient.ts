import axios from 'axios';
export const httpClient = axios.create({
  baseURL: 'localhost:3000/',
  withCredentials: true,
});
