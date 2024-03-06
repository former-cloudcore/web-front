import * as React from 'react';
import styles from './SignUp.module.css';
import classNames from 'classnames';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { signUpUser } from '../../../utils/user-service';
import { isAxiosError } from 'axios';

const SignUp = () => {
    const [emailState, setEmailState] = React.useState('');
    const [passwordState, setPasswordState] = React.useState('');
    const [confirmPasswordState, setConfirmPasswordState] = React.useState('');
    const [usernameState, setUsernameState] = React.useState('');
    const [imageState, setImageState] = React.useState<File>();
    const [isPasswordValid, setIsPasswordValid] = React.useState(true);
    const [errorState, setErrorState] = React.useState('');

    const handleSubmit = async () => {
        if (!emailState || !passwordState || !usernameState) {
            setErrorState('All fields are required');
            return;
        }
        if (passwordState !== confirmPasswordState) {
            setIsPasswordValid(false);
            return;
        }

        try {
            await signUpUser(
                emailState,
                passwordState,
                usernameState,
                imageState
            );

            window.location.href = '/';
        } catch (e) {
            if (isAxiosError(e)) {
                setErrorState(e.response?.data);
            } else {
                setErrorState(
                    'An error occurred while signing up. Please try again later.'
                );
            }
        }

        // Rest of the form submission logic
    };

    const handlePasswordChanged = (
        password: string,
        confirmPassword: string
    ) => {
        if (confirmPassword === password && confirmPassword !== '') {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
    };

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageState(e.target.files[0]);
        }
    };

    return (
        <div className={styles.signUp}>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    {errorState && (
                        <Alert className={styles.alert} severity="error">
                            {errorState}
                        </Alert>
                    )}
                    <div className={styles.headerText}>Sign up</div>
                    <div className={styles.bigInput}>
                        <input
                            name="username"
                            placeholder="Username"
                            type="text"
                            value={usernameState}
                            className={classNames(styles.input, styles.email)}
                            onChange={(e) => setUsernameState(e.target.value)}
                        />
                        <input
                            name="email"
                            placeholder="Email"
                            type="text"
                            value={emailState}
                            className={classNames(styles.input, styles.email)}
                            onChange={(e) => setEmailState(e.target.value)}
                        />
                    </div>
                    <div className={styles.bigInput}>
                        <input
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={passwordState}
                            className={classNames(
                                styles.input,
                                styles.password
                            )}
                            onChange={(e) => {
                                setPasswordState(e.target.value);
                                handlePasswordChanged(
                                    e.target.value,
                                    confirmPasswordState
                                );
                            }}
                        />
                        <input
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPasswordState}
                            className={classNames(
                                styles.input,
                                styles.password,
                                { [styles.invalid]: !isPasswordValid }
                            )}
                            onChange={(e) => {
                                setConfirmPasswordState(e.target.value);
                                handlePasswordChanged(
                                    passwordState,
                                    e.target.value
                                );
                            }}
                        />
                    </div>
                    <div className={styles.imageInputWrapper}>
                        <div className={styles.imageInputText}>
                            Pick an image:
                        </div>
                        <input
                            name="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.imageInput}
                        />
                    </div>
                    {imageState && (
                        <img
                            src={URL.createObjectURL(imageState)}
                            alt="Preview"
                            className={styles.previewImage}
                        />
                    )}

                    <button
                        onClick={handleSubmit}
                        value="Sign up"
                        className={styles.generalButton}
                    >
                        Sign up
                    </button>
                </div>
                <div className={styles.otherButtons}>
                    <Link to={'/login'}>
                        <button className={styles.generalButton}>
                            Already have an account?
                        </button>
                    </Link>
                    <GoogleLoginButton />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
