import apiClient from './api-client';
import { PostProps } from '../components/Home/Post/Post';




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
        ...post,
        date: new Date(post.date),
        id: post._id,
        commentsAmount: post.comments_amount,
        imagePath: post.image,
    }));
};

export const likePost = async (postId: string): Promise<void> => {
    await apiClient.post(
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
    await apiClient.post(
        `/post/unlike/${postId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }
    );
};
