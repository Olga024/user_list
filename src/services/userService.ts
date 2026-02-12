import axios from 'axios';
import { CreateUserData, TUserData, UpdateUserData } from '../types/user';

const API_BASE_URL = 'YOUR_MOCKAPI_URL'; // ← ВСТАВЬ СЮДА URL mockapi.io

export const userService = {
  // ← ВСТАВЬ СЮДА ФУНКЦИЮ getUsers
  getUsers: async (): Promise<TUserData[]> => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  },

  // ← ВСТАВЬ СЮДА ФУНКЦИЮ createUser
  createUser: async (data: CreateUserData): Promise<TUserData> => {
    const response = await axios.post(`${API_BASE_URL}/users`, data);
    return response.data;
  },

  // ← ВСТАВЬ СЮДА ФУНКЦИЮ updateUser
  updateUser: async (data: UpdateUserData): Promise<TUserData> => {
    const response = await axios.put(`${API_BASE_URL}/users/${data.id}`, data);
    return response.data;
  },

  // ← ВСТАВЬ СЮДА ФУНКЦИЮ deleteUser (для модалки редактирования)
  deleteUser: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  },
};
