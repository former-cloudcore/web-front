import apiClient from './api-client';
import { PostProps } from '../components/Post/Post';

export const getPosts = async (): Promise<PostProps[]> => {
    const response = await apiClient.get('/post');
    return response.data;
};
