import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {loginExternal, logout} from '../../redux_actions/loginActions';
import {logoutType, loginExternalType,LoginState} from '../loginTypes';

import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
import apiUrl from '../../Utils/apiUrl';

const middlewares = [thunk];
const mockStore = configureStore<
  LoginState,
  ThunkDispatch<LoginState, any, any>
>(middlewares);

jest.mock('jwt-decode', () => () => ({}));
jest.mock('@react-native-google-signin/google-signin', () => () => ({}));
jest.mock('../../Utils/apiUrl', () => () => 'http://localhost');
jest.mock('../../Utils/asyncStorage', () => {
    const asyncStorage = jest.requireActual('../../Utils/asyncStorage');
    return {
        ...asyncStorage,
        removeValue: jest.fn(),
        storeData: jest.fn(),
        getData: jest.fn(),
    };
});

jest.mock('@react-native-google-signin/google-signin', () => {
    return {
        GoogleSignin: {signOut: jest.fn()},
    };
});
const getApiUrl = apiUrl();

describe('Logout action', () => {
    const store = mockStore({
        loginData: {
            name: 'TestName',
            googleId: '12345',
            invalidData: false,
        },
        isLogged: true,
    });

    afterEach(() => {
        store.clearActions();
    });
    it('Actions is sended with correct payload', async () => {
        const expectedPayload = {
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: false,
        };

        await store.dispatch(logout());
        expect(store.getActions()[0].type).toBe(logoutType);
        expect(store.getActions()[0].loginData).toEqual(expectedPayload.loginData);
        expect(store.getActions()[0].isLogged).toEqual(expectedPayload.isLogged);
    });
});

describe('Login actions', () => {
    test('Successful login action is sended with correct payload', async () => {
        const store = mockStore({
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: false,
        });

        const expectedPayload = {
            loginData: {
                name: 'User 2',
                googleId: '12345',
                invalidData: false,
            },
            isLogged: true,
        };

        nock(`${getApiUrl}/api`)
            .post('/authexternal')
            .reply(
                200,
                {name: 'User 2', googleId: '12345'},
                {'x-auth-token': '12345'},
            );

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
        await store.dispatch(loginExternal(authTestObject));

        expect(store.getActions()[0].type).toBe(loginExternalType);
        expect(store.getActions()[0].loginData).toEqual(expectedPayload.loginData);
        expect(store.getActions()[0].isLogged).toEqual(expectedPayload.isLogged);
    });

    test('Action is sended with correct payload', async () => {
        const store = mockStore({
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: false,
        });

        const expectedPayload = {
            isLogged: false,
        };

        nock(`${getApiUrl}/api`).post('/authexternal').reply(202);

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
        await store.dispatch(loginExternal(authTestObject));

        expect(store.getActions()[0].type).toBe(loginExternalType);
        expect(store.getActions()[0].isLogged).toEqual(expectedPayload.isLogged);
        expect(store.getActions()[0].loginData).toBe(undefined);
    });

    test('Error is sended with correct payload', async () => {
        const store = mockStore({
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: false,
        });

        const expectedPayload = {
            loginData: {
                invalidData: true,
            },
        };

        nock(`${getApiUrl}/api`).post('/authexternal').reply(404);

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
        await store.dispatch(loginExternal(authTestObject));

        expect(store.getActions()[0].type).toBe(loginExternalType);
        expect(store.getActions()[0].loginData).toEqual(expectedPayload.loginData);
        expect(store.getActions()[0].isLogged).toBe(undefined);
    });
});
