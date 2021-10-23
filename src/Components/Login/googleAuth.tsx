import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import googlelogo from '../../img/g-logo.png';
import {loginExternal} from '../../redux_actions/loginActions';
import {RootState} from '../../redux_reducers';
import google from '../Register/styling/google';
import {makeAuth} from './helpers';
import {useSignInSilently} from './hooks';

export const GoogleAuth = ({loginExternal, setError}: PropsFromRedux) => {
  useSignInSilently(loginExternal);

  return (
    <>
      <TouchableOpacity
        style={google.googleButton}
        onPress={() => makeAuth(loginExternal, setError)}
        data-test="googleAuthComponent">
        <Image style={google.googleButtonLogo} source={googlelogo} />
        <Text style={google.googleButtonText}>Zaloguj przez Google</Text>
      </TouchableOpacity>
    </>
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: {
    setError: React.Dispatch<React.SetStateAction<string>>;
  },
) => ({
  loginData: state.loginData,
  setError: ownProps.setError,
});

const mapDispatch = {
  loginExternal: loginExternal,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GoogleAuth);
