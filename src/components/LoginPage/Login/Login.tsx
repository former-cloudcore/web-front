import * as React from 'react';
import styles from './Login.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { loginUser } from '../../../utils/user-service';
import { isAxiosError, AxiosError } from 'axios';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';

const Login = () => {
    const [emailState, setEmailState] = React.useState('');
    const [passwordState, setPasswordState] = React.useState('');
    const [errorState, setErrorState] = React.useState('');
    const handleSubmit = async () => {
        try {
            await loginUser(emailState, passwordState);
            window.location.href = '/';
        } catch (e) {
            if (isAxiosError(e) && (e as AxiosError).response?.status === 401) {
                setErrorState('Invalid credentials');
            } else
                setErrorState(
                    'An error occurred while logging in. Please try again later.'
                );
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <div className={styles.headerText}>Sign in</div>
                    {errorState && (
                        <Alert className={styles.alert} severity="error">
                            {errorState}
                        </Alert>
                    )}
                    <input
                        name="email"
                        placeholder="Email"
                        type="text"
                        value={emailState}
                        className={classNames(styles.input, styles.email)}
                        onChange={(e) => setEmailState(e.target.value)}
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={passwordState}
                        className={classNames(styles.input, styles.password)}
                        onChange={(e) => setPasswordState(e.target.value)}
                    />
                    <button
                        value="Sign in"
                        className={styles.generalButton}
                        onClick={handleSubmit}
                    >
                        Sign in
                    </button>
                </div>
                <div className={styles.otherButtons}>
                    <Link to={'/signup'}>
                        <button className={styles.generalButton}>
                            Sign up
                        </button>
                    </Link>

                    <GoogleLoginButton />

                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
