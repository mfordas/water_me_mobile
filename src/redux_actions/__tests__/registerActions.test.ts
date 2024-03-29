import { User } from '@react-native-google-signin/google-signin';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import apiUrl from '../../Utils/apiUrl';
import { resetRegisterState, postGoogleUser } from '../registerActions';
import { registerExternal, resetRegState, RegisterState } from '../registerTypes';

const middlewares = [thunk];
const mockStore = configureStore<RegisterState, ThunkDispatch<RegisterState, any, any>>(middlewares);

jest.mock('jwt-decode', () => () => ({}));
jest.mock('../../Utils/apiUrl', () => () => 'http://localhost');

const getApiUrl = apiUrl();

describe('Reset register state action', () => {
  const store = mockStore({
    invalidData: false,
    confirm: false,
    googleUser: false,
  });

  afterEach(() => {
    store.clearActions();
  });
  it('Actions is sended with correct payload', () => {
    const expectedPayload = {
      invalidData: false,
      confirm: false,
      googleUser: false,
    };

    store.dispatch(resetRegisterState());
    expect(store.getActions()[0].type).toBe(resetRegState);
    expect(store.getActions()[0].invalidData).toEqual(expectedPayload.invalidData);
    expect(store.getActions()[0].confirm).toEqual(expectedPayload.confirm);
    expect(store.getActions()[0].googleUser).toEqual(expectedPayload.googleUser);
  });
});

describe('Register actions', () => {
  test('Successful login action is sended with correct payload', async () => {
    const store = mockStore({
      invalidData: true,
      confirm: false,
      googleUser: false,
    });

    const expectedPayload = {
      invalidData: false,
      confirm: true,
      googleUser: true,
    };

    nock(`${getApiUrl}/api`).post('/users/googleUser').reply(200);

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
    await store.dispatch(postGoogleUser(authTestObject));

    expect(store.getActions()[0].type).toBe(registerExternal);
    expect(store.getActions()[0].invalidData).toEqual(expectedPayload.invalidData);
    expect(store.getActions()[0].confirm).toEqual(expectedPayload.confirm);
    expect(store.getActions()[0].googleUser).toEqual(expectedPayload.googleUser);
  });

  test('Action is sended with correct payload', async () => {
    const store = mockStore({
      invalidData: false,
      confirm: true,
      googleUser: false,
    });

    const expectedPayload = {
      invalidData: true,
      confirm: false,
      googleUser: true,
    };

    nock(`${getApiUrl}/api`).post('/users/googleUser').reply(202);

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
    await store.dispatch(postGoogleUser(authTestObject));

    expect(store.getActions()[0].type).toBe(registerExternal);
    expect(store.getActions()[0].invalidData).toEqual(expectedPayload.invalidData);
    expect(store.getActions()[0].confirm).toEqual(expectedPayload.confirm);
    expect(store.getActions()[0].googleUser).toEqual(expectedPayload.googleUser);
  });

  test('Error is sended with correct payload', async () => {
    const store = mockStore({
      invalidData: false,
      confirm: true,
      googleUser: false,
    });

    const expectedPayload = {
      invalidData: true,
      confirm: false,
      googleUser: true,
    };

    nock(`${getApiUrl}/api`).post('/users/googleUser').reply(400);

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
    await store.dispatch(postGoogleUser(authTestObject));

    expect(store.getActions()[0].type).toBe(registerExternal);
    expect(store.getActions()[0].invalidData).toEqual(expectedPayload.invalidData);
    expect(store.getActions()[0].confirm).toEqual(expectedPayload.confirm);
    expect(store.getActions()[0].googleUser).toEqual(expectedPayload.googleUser);
  });
});
