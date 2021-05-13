import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {createStackNavigator} from '@react-navigation/stack';
import {PlantsListsComponent} from '../index';

jest.mock('../../../Utils/apiUrl', () => jest.fn());
jest.mock('@react-native-google-signin/google-signin', () => () => ({}));

const mockGetPlantsListForUser = jest.fn(() =>
    Promise.resolve(console.log('Downloading plants lists...')),
);

const Stack = createStackNavigator();

const initialState = {
    plantsListName: 'TestList',
    plantsLists: [
        {id: 1, userId: 1, name: 'List1'},
        {id: 2, userId: 2, name: 'List2'},
        {id: 3, userId: 3, name: 'List3'},
    ],
    userId: '1',
    plantsListDeleted: false,
    plants: [],
};

const setUp = () => {
    const wrapper = shallow(
        <PlantsListsComponent
            getPlantsListsForUser={() => mockGetPlantsListForUser()}
            plantsListsData={initialState}
        />,
    );
    return wrapper;
};

describe('PlantsLists component', () => {
    it('Should render without error', () => {
        const wrapper: ShallowWrapper = setUp();

        const stackScreens = wrapper.find(Stack.Screen);

        expect(stackScreens.length).toBe(4);
        expect(stackScreens.at(1).prop('name')).toBe(
            `${initialState.plantsLists[0].id}`,
        );
        expect(stackScreens.at(2).prop('name')).toBe(
            `${initialState.plantsLists[1].id}`,
        );
        expect(stackScreens.at(3).prop('name')).toBe(
            `${initialState.plantsLists[2].id}`,
        );
    });
});
