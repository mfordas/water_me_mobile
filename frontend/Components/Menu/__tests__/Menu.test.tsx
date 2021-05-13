import {shallow, ShallowWrapper} from 'enzyme';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import {Menu} from '../index';

jest.mock('@react-native-google-signin/google-signin', () => () => ({}));
jest.mock('../../../Utils/apiUrl', () => jest.fn());

describe('Menu Component', () => {
    it('Renders menu container without buttons', () => {
        const loginData = {
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: false,
        };

        const wrapper: ShallowWrapper = shallow(
            <Menu loginData={loginData} logout={() => Promise.resolve()} />,
        );

        const logoutButton = findByDataTestAtrr(wrapper, 'logoutButton');
        const myPlantsButton = findByDataTestAtrr(wrapper, 'myPlantsButton');

        expect(logoutButton.length).toBe(0);
        expect(myPlantsButton.length).toBe(0);
    });

    it('Renders menu container with buttons', () => {
        const loginData = {
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: true,
        };
        const wrapper: ShallowWrapper = shallow(
            <Menu loginData={loginData} logout={() => Promise.resolve()} />,
        );

        const logoutButton = findByDataTestAtrr(wrapper, 'logoutButton');
        const myPlantsButton = findByDataTestAtrr(wrapper, 'myPlantsButton');

        expect(logoutButton.length).toBe(1);
        expect(myPlantsButton.length).toBe(1);
    });

    it('Triggers logout action when button is clicked', async () => {
        const loginData = {
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: true,
        };

        const mockFunc = jest.fn(() => Promise.resolve());
        const wrapper: ShallowWrapper = shallow(
            <Menu loginData={loginData} logout={mockFunc} />,
        );

        const logoutButtonFunction = wrapper
            .find(TouchableOpacity)
            .at(1)
            .prop('onPress');

        if (logoutButtonFunction) {
            logoutButtonFunction({} as any);
        }

        expect(mockFunc).toHaveBeenCalled();
    });
});
