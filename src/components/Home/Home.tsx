import styles from './Home.module.css';
import { PostProps } from '../Post/Post';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';
import * as Api from '../../utils/api-client';

const Home = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    useEffect(() => {
        (async () => {
            const posts = await Api.getPosts();
            setPosts(posts);
        })();
    }, []);

    const renderPosts = posts.map((post) => {
        console.log(post.commentsAmount);
        
        return (
            <Post
                {...post}
                key={post.id}
                onLikeClick={() => handleLikeClick(post.id)}
            />
        );
    });

    const handleLikeClick = (id: number) => {
        const newPosts = posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    isLiked: !post.isLiked,
                };
            }
            return post;
        });
        setPosts(newPosts);
    };

    return (
        <div className={styles.home}>
            should show the posts here but it doesn't
            <div className={styles.postsWrapper}>{renderPosts}</div>
        </div>
    );
};

export default Home;
