import styles from './Home.module.css';
import { PostProps } from './Post/Post';
import { useEffect, useState } from 'react';
import Post from './Post/Post';
import { getPosts } from '../../utils/posts-service';
import CreatePostButton from '../CreatePost/CreatePostButton/CreatePostButton';
import { FaPlus } from 'react-icons/fa';
import { SiRocketdotchat } from 'react-icons/si';

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
            <div className={styles.chatButtonWrapper}>
                <CreatePostButton linkTo="/chat" tooltipText='Go to chat' icon={SiRocketdotchat} />
            </div>
            <div className={styles.postsWrapper}>{renderPosts}</div>
            <div className={styles.createPostWrapper}>
                <CreatePostButton linkTo="/createPost" tooltipText='Create a new post' icon={FaPlus} />
            </div>
        </div>
    );
};

export default Home;
