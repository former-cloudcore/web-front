import styles from './Home.module.css';
import { PostProps } from '../Post/Post';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';
import { getPosts } from '../../utils/posts-service';
import CreatePostButton from '../CreatePost/CreatePostButton/CreatePostButton';

const Home = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    useEffect(() => {
        (async () => {
            const posts = await getPosts();
            setPosts(posts);
        })();
    }, []);

    const renderPosts = posts.map((post) => {
        return <Post {...post} key={post.id} />;
    });

    return (
        <div className={styles.home}>
            <div className={styles.postsWrapper}>{renderPosts}</div>
            <div className={styles.createPostWrapper}>
                <CreatePostButton />
            </div>
        </div>
    );
};

export default Home;
