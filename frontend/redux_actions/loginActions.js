import axios from 'axios';
import jwt from 'jwt-decode';
import {GoogleSignin} from '@react-native-community/google-signin';

import {TYPES} from '../redux_actions/types';
import {storeData, removeValue, getData} from '../Utils/asyncStorage';
import apiUrl from '../Utils/apiUrl';

const getApiUrl = apiUrl();

export const loginExternal = (authObject) => async (dispatch) => {
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
      await storeData('id', jwt(token).id);
      await storeData('name', res.data.name);
      dispatch({
        type: TYPES.loginExternal,
        loginData: {
          name: res.data.name,
          googleId: res.data.googleId,
          invalidData: false,
        },
        isLogged: true,
      });
    } else if (res.status === 202) {
      dispatch({
        type: TYPES.loginExternal,
        isLogged: false,
      });
    }
  } catch (error) {
    console.error('Error Login:', error);
    dispatch({
      type: TYPES.loginExternal,
      loginData: {
        invalidData: true,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  await GoogleSignin.signOut();

  await removeValue('token');
  await removeValue('id');
  await removeValue('name');

  dispatch({
    type: TYPES.logout,
    loginData: {
      name: '',
      googleId: '',
      invalidData: false,
    },
    isLogged: false,
  });
};

export const loginCheck = () => async (dispatch) => {
  const token = await getData('token');
  token
    ? dispatch({type: TYPES.logincheck, isLogged: true})
    : dispatch({type: TYPES.logincheck, isLogged: false});
};
