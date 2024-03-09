import styles from './Home.module.css';
import { PostProps } from './Post/Post';
import { useEffect, useState } from 'react';
import Post from './Post/Post';
import { getPosts } from '../../utils/posts-service';
import CreatePostButton from '../CreatePost/CreatePostButton/CreatePostButton';
import { FaPlus } from 'react-icons/fa';
import { SiRocketdotchat } from 'react-icons/si';
import Switch from '@mui/material/Switch';

const Home = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<PostProps[]>([]);
    const [onlyMyPosts, setOnlyMyPosts] = useState(false);
    useEffect(() => {
        (async () => {
            const posts = await getPosts();
            setPosts(posts);
        })();
    }, []);

    useEffect(() => {
        setFilteredPosts(
            onlyMyPosts
                ? posts.filter(
                      (post) =>
                          post.createdBy._id === localStorage.getItem('userId')
                  )
                : posts
        );
    }, [onlyMyPosts, posts]);

    const renderPosts = filteredPosts.map((post) => {
        return (
            <Post
                {...post}
                key={post.id}
                onClick={() => {
                    window.location.href = `post/${post.id}`;
                }}
            />
        );
    });

    return (
        <div className={styles.home}>
            {localStorage.getItem('userId') ? (
                <div className={styles.toggleWrapper}>
                    <Switch
                        onChange={() => setOnlyMyPosts((checked) => !checked)}
                    />
                    Only show my posts
                </div>
            ) : null}
            <div className={styles.chatButtonWrapper}>
                <CreatePostButton
                    linkTo="/chat"
                    tooltipText="Go to chat"
                    icon={SiRocketdotchat}
                />
            </div>
            <div className={styles.postsWrapper}>{renderPosts}</div>
            <div className={styles.createPostWrapper}>
                <CreatePostButton
                    linkTo="/createPost"
                    tooltipText="Create a new post"
                    icon={FaPlus}
                />
            </div>
        </div>
    );
};

export default Home;
