import apiClient from './api-client';
import { PostProps } from '../components/Home/Post/Post';
import { uploadImage } from './file-service';

export const DEFAULT_POST = {
    _id: 'default',
    text: '',
    image: '',
    usersWhoLiked: [],
    createdBy: {
        _id: '',
        name: '',
        image: '',
    },
    date: new Date(),
    __v: 0,
    commentsAmount: 0,
    imagePath: '',
    id: '',
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

export interface fullPostResponse {
    text: string;
    image: string;
    usersWhoLiked: string[];
    createdBy: {
        _id: string;
        name: string;
        image: string;
    };
    date: Date;
    __v: number;
    commentsAmount: number;
    comments: {
        _id: string;
        user: {
            _id: string;
            name: string;
            image: string;
        };
        text: string;
    }[];
    imagePath: string;
    id: string;
}

export const getPost = async (postId: string): Promise<fullPostResponse> => {
    const data = (await apiClient.get(`/post/${postId}`)).data;

    return {
        ...DEFAULT_POST,
        ...data,
        imagePath: data.image,
        date: new Date(data.date),
        id: data._id,
        commentsAmount: data.comments.length,
        createdBy: data.createdBy || DEFAULT_POST.createdBy, // Add null check here
    };
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

    await apiClient.post('/post', { text, image: path });
};

export const createPostWithPrompt = async (
    text: string,
    prompt: string
): Promise<void> => {
    await apiClient.post('/post', {
        text,
        image_prompt: prompt,
    });
};

export const deletePost = async (postId: string): Promise<void> => {
    await apiClient.delete(`/post/${postId}`);
};

export const createComment = async (
    postId: string,
    text: string
): Promise<fullPostResponse> => {
    const data = (await apiClient.post(`/post/comment/${postId}`, { text }))
        .data;

    return {
        ...DEFAULT_POST,
        ...data,
        imagePath: data.image,
        date: new Date(data.date),
        id: data._id,
        commentsAmount: data.comments.length,
        createdBy: data.createdBy || DEFAULT_POST.createdBy, // Add null check here
    };
};

export const updatePost = async (
    postId: string,
    text?: string,
    image?: File
): Promise<void> => {
    const body: {
        _id: string;
        text?: string;
        image?: string;
    } = { _id: postId };
    if (text) {
        body['text'] = text;
    }
    if (image) {
        body['image'] = await uploadImage(image);
    }

    await apiClient.put(`/post`, body);
};
