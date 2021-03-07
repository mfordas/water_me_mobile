import {User} from '@react-native-community/google-signin';
import {makeAuth} from '../helpers';

const loginExternalMockSuccess = jest.fn(() => Promise.resolve());
const loginExternalMockReject = jest.fn(() => Promise.reject());
const setErrorMock = jest.fn();

jest.mock('@react-native-community/google-signin', () => {
  return {
    GoogleSignin: {
      signIn: jest.fn(() => Promise.resolve(authTestObject)),
      hasPlayServices: jest.fn(),
    },
  };
});

const authTestObject: User = {
  idToken: '12345',
  user: {
    id: '1',
    name: 'testname',
    email: 'mail@mail.com',
    photo: 'testphoto',
    familyName: 'familyName',
    givenName: 'givenName',
  },
  serverAuthCode: '12345',
};

describe('Should make log in action if auth object is availabe', () => {
  it('Should fire sign in method on auth object and login external function', async () => {
    await makeAuth(loginExternalMockSuccess, setErrorMock);

    expect(loginExternalMockSuccess).toHaveBeenCalledTimes(1);
    expect(setErrorMock).toBeCalledTimes(0);
  });

  it('Should should return an error if auth object is null', async () => {
    await makeAuth(loginExternalMockReject, setErrorMock);

    expect(loginExternalMockReject).toHaveBeenCalledTimes(1);
    expect(setErrorMock).toHaveBeenCalledTimes(1);
  });
});
