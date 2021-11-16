import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import jwt from 'jwt-decode';

import apiUrl from '../Utils/apiUrl';
import { storeData, removeValue, getData } from '../Utils/asyncStorage';
import { AppThunk } from '../redux_store/reduxStore';
import { loginExternalType, logoutType, logincheckType } from './loginTypes';

const getApiUrl = apiUrl();

export const loginExternal =
  (authObject: User): AppThunk =>
  async (dispatch) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${getApiUrl}/api/authexternal`,
        data: {
          token: authObject.idToken,
        },
      });
      if (res.status === 200) {
        const token = res.headers['x-auth-token'];
        await storeData('token', token);
        await storeData('id', jwt<{ id: string }>(token).id);
        await storeData('name', res.data.name);
        dispatch({
          type: loginExternalType,
          loginData: {
            name: res.data.name,
            googleId: res.data.googleId,
            invalidData: false,
          },
          isLogged: true,
        });
      } else if (res.status === 202) {
        dispatch({
          type: loginExternalType,
          isLogged: false,
        });
      }
    } catch (error) {
      console.error('Error Login:', error);
      dispatch({
        type: loginExternalType,
        loginData: {
          invalidData: true,
        },
      });
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  await GoogleSignin.signOut();

  await removeValue('token');
  await removeValue('id');
  await removeValue('name');

  dispatch({
    type: logoutType,
    loginData: {
      name: '',
      googleId: '',
      invalidData: false,
    },
    isLogged: false,
  });
};

export const loginCheck = (): AppThunk => async (dispatch) => {
  const token = await getData('token');
  token
    ? dispatch({ type: logincheckType, isLogged: true })
    : dispatch({ type: logincheckType, isLogged: false });
};
