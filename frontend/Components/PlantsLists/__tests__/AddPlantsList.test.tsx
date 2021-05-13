import React from 'react';
import {TouchableOpacity, TextInput} from 'react-native';
import {shallow, ShallowWrapper} from 'enzyme';
import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import {AddPlantsList} from '../addPlantsList';
import {PlantsListsState} from '../../../redux_actions/plantsListsTypes';

jest.mock('@react-native-community/google-signin', () => () => ({}));
jest.mock('../../../Utils/apiUrl', () => jest.fn());

const addPlantsListMockFunc = jest.fn(() =>
    Promise.resolve(console.log('AddPlantListTest')),
);
const getPlantsListsForUserMockFunc = jest.fn(() =>
    Promise.resolve(console.log('GetPlantListTest')),
);

const setUp = (initialState: PlantsListsState) => {
    const wrapper = shallow(
        <AddPlantsList
            plantsListsData={initialState}
            addPlantsList={addPlantsListMockFunc}
            getPlantsListsForUser={getPlantsListsForUserMockFunc}
        />,
    );
    return wrapper;
};

describe('Add plants list component', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        const initialState = {
            plantsListName: '',
            plantsLists: [],
            userId: '123456789',
            plantsListDeleted: false,
            plants: [],
        };
        wrapper = setUp(initialState);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render without error', () => {
        const component = findByDataTestAtrr(wrapper, 'addPlantListComponent');
        expect(component.length).toBe(1);
    });

    it('Should emit callback on click event', async () => {
        const input = wrapper.find(TextInput).at(0);

        const inputChange = input.prop('onChangeText');

        if (inputChange) {
            inputChange('test');
        }

        wrapper.update();

        const button = wrapper.find(TouchableOpacity).at(0);
        const addPlantButtonFunction = button.prop('onPress');

        if (addPlantButtonFunction) {
            await addPlantButtonFunction({} as any);
        }

        expect(addPlantsListMockFunc).toBeCalledTimes(1);
        expect(getPlantsListsForUserMockFunc).toBeCalledTimes(1);
    });

    it('Should not emit callback on click event', async () => {
        const input = wrapper.find(TextInput).at(0);

        const inputChange = input.prop('onChangeText');

        if (inputChange) {
            inputChange('');
        }

        wrapper.update();

        const button = wrapper.find(TouchableOpacity).at(0);
        const addPlantButtonFunction = button.prop('onPress');

        if (addPlantButtonFunction) {
            await addPlantButtonFunction({} as any);
        }

        expect(addPlantsListMockFunc).toBeCalledTimes(0);
        expect(getPlantsListsForUserMockFunc).toBeCalledTimes(0);
    });
});
