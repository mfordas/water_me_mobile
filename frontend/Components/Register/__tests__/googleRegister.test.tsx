import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {TouchableOpacity} from 'react-native';
import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import {GoogleRegister} from '../googleRegister';
import {initialState} from '../../../redux_reducers/registerReducer';
import {RegisterState} from '../../../redux_actions/registerTypes';
import {makeAuth} from '../../Login/helpers';
import ConfirmGoogle from '../confirmGoogle';

jest.mock('../../Login/helpers', () => {
  const helpers = jest.requireActual('../../Login/helpers');

  return {
    ...helpers,
    makeAuth: jest.fn(),
  };
});

jest.mock('../../Login/hooks', () => {
  const hooks = jest.requireActual('../../Login/hooks');

  return {
    ...hooks,
    useHandleGoogleApi: jest.fn(),
  };
});

const mockFunc = jest.fn();

jest.mock('@react-native-community/google-signin', () => () => ({}));
jest.mock('../../../Utils/apiUrl', () => jest.fn());

const setUp = (startState: RegisterState = initialState) => {
  const wrapper = shallow(
    <GoogleRegister
      registerData={startState}
      postGoogleUser={mockFunc}
      setError={mockFunc}
    />,
  );
  return wrapper;
};

describe('Google register component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const initialState: RegisterState = {
      invalidData: false,
      confirm: false,
      googleUser: false,
    };

    wrapper = setUp(initialState);
  });

  it('Should render without error', () => {
    const component = findByDataTestAtrr(wrapper, 'registerComponent');
    expect(component.length).toBe(1);
  });
});

describe('Should handle submit Google register button', () => {
  const component = setUp(initialState);

  it('Should emit callback on click event', async () => {
    (makeAuth as jest.Mock).mockImplementation(() =>
      console.log('Register user'),
    );

    const registerButtonFunction = component
      .find(TouchableOpacity)
      .at(0)
      .prop('onPress');

    if (registerButtonFunction) {
      registerButtonFunction({} as any);
    }

    expect(makeAuth).toHaveBeenCalled();
  });
});

describe('When registered', () => {
  it('Should show confirm component', () => {
    const initialState: RegisterState = {
      invalidData: false,
      confirm: true,
      googleUser: false,
    };

    const wrapper = setUp(initialState);

    expect(wrapper.find(ConfirmGoogle).length).toBe(1);
  });
});
