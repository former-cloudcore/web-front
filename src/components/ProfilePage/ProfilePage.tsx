import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
import { getUser, updateUser } from '../../utils/user-service';
import CircularProgress from '@mui/material/CircularProgress';
import { formatImage, isGoogleUser } from '../../utils/utils';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Alert from '@mui/material/Alert';

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [imageState, setImageState] = useState<File>();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] =
        useState<boolean>(false); // Add state for error
    const [errorState, setErrorState] = useState<string>('');
    const [user, setUser] = useState({
        _id: '',
        email: '',
        name: '',
        image: '',
    });

    useEffect(() => {
        (async () => {
            try {
                const user = await getUser();
                setUser(user);
                setLoading(false);
            } catch (error) {
                window.location.href = '/';
            }
        })();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageState(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setImageState(undefined);
    };

    const handleChooseNewImage = () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = (e: Event) =>
            handleImageChange(
                e as unknown as React.ChangeEvent<HTMLInputElement>
            );
        inputElement.click();
    };

    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError(e.target.value !== password);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setConfirmPasswordError(e.target.value !== confirmPassword);
    };

    const handleSave = async () => {
        if (confirmPasswordError) {
            setErrorState('Passwords do not match');
            return;
        }
        if (!imageState && !username && !password) {
            setErrorState('No changes made');
            return;
        }

        try {
            await updateUser(username, imageState, password);
            window.location.href = '/';
        } catch (e) {
            setErrorState(
                'An error occurred while updating user. Please try again later.'
            );
        }
    };

    if (loading) {
        return (
            <div className={styles.profilePage}>
                <CircularProgress size="10rem" />
            </div>
        );
    }

    if (isGoogleUser(user)) {
        return (
            <div className={styles.profilePage}>
                <div className={styles.googleWrapper}>
                    Cant Edit Google User
                    <Link to="/" className={styles.googleHomeButton}>
                        Home
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.profilePage}>
            <div className={styles.profileWrapper}>
                <div className={styles.topPart}>
                    <div className={styles.profileImageWrapper}>
                        <img src={formatImage(user.image)} className={styles.profileImage} />
                    </div>
                    <div className={styles.changeProfileImage}>
                        {imageState ? (
                            <div className={styles.uploadedImage}>
                                <div className={styles.uploadImageButtons}>
                                    <button
                                        className={styles.newImage}
                                        onClick={handleChooseNewImage}
                                    >
                                        Choose New Image
                                    </button>
                                    <button
                                        className={styles.removeImage}
                                        onClick={handleRemoveImage}
                                    >
                                        Remove Image
                                    </button>
                                </div>
                                <img
                                    src={URL.createObjectURL(imageState)}
                                    alt="uploaded image"
                                />
                            </div>
                        ) : (
                            <>
                                <div className={styles.uploadImage}>
                                    <div className={styles.text}>
                                        Choose a new profile image
                                    </div>
                                    <div className={styles.imageInput}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.profileInfo}>
                    {errorState && (
                        <Alert className={styles.alert} severity="error">
                            {errorState}
                        </Alert>
                    )}
                    <div className={styles.userName}>
                        <div className={styles.currentUsername}>
                            Current Username: {user.name}
                        </div>
                        <div className={styles.usernameInput}>
                            <input
                                type="text"
                                placeholder="new username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className={styles.password}>
                        <div className={styles.passwordText}>
                            <div className={styles.currentPassword}>
                                New Password
                            </div>
                        </div>
                        <div className={styles.passwordInput}>
                            <input
                                type="password"
                                placeholder="new password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.confirmPassword}>
                            <input
                                type="password"
                                placeholder="confirm new password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={classNames([
                                    styles.input,
                                    {
                                        [styles.errorInput]:
                                            confirmPasswordError,
                                    },
                                ])}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Link to="/" className={styles.link}>
                        <div className={styles.generalButton}>Home</div>
                    </Link>
                    <div className={styles.generalButton} onClick={handleSave}>
                        Save
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
