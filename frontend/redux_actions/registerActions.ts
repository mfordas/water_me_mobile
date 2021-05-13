import axios from 'axios';
import {User} from '@react-native-google-signin/google-signin';

import {registerExternal, resetRegState} from './registerTypes';
import {AppThunk} from '../redux_store/reduxStore';

import apiUrl from '../Utils/apiUrl';

const getApiUrl = apiUrl();

export const postGoogleUser = (authObject: User): AppThunk => async (
    dispatch,
) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${getApiUrl}/api/users/googleUser`,
            data: {token: authObject.idToken},
        });

        if (res.status === 200) {
            dispatch({
                type: registerExternal,
                invalidData: false,
                confirm: true,
                googleUser: true,
            });
        } else {
            dispatch({
                type: registerExternal,
                invalidData: true,
                confirm: false,
                googleUser: true,
            });
        }
    } catch (error) {
        dispatch({
            type: registerExternal,
            invalidData: true,
            confirm: false,
            googleUser: true,
        });
        console.error('Error Registration:', error);
    }
};

export const resetRegisterState = (): AppThunk => async (dispatch) => {
    dispatch({
        type: resetRegState,
        invalidData: false,
        confirm: false,
        googleUser: false,
    });
};
