import apiClient from './api-client';
import { PostProps } from '../components/Home/Post/Post';
import { uploadImage } from './file-service';

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

    return data
        .map((post: PostsResponse) => ({
            ...DEFAULT_POST,
            ...post,
            imagePath: post.image,
            date: new Date(post.date),
            id: post._id,
            commentsAmount: post.comments_amount,
            createdBy: post.createdBy || DEFAULT_POST.createdBy, // Add null check here
        }))
        .reverse();
};

export const likePost = async (postId: string): Promise<void> => {
    await apiClient.post(`/post/like/${postId}`);
};

export const unlikePost = async (postId: string): Promise<void> => {
    await apiClient.post(`/post/unlike/${postId}`);
};

export const createPostWithImage = async (
    text: string,
    image: File
): Promise<void> => {
    const path = await uploadImage(image);
    console.log(path);

    const response = await apiClient.post('/post', { text, image: path });
    console.log(response);
};

export const createPostWithPrompt = async (
    text: string,
    prompt: string
): Promise<void> => {
    const response = await apiClient.post('/post', {
        text,
        image_prompt: prompt,
    });
    console.log(response);
};

export const deletePost = async (postId: string): Promise<void> => {
    await apiClient.delete(`/post/${postId}`);
};