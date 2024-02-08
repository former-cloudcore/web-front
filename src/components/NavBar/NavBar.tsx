import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import classNames from 'classnames';

export interface NavBarProps {
    toggleBackground: () => void;
    toggleImg: string;
}
const NavBar = (props: NavBarProps) => {
    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
    };

    return (
        <div className={styles.navBar}>
            <Link className={styles.home} to="/">
                <img
                    className={styles.homeImg}
                    src="../../../assets/homeButton.png"
                />
            </Link>
            {localStorage.getItem('userId') ? (
                <div className={classNames(styles.login, styles.logout)} onClick={logout}>
                    Logout
                </div>
            ) : (
                <Link className={styles.login} to="/login">
                    Login
                </Link>
            )}

            <div className={styles.toggle} onClick={props.toggleBackground}>
                <img className={styles.toggleImg} src={props.toggleImg} />
            </div>
        </div>
    );
};

export default NavBar;
