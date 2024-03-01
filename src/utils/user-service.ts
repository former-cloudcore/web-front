import apiClient from './api-client';

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

interface UserResponse {
    _id: string;
    email: string;
    name: string;
    image: string;
    __v: number;
}
export const getUser = async (): Promise<UserResponse> => {
    const { data, status } = await apiClient.get('/user/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (status !== 200) {
        throw new Error('Error getting user');
    }
    console.log(data);

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
    console.log(imageUrl);

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

export const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();

    formData.append('file', image);
    const response = await apiClient.post('/file', formData);
    if (response.status !== 200) {
        throw new Error('Error uploading image');
    }
    return response.data.url;
};

export const getUsers = async (): Promise<UserResponse[]> => {
    const { data, status } = await apiClient.get('/user', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (status !== 200) {
        throw new Error('Error getting users');
    }
    console.log(data);

    return data;
};
