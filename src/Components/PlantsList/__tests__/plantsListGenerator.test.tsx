import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { Plant } from '../../../redux_actions/plantsTypes';
import DeletePlant from '../deletePlant';
import { PlantsListGenerator } from '../plantsListGenerator';
import Watering from '../watering';

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

const setUp = (listIndex: number, plants: Plant[]) => {
  const wrapper = shallow(
    <PlantsListGenerator plantsListsData={initialState} listIndex={listIndex} plants={plants} />,
  );
  return wrapper;
};

describe('PlantsList component', () => {
  it('Should render without error', () => {
    const wrapper: ShallowWrapper = setUp(1, initialState.plants);
    const wateringContainers = wrapper.find(Watering);
    const deletePlantContainers = wrapper.find(DeletePlant);

    expect(wateringContainers.length).toBe(3);
    expect(deletePlantContainers.length).toBe(3);
    expect(wateringContainers.at(0).prop('listId')).toBe(2);
    expect(wateringContainers.at(1).prop('listId')).toBe(2);
    expect(wateringContainers.at(2).prop('listId')).toBe(2);
  });
  it('Should not render plants', () => {
    const wrapper: ShallowWrapper = setUp(1, []);
    const wateringContainers = wrapper.find(Watering);
    const deletePlantContainers = wrapper.find(DeletePlant);

    expect(wateringContainers.length).toBe(0);
    expect(deletePlantContainers.length).toBe(0);
  });
});
