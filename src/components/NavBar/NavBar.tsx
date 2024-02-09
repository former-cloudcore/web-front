import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import classNames from 'classnames';
import ProfileDropDown from './ProfileDropDown/ProfileDropDown';

export interface NavBarProps {
    toggleBackground: () => void;
    toggleImg: string;
}
const NavBar = (props: NavBarProps) => {
    return (
        <div className={styles.navBar}>
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
