import apiClient from './api-client';
import { PostProps } from '../components/Post/Post';
import { SERVER_URL } from './consts';

export const getPosts = async (): Promise<PostProps[]> => {
    const { status, data } = await apiClient.get('/post');

    return data.map((post) => ({
        ...post,
        date: new Date(post.date),
        id: post._id,
        commentsAmount: post.comments_amount,
        imagePath: post.image,
    }));
};

export const likePost = async (postId: string): Promise<void> => {
    const { status } = await apiClient.post(
        `/post/like/${postId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }
    );
};

export const unlikePost = async (postId: string): Promise<void> => {
    const { status } = await apiClient.post(
        `/post/unlike/${postId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }
    );
};
