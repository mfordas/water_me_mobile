import {useEffect} from 'react';
import {GoogleSignin, User} from '@react-native-google-signin/google-signin';

export const useSignInSilently = (
    loginExternal: (user: User) => Promise<void>,
): void => {
    const signInSilently = async () => {
        try {
            const user = await GoogleSignin.signInSilently();
            await loginExternal(user);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        signInSilently();
    }, []);
};
