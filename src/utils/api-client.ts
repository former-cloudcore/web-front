import axios from 'axios';
import { SERVER_URL } from './consts';

const apiClient = axios.create({
    baseURL: SERVER_URL,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token found');
    }
    const unintercepted = axios.create();
    const { data } = await unintercepted.get(`${SERVER_URL}/auth/refresh`, {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
};

export default apiClient;
