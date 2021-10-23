import {shallow, ShallowWrapper} from 'enzyme';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import {PlantsListsState} from '../../../redux_actions/plantsListsTypes';
import {DeletePlantsList} from '../deletePlantsList';

jest.mock('../../../Utils/apiUrl', () => jest.fn());

const deletePlantsListMockFunc = jest.fn(() =>
  Promise.resolve(console.log('DeletePlantListTest')),
);
const getPlantsListsForUserMockFunc = jest.fn(() =>
  Promise.resolve(console.log('GetPlantListTest')),
);

const setUp = (initialState: PlantsListsState) => {
  const wrapper = shallow(
    <DeletePlantsList
      plantsListsData={initialState}
      getPlantsListsForUser={getPlantsListsForUserMockFunc}
      deletePlantsList={deletePlantsListMockFunc}
      plantsListId={1}
    />,
  );
  return wrapper;
};

describe('Delete plants list component', () => {
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

  it('Should render without error', () => {
    const component = findByDataTestAtrr(wrapper, 'deletePlantListComponent');
    expect(component.length).toBe(1);
  });

  it('Should emit callback on click event', async () => {
    const button = wrapper.find(TouchableOpacity).at(0);
    const deletePlantButtonFunction = button.prop('onPress');

    if (deletePlantButtonFunction) {
      await deletePlantButtonFunction({} as any);
    }

    expect(deletePlantsListMockFunc).toBeCalledTimes(1);
    expect(getPlantsListsForUserMockFunc).toBeCalledTimes(1);
  });
});
