import apiClient from './api-client';
import { uploadImage } from './file-service';

export interface loginInterface {
    email: string;
    password: string;
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

export interface UserResponse {
    _id: string;
    email: string;
    name: string;
    image: string;
    __v: number;
}
export const getUser = async (): Promise<UserResponse> => {
    console.log('getting user');
    
    const { data, status } = await apiClient.get('/user/profile');
    if (status !== 200) {
        throw new Error('Error getting user');
    }

    return data;
};

interface registerResponse {
    email: string;
    name: string;
    image: string;
    _id: string;
    __v: number;
    accessToken: string;
    refreshToken: string;
}
export const signUpUser = async (
    email: string,
    password: string,
    name: string,
    image?: File
): Promise<void> => {
    const imageUrl = image ? await uploadImage(image) : undefined;

    const response = await apiClient.post('/auth/register', {
        email,
        password,
        name,
        image: imageUrl,
    });
    const data: registerResponse = response.data;
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userId', data._id);
};

export const getUsers = async (): Promise<UserResponse[]> => {
    const { data, status } = await apiClient.get('/user');
    if (status !== 200) {
        throw new Error('Error getting users');
    }

    return data;
};
