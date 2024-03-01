import styles from './CreatePost.module.css';
import usePostCheckingUserHook from './usePostsCheckingUserHook';

const CreatePost = () => {
    const { loggedIn, loading, notLoggedInRender } = usePostCheckingUserHook();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!loggedIn) {
        return notLoggedInRender;
    }
    return <div className={styles.createPost}>create posts</div>;
};

export default CreatePost;
