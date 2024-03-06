import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { googleSignin } from '../../../utils/user-service';

const GoogleLoginButton = () => {
    const onGoogleLoginSuccess = async (
        credentialResponse: CredentialResponse
    ) => {
        console.log(credentialResponse);
        if (!credentialResponse.credential) return;
        try {
            await googleSignin(credentialResponse.credential);
            window.location.href = '/';
        } catch (e) {
            console.log(e);
        }
    };

    const onGoogleLoginFailure = () => {
        console.log('Google login failed');
    };

    return (
        <GoogleLogin
            onSuccess={onGoogleLoginSuccess}
            onError={onGoogleLoginFailure}
            locale='en'
        />
    );
};

export default GoogleLoginButton;
