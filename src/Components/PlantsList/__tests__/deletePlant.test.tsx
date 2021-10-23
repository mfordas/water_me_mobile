import {shallow, ShallowWrapper} from 'enzyme';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import {PlantsState} from '../../../redux_actions/plantsTypes';
import {initialState} from '../../../redux_reducers/plantsReducer';
import {DeletePlant} from '../deletePlant';

jest.mock('../../../Utils/apiUrl', () => jest.fn());

const mockDeletePlantFunc = jest.fn(() =>
  Promise.resolve(console.log('Deleting plant')),
);

const mockShowPlantsListFunc = jest.fn(() =>
  Promise.resolve(console.log('Updating plants list')),
);

const setUp = (startState: PlantsState = initialState) => {
  const wrapper = shallow(
    <DeletePlant
      plantsData={startState}
      plantId={1}
      listId={1}
      deletePlant={mockDeletePlantFunc}
      showPlantsList={mockShowPlantsListFunc}
    />,
  );
  return wrapper;
};

describe('DeletePlant component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const initialState = {
      plantData: {
        id: 1,
        name: 'abc',
        plantsListId: 1,
        wateringCycle: 1,
        pictureUrl: 'abc',
        wateringCycleBeginingData: new Date(),
        lastTimeWatered: new Date(),
      },
      plantDeleted: false,
      wateringDateUpdated: false,
      imageName: '',
    };

    wrapper = setUp(initialState);
  });

  it('Should render without error', () => {
    const component = findByDataTestAtrr(wrapper, 'deletePlantButton');
    expect(component.length).toBe(1);
  });
});

describe('Should handle submit Google login button', () => {
  const initialState = {
    plantData: {
      id: 1,
      name: 'abc',
      plantsListId: 1,
      wateringCycle: 1,
      pictureUrl: 'abc',
      wateringCycleBeginingData: new Date(),
      lastTimeWatered: new Date(),
    },
    plantDeleted: false,
    wateringDateUpdated: false,
    imageName: '',
  };

  const wrapper = setUp(initialState);

  it('Should emit callback on click event', async () => {
    const deletePlantButtonFunction = wrapper
      .find(TouchableOpacity)
      .at(0)
      .prop('onPress');

    if (deletePlantButtonFunction) {
      deletePlantButtonFunction({} as any);
    }

    await wrapper.update();

    expect(mockDeletePlantFunc).toHaveBeenCalledTimes(1);
    expect(mockShowPlantsListFunc).toHaveBeenCalledTimes(1);
  });
});
