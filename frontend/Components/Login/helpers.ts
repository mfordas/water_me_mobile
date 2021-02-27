import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-community/google-signin';

export const makeAuth = async (
  loginExternal: (user: User) => Promise<void>,
  setError: (error: string) => React.Dispatch<React.SetStateAction<string>>,
) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    await loginExternal(userInfo);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      setError('Logowanie przerwane');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      setError('Jesteś już w trakcie operacji logowania');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      setError('Brak połączenia z Google Play');
    } else {
      setError('Coś się zepsuło :(');
    }
  }
};