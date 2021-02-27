import { loginExternalType, logoutType } from '../../redux_actions/loginTypes';
import loginReducer, { initialState } from '../loginReducer';

describe('Login Reducer', () => {
  it('Should return default state', () => {
    const newState = loginReducer(undefined, {
      type: loginExternalType,
      ...initialState,
    });

    expect(newState).toEqual({
      loginData: {
        name: '',
        googleId: '',
        invalidData: false,
      },
      isLogged: false,
    });
  });

  it('Should return new state if receiving type login external', () => {
    const newLoginData = {
      loginData: {
        name: 'Andrzej',
        googleId: '123456789',
        invalidData: false,
      },
      isLogged: true,
    };

    const newState = loginReducer(undefined, {
      type: loginExternalType,
      loginData: newLoginData.loginData,
      isLogged: newLoginData.isLogged,
    });

    expect(newLoginData).toEqual(newState);
  });

  it('Should return new state if receiving type logout', () => {
    const newLoginData = {
      loginData: {
        name: 'LoggedOut',
        googleId: 'None',
        invalidData: false,
      },
      isLogged: false,
    };

    const newState = loginReducer(undefined, {
      type: logoutType,
      loginData: newLoginData.loginData,
      isLogged: newLoginData.isLogged,
    });

    expect(newLoginData).toEqual(newState);
  });
});
