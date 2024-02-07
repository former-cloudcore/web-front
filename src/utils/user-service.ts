import axios from 'axios';
import apiClient from './api-client';

export interface loginInterface {
    email: string;
    password: string;
}

interface loginResponse {
    accessToken: string;
    refreshToken: string;
}
export const loginUser = async (
    email: string,
    password: string
): Promise<void> => {
    const { data, status } = await apiClient.post('/auth/login', {
        email,
        password,
    });
    if (status !== 200) {
        throw new Error('Error logging in');
    }
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
};
