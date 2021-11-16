import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { PlantsListsState } from '../../../redux_actions/plantsListsTypes';
import AddPlantsList from '../addPlantsList';
import { ShowPlantsLists } from '../showPlantsLists';

jest.mock('../../../Utils/apiUrl', () => jest.fn());
jest.mock('@react-native-google-signin/google-signin', () => () => ({}));

const mockFunc = jest.fn(() => Promise.resolve(console.log('GetPlantListTest')));

const setUp = (initialState: PlantsListsState) => {
  const wrapper = shallow(
    <ShowPlantsLists plantsListsData={initialState} getPlantsListsForUser={mockFunc} />,
  );
  return wrapper;
};

const initialState = {
  plantsListName: '',
  plantsLists: [
    {
      id: 1,
      name: 'list1',
      userId: 1,
    },
    {
      id: 2,
      name: 'list2',
      userId: 1,
    },
    {
      id: 3,
      name: 'list3',
      userId: 1,
    },
  ],
  userId: '123456789',
  plantsListDeleted: false,
  plants: [],
};

describe('ShowPlants list component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setUp(initialState);
  });

  it('Should render without error', () => {
    const component = findByDataTestAtrr(wrapper, 'showPlantsListsComponent');
    const plantsListContainers = findByDataTestAtrr(wrapper, 'plantsListContainer');
    const addPlantComponent = wrapper.find(AddPlantsList);

    expect(component.length).toBe(1);
    expect(addPlantComponent.length).toBe(1);
    expect(plantsListContainers.length).toBe(3);
  });
});
