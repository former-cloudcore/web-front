import { useEffect, useState } from 'react';
import styles from './ProfileDropDown.module.css';
import { getUser } from '../../../utils/user-service';

const ProfileDropDown = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [image, setImage] = useState('');

    useEffect(() => {
        (async () => {
            setImage((await getUser()).image);
        })();
    }, []);

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
    };
    return (
        <div className={styles.profileDropDown} onClick={logout}>
            <img className={styles.profileImg} src={image}  alt='Profile'/>
        </div>
    );
};

export default ProfileDropDown;
