import apiClient from './api-client';
import { PostProps } from '../components/Home/Post/Post';

const DEFAULT_POST = {
    _id: 'default',
    text: '',
    image: '',
    usersWhoLiked: [],
    createdBy: {
        _id: '',
        name: '',
        image: '',
    },
    date: '',
    __v: 0,
    commentsAmount: 0,
    imagePath: '',
};
interface PostsResponse {
    _id: string;
    text: string;
    image: string;
    usersWhoLiked: string[];
    createdBy: {
        _id: string;
        name: string;
        image: string;
    };
    date: string;
    __v: number;
    comments_amount: number;
}
export const getPosts = async (): Promise<PostProps[]> => {
    const data: PostsResponse[] = (await apiClient.get('/post')).data;

    return data.map((post: PostsResponse) => ({
        ...DEFAULT_POST,
        ...post,
        date: new Date(post.date),
        id: post._id,
        commentsAmount: post.comments_amount,
        createdBy: post.createdBy || DEFAULT_POST.createdBy, // Add null check here
    }));
};

export const likePost = async (postId: string): Promise<void> => {
    await apiClient.post(`/post/like/${postId}`);
};

export const unlikePost = async (postId: string): Promise<void> => {
    await apiClient.post(`/post/unlike/${postId}`);
};
