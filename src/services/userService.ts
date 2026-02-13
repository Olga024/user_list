import axios from 'axios';
import { CreateUserData, TUserData, UpdateUserData } from '../types/user';

const API_BASE_URL = 'https://698e1f92aded595c25312278.mockapi.io/v1';

export const userService = {

    getUsers: async (): Promise<TUserData[]> => {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    },

    createUser: async (data: CreateUserData): Promise<TUserData> => {
        const response = await axios.post(`${API_BASE_URL}/users`, data);
        return response.data;
    },

    updateUser: async (data: UpdateUserData): Promise<TUserData> => {
        const response = await axios.put(`${API_BASE_URL}/users/${data.id}`, data);
        return response.data;
    },

    deleteUser: async (id: number): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
    },
};
