import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import AddPlant from '../addPlant';
import { PlantsList } from '../plantsList';
import PlantsListGenerator from '../plantsListGenerator';

jest.mock('../../../Utils/apiUrl', () => jest.fn());

const mockShowPlantsList = jest.fn(() => Promise.resolve(console.log('Downloading plants lists...')));

const initialState = {
  plantsListName: 'TestList',
  plantsLists: [
    {
      id: 1,
      userId: 1,
      name: 'TestPlant1',
    },
    {
      id: 2,
      userId: 2,
      name: 'TestPlant2',
    },
    {
      id: 3,
      userId: 3,
      name: 'TestPlant3',
    },
  ],
  userId: '1',
  plantsListDeleted: false,
  plants: [
    {
      id: 1,
      name: 'TestPlant1',
      plantsListId: 1,
      wateringCycle: 1,
      pictureUrl: 'test/path/1',
      wateringCycleBeginingData: new Date(),
      lastTimeWatered: new Date(),
    },
    {
      id: 2,
      name: 'TestPlant2',
      plantsListId: 1,
      wateringCycle: 1,
      pictureUrl: 'test/path/2',
      wateringCycleBeginingData: new Date(),
      lastTimeWatered: new Date(),
    },
    {
      id: 3,
      name: 'TestPlant3',
      plantsListId: 1,
      wateringCycle: 1,
      pictureUrl: 'test/path/3',
      wateringCycleBeginingData: new Date(),
      lastTimeWatered: new Date(),
    },
  ],
};

const setUp = (listIndex: number) => {
  const wrapper = shallow(
    <PlantsList
      showPlantsList={mockShowPlantsList}
      plantsListsData={initialState}
      listIndex={listIndex}
      listName="TestList"
    />,
  );
  return wrapper;
};

describe('PlantsList component', () => {
  it('Should render without error', () => {
    const wrapper: ShallowWrapper = setUp(1);
    const plantsListGenerator = wrapper.find(PlantsListGenerator);

    expect(plantsListGenerator.length).toBe(1);
  });

  it('Should not render if plants list array is empty', async () => {
    const wrapper: ShallowWrapper = setUp(1);

    const showAddPlantButtonFunction = wrapper.find(TouchableOpacity).at(0).prop('onPress');

    if (showAddPlantButtonFunction) {
      showAddPlantButtonFunction({} as any);
    }

    wrapper.update();

    expect(wrapper.find(AddPlant).length).toBe(1);
  });
});
