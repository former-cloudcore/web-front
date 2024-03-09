import { useEffect, useState } from 'react';
import styles from './ProfileDropDown.module.css';
import { getUser, logoutUser } from '../../../utils/user-service';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { formatImage } from '../../../utils/utils';
import { Link } from 'react-router-dom';

const ProfileDropDown = () => {
    const [enchorEl, setEnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(enchorEl);
    const [image, setImage] = useState('');

    useEffect(() => {
        (async () => {
            const user = await getUser();
            setImage(formatImage(user.image));
        })();
    }, []);

    const logout = async () => {
        await logoutUser();
        window.location.reload();
    };
    return (
        <div className={styles.profileDropDown}>
            <div
                className={styles.imgWrapper}
                onClick={(e) => setEnchorEl(e.currentTarget)}
            >
                <img className={styles.profileImg} src={image} alt="Profile" />
            </div>
            <Menu
                id="basic-menu"
                anchorEl={enchorEl}
                open={open}
                onClose={() => setEnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className={styles.menu}
            >
                <Link to="/profile" className={styles.link}>
                    <MenuItem>Profile</MenuItem>
                </Link>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileDropDown;
