import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import google from '../Register/styling/google';
import googlelogo from '../../img/g-logo.png';
import {loginExternal} from '../../redux_actions/loginActions';

export const GoogleAuth = ({loginExternal}) => {
  const signInSilently = async () => {
    try {
      const user = await GoogleSignin.signInSilently();
      await loginExternal(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    signInSilently();
  }, []);

  const makeAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await loginExternal(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <>
      <TouchableOpacity style={google.googleButton} onPress={() => makeAuth()}>
        <Image style={google.googleButtonLogo} source={googlelogo} />
        <Text style={google.googleButtonText}>Zaloguj przez Google</Text>
      </TouchableOpacity>
    </>
  );
};

const mapStateToProps = (state) => ({
  loginData: state.loginData,
});

GoogleAuth.propTypes = {
  loginData: PropTypes.object,
};

export default connect(mapStateToProps, {loginExternal})(GoogleAuth);
