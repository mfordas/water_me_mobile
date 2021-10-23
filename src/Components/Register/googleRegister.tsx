import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import googlelogo from '../../img/g-logo.png';
import {postGoogleUser} from '../../redux_actions/registerActions';
import {RootState} from '../../redux_reducers';
import {makeAuth} from '../Login/helpers';
import ConfirmGoogle from './confirmGoogle';
import google from './styling/google';

export const GoogleRegister = ({
  postGoogleUser,
  registerData,
  setError,
}: PropsFromRedux) => {
  return !registerData.confirm ? (
    <TouchableOpacity
      style={google.googleButton}
      onPress={() => makeAuth(postGoogleUser, setError)}
      data-test="registerComponent">
      <Image style={google.googleButtonLogo} source={googlelogo} />
      <Text style={google.googleButtonText}>Zarejestruj przez Google</Text>
    </TouchableOpacity>
  ) : (
    <ConfirmGoogle />
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: {
    setError: React.Dispatch<React.SetStateAction<string>>;
  },
) => ({
  registerData: state.registerData,
  setError: ownProps.setError,
});

const mapDispatch = {
  postGoogleUser: postGoogleUser,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GoogleRegister);
