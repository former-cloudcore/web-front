import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import ProfileDropDown from './ProfileDropDown/ProfileDropDown';
import { useEffect, useState } from 'react';
import { getUser } from '../../utils/user-service';
import { refreshToken } from '../../utils/api-client';

export interface NavBarProps {
    toggleBackground: () => void;
    toggleImg: string;
}
const NavBar = (props: NavBarProps) => {
    const [reload, setReload] = useState(0);
    useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    await getUser();
                } catch (error) {
                    console.log(error);

                    try {
                        await refreshToken();
                    } catch (error) {
                    localStorage.removeItem('userId');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    }

                    setReload((prev) => prev + 1);
                }
            }
        })();
    }, []);
    return (
        <div className={styles.navBar} key={reload}>
            <div className={styles.wrapper}>
                <Link className={styles.home} to="/">
                    <img
                        className={styles.homeImg}
                        src="../../../assets/homeButton.png"
                    />
                </Link>
            </div>
            <div className={styles.wrapper}>
                {localStorage.getItem('userId') ? (
                    <ProfileDropDown />
                ) : (
                    <Link className={styles.login} to="/login">
                        Login
                    </Link>
                )}
            </div>

            <div className={styles.wrapper}>
                <div className={styles.toggle} onClick={props.toggleBackground}>
                    <img className={styles.toggleImg} src={props.toggleImg} />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
