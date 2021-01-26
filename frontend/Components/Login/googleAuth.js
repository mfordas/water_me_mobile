import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import google from '../Register/styling/google';
import googlelogo from '../../img/g-logo.png';
import {loginExternal} from '../../redux_actions/loginActions';
import {REACT_APP_GOOGLE_AUTH_API_CLIENTID} from '@env';

export const GoogleAuth = ({loginExternal, loginData}) => {
  useEffect(() => {
    try {
      GoogleSignin.configure({
        webClientId: REACT_APP_GOOGLE_AUTH_API_CLIENTID,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const makeAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const user = {...userInfo, ...tokens};
      await loginExternal(user);
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
      <TouchableOpacity
        onPress={async () => console.log(await GoogleSignin.getCurrentUser())}>
        <Text>test button</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => console.log(loginData)}>
        <Text>test button</Text>
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
