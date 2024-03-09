import styles from './userNotLoggedIn.module.css';
import { UserResponse, getUser } from '../../utils/user-service';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface usePostCheckingUserHookProps {
    middleText: string;
}
interface usePostCheckingUserHookReturn {
    loggedIn: boolean;
    loading: boolean;
    notLoggedInRender: JSX.Element;
    user: UserResponse;
}

const usePostCheckingUserHook = (props: usePostCheckingUserHookProps): usePostCheckingUserHookReturn => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserResponse>({} as UserResponse);
    useEffect(() => {
        (async () => {
            try {
                const user: UserResponse = await getUser();
                if (user) {
                    setUser(user);
                    setLoggedIn(true);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, []);

    const notLoggedInRender = (
        <div className={styles.notLoggedWrapper}>
            <div className={styles.wrapper}>
                <div className={styles.notLogged}>You are not logged in</div>
                <div className={styles.notLogged}>
                    {props.middleText}
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

    return { loggedIn, loading, notLoggedInRender, user };
};

export default usePostCheckingUserHook;
