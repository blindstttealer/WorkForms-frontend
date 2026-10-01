import { ApiService } from './api-service';
import { io } from 'socket.io-client';
const apiService = new ApiService({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 10000,
});
export const socket = io(process.env.REACT_APP_API_URL, {
  withCredentials: true,
  autoConnect: true,
  reconnection: true,
});
export { apiService };
