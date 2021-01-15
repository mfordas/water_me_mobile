import axios from 'axios';
import jwt from 'jwt-decode';

import {TYPES} from '../redux_actions/types';
import generateAuthTokenForExternalUser from '../Utils/generateAuthTokenForExternalUser';
import {storeData, removeValue, getData} from '../Utils/asyncStorage';

export const loginExternal = (authObject) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/authexternal',
      data: {
        token: await generateAuthTokenForExternalUser(authObject),
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
    console.error('Error Login:', error.response.data);
    dispatch({
      type: TYPES.loginExternal,
      loginData: {
        invalidData: true,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
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
  (await getData('token'))
    ? dispatch({
        type: TYPES.logincheck,
        isLogged: true,
      })
    : dispatch({
        type: TYPES.logincheck,
        isLogged: false,
      });
};
