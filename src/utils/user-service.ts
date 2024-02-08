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
    localStorage.setItem('userId', (await getUser())._id);
};

interface userResponse {
    _id: string;
    email: string;
    name: string;
    image: string;
    __v: number;
}
export const getUser = async (): Promise<userResponse> => {
    const { data, status } = await apiClient.get('/user/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (status !== 200) {
        throw new Error('Error getting user');
    }
    return data;
};
