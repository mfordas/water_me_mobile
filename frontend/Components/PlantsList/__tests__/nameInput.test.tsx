import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {TextInput} from 'react-native';
import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import {NameInput} from '../nameInput';
import ErrorMessage from '../../ErrorMessage/errorMessage';

jest.mock('../../../Utils/apiUrl', () => jest.fn());

const mockSetName = jest.fn(() => console.log('Changing name...'));

const setUp = (formSubmitted: boolean, name: string) => {
  const wrapper = shallow(
    <NameInput
      formSubmitted={formSubmitted}
      name={name}
      setName={mockSetName}
    />,
  );
  return wrapper;
};

describe('NameInput component', () => {
  it('Should render without error', () => {
    const wrapper: ShallowWrapper = setUp(false, '');
    const component = findByDataTestAtrr(wrapper, 'nameInput');
    expect(component.length).toBe(1);
  });
});

describe('Should handle input change', () => {
  it('Should show error if input is empty and form is submitted', () => {
    const component = setUp(true, '');
    const inputElement = component.find(ErrorMessage);

    expect(inputElement.prop('errorText')).toBe('Wpisz imię');
  });

  it('Should show error if input is shorter than 3 characters and form is submitted', () => {
    const component = setUp(true, 'abc');
    const inputElement = component.find(ErrorMessage);

    expect(inputElement.prop('errorText')).toBe(
      'Imię powinno być dłuższe niż 3 znaki',
    );
  });

  it('Should call set name if input is changing', () => {
    const component = setUp(false, '');

    const wateringTextInputFunction = component
      .find(TextInput)
      .at(0)
      .prop('onChangeText');

    if (wateringTextInputFunction) {
      wateringTextInputFunction('abcd');
    }

    component.update();

    expect(mockSetName).toHaveBeenCalledTimes(1);
  });
});
