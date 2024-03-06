import { useEffect, useState } from 'react';
import styles from './ProfileDropDown.module.css';
import { getUser } from '../../../utils/user-service';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SERVER_URL } from '../../../utils/consts';

const ProfileDropDown = () => {
    const [enchorEl, setEnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(enchorEl);
    const [image, setImage] = useState('');

    useEffect(() => {
        (async () => {
            setImage(SERVER_URL + (await getUser()).image);
        })();
    }, []);

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
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
                <MenuItem onClick={() => setEnchorEl(null)}>Profile</MenuItem>
                <MenuItem onClick={() => setEnchorEl(null)}>
                    My account
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileDropDown;
