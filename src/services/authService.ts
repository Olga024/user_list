import axios from 'axios';

export const authenticate = async (data: { login: string; password: string }): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.login === 'admin' && data.password === 'admin') {
        resolve('mock-jwt-token-12345');
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 2000);
  });
};

export const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});
