import apiClient from './api-client';

export const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();

    formData.append('file', image);
    const response = await apiClient.post('/file', formData);
    if (response.status !== 200) {
        throw new Error('Error uploading image');
    }
    return response.data.url;
};

