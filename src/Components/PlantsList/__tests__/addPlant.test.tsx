import {shallow, ShallowWrapper} from 'enzyme';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import {PlantsState} from '../../../redux_actions/plantsTypes';
import {AddPlant} from '../addPlant';
import {AddPlantPicture} from '../addPlantPicture';
import {DatePicker} from '../datePicker';
import {NameInput} from '../nameInput';
import {WateringCycle} from '../wateringCycle';

jest.mock('@react-native-google-signin/google-signin', () => () => ({}));
jest.mock('../../../Utils/apiUrl', () => jest.fn());

jest.mock('../helpers', () => {
  const helpers = jest.requireActual('../helpers');

  return {
    ...helpers,
    handleUploadingFile: jest.fn(() => Promise.resolve('testImageName')),
  };
});

const mockShowPlantsList = jest.fn(() =>
  Promise.resolve(console.log('Showing plants list')),
);
const mockShowAddPlantForm = jest.fn();
const mockAddPlantToList = jest.fn();
const mockUploadingFile = jest.fn();

const setUp = (initialState: PlantsState) => {
  const wrapper = shallow(
    <AddPlant
      listId={1}
      addPlantToList={mockAddPlantToList}
      plantsData={initialState}
      showPlantsList={mockShowPlantsList}
      setShowAddPlantForm={mockShowAddPlantForm}
      uploadPlantImage={mockUploadingFile}
    />,
  );
  return wrapper;
};

describe('Add plants list component', () => {
  let wrapper: ShallowWrapper;
  let initialState;

  beforeEach(async () => {
    initialState = {
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
    wrapper = await setUp(initialState);
  });

  it('Should render without error', () => {
    const component = findByDataTestAtrr(wrapper, 'addPlantComponent');

    expect(component.length).toBe(1);
    expect(component.find(WateringCycle).length).toBe(1);
    expect(component.find(DatePicker).length).toBe(1);
    expect(component.find(AddPlantPicture).length).toBe(1);
    expect(component.find(NameInput).length).toBe(1);
  });

  it('Should change state and send request to add a plant if all values are filled', async () => {
    const testName = 'TestName';
    const testWatering = '3';
    const testFile = 'public.image';

    wrapper.find(NameInput).prop('setName')(testName);
    wrapper.find(WateringCycle).prop('setWateringCycle')(testWatering);
    wrapper.find(AddPlantPicture).prop('setSingleFile')(testFile);

    await wrapper.update();

    expect(wrapper.find(NameInput).prop('name')).toBe(testName);
    expect(wrapper.find(WateringCycle).prop('wateringCycle')).toBe(
      testWatering,
    );

    const button = wrapper.find(TouchableOpacity).at(0);

    const addPlantButtonFunction = button.prop('onPress');

    if (addPlantButtonFunction) {
      await addPlantButtonFunction({} as any);
    }

    await wrapper.update();

    expect(mockAddPlantToList).toBeCalledTimes(1);
    expect(mockShowAddPlantForm).toBeCalledTimes(1);
  });
});
