import { useEffect, useState } from 'react';
import styles from './CreatePost.module.css';
import { getUser } from '../../utils/user-service';
import { Link } from 'react-router-dom';

const CreatePost = () => {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await getUser();
                setLoggedIn(true);
                setLoading(false);
            } catch (error) {
                setLoggedIn(false);
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!loggedIn) {
        return (
            <div className={styles.notLoggedWrapper}>
                <div className={styles.wrapper}>
                    <div className={styles.notLogged}>
                        You are not logged in
                    </div>
                    <div className={styles.notLogged}>
                        Please log in to create a post
                    </div>
                    <div className={styles.notLogged}>
                        Or sign up if you don't have an account
                    </div>
                    <div className={styles.linksWrapper}>
                        <Link to="/login" className={styles.link}>
                            Log in
                        </Link>
                        <Link to="/" className={styles.link}>
                            Home
                        </Link>
                        <Link to="/signup" className={styles.link}>
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    return <div className={styles.createPost}>create posts</div>;
};

export default CreatePost;
