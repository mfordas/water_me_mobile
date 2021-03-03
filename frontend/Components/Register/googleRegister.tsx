import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import google from './styling/google';
import googlelogo from '../../img/g-logo.png';
import ConfirmGoogle from './confirmGoogle';
import {postGoogleUser} from '../../redux_actions/registerActions';
import {makeAuth} from '../Login/helpers';
import {RootState} from '../../redux_reducers/';

export const GoogleRegister = ({
  postGoogleUser,
  registerData,
  setError,
}: PropsFromRedux) => {
  return !registerData.confirm ? (
    <TouchableOpacity
      style={google.googleButton}
      onPress={() => makeAuth(postGoogleUser, setError)}>
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
