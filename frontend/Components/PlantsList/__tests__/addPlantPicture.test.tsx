import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {TouchableOpacity} from 'react-native';
import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import {AddPlantPicture} from '../addPlantPicture';
import {handleUploadingFile} from '../helpers';
import ErrorMessage from '../../ErrorMessage/errorMessage';

jest.mock('react-native-document-picker', () => () => ({}));
jest.mock('react-native-image-picker', () => () => ({}));
jest.mock('../helpers', () => {
  const helpers = jest.requireActual('../helpers');

  return {
    ...helpers,
    handleUploadingFile: jest.fn(),
  };
});

const mockSetPicture = jest.fn(() => console.log('Changing picture...'));
const mockUploadPlantImage = jest.fn(() => Promise.resolve('Uploading image'));

const setUp = (formSubmitted: boolean, picture: string) => {
  const wrapper = shallow(
    <AddPlantPicture
      formSubmitted={formSubmitted}
      singleFile={picture}
      setSingleFile={mockSetPicture}
    />,
  );
  return wrapper;
};

describe('Image input component', () => {
  it('Should render without error', () => {
    const wrapper: ShallowWrapper = setUp(false, '12345');
    const component = findByDataTestAtrr(wrapper, 'ImageInput');
    expect(component.length).toBe(1);
  });

  it('Should show error message', async () => {
    const wrapper: ShallowWrapper = setUp(true, '');

    const errorMessage = wrapper.find(ErrorMessage);

    expect(errorMessage.length).toBe(1);
    expect(errorMessage.prop('errorText')).toBe('Dodaj zdjęcie');
  });
});

describe('Should handle input change', () => {
  const component = setUp(true, 'testImagePath');

  it('Should emit callback on image upload event change', async () => {
    (handleUploadingFile as jest.Mock).mockImplementation(() => {
      mockSetPicture();
      mockUploadPlantImage();
    });

    const imageInputFunction = component
      .find(TouchableOpacity)
      .at(1)
      .prop('onPress');

    if (imageInputFunction) {
      imageInputFunction({} as any);
    }

    expect(mockSetPicture).toHaveBeenCalledTimes(1);
  });

  it('Should emit callback on photo take change', async () => {
    (handleUploadingFile as jest.Mock).mockImplementation(() => {
      mockSetPicture();
      mockUploadPlantImage();
    });

    const imageInputFunction = component
      .find(TouchableOpacity)
      .at(0)
      .prop('onPress');

    if (imageInputFunction) {
      imageInputFunction({} as any);
    }

    expect(mockSetPicture).toHaveBeenCalledTimes(1);
  });
});
