import React from 'react';
import {ConfirmGoogle} from '../confirmGoogle';
import {shallow, ShallowWrapper} from 'enzyme';
import {TouchableOpacity, Text} from 'react-native';
import {initialState} from '../../../redux_reducers/registerReducer';
import {RegisterState} from '../../../redux_actions/registerTypes';

const mockFunc = jest.fn();

jest.mock('@react-native-community/google-signin', () => () => ({}));
jest.mock('../../../Utils/apiUrl', () => jest.fn());

const setUp = (startState: RegisterState = initialState) => {
  const wrapper = shallow(
    <ConfirmGoogle registerData={startState} resetRegisterState={mockFunc} />,
  );
  return wrapper;
};

describe('Render', () => {
  it('Should render without errors', () => {
    const component: ShallowWrapper = setUp();

    const paragraphs = component.find(Text).getElements();

    expect(paragraphs[0].props.children).toBe('Konto założone!');
    expect(paragraphs[1].props.children).toBe('Możesz teraz się zalogować.');
  });
});

describe('Should handle submit Google register button', () => {
  const component: ShallowWrapper = setUp(initialState);

  it('Should emit callback on click event', async () => {
    const registerButtonFunction = component
      .find(TouchableOpacity)
      .at(0)
      .prop('onPress');

    if (registerButtonFunction) {
      registerButtonFunction({} as any);
    }

    expect(mockFunc).toBeCalledTimes(1);
  });
});
