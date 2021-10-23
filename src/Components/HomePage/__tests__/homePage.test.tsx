import {shallow, mount, ShallowWrapper} from 'enzyme';
import React from 'react';
import {Text} from 'react-native';

import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import ErrorMessage from '../../ErrorMessage/errorMessage';
import GoogleAuth from '../../Login/googleAuth';
import GoogleRegister from '../../Register/googleRegister';
import HomePage from '../index';

jest.mock('../../../Utils/apiUrl', () => jest.fn());
jest.mock('@react-native-google-signin/google-signin', () => () => ({}));

const setUp = () => {
  const component = shallow(<HomePage />);
  return component;
};

describe('HomePage component', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp();
  });

  it('Should render without error', () => {
    const wrapper = findByDataTestAtrr(component, 'homePage');

    expect(wrapper.find(Text).length).toBe(1);
    expect(wrapper.find(GoogleAuth).length).toBe(1);
    expect(wrapper.find(GoogleRegister).length).toBe(1);
    expect(wrapper.find(ErrorMessage).length).toBe(0);
  });

  it('Should render without error', () => {
    const errorMessage = 'Test Error';
    const wrapper = component.find(GoogleAuth);

    wrapper.prop('setError')(errorMessage);

    expect(component.find(ErrorMessage).length).toBe(1);
    expect(component.find(ErrorMessage).prop('errorText')).toBe(errorMessage);
  });
});
