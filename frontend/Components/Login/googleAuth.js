import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {GoogleSignin} from '@react-native-community/google-signin';

import google from '../Register/scss/google';
import googlelogo from '../../img/g-logo.png';
import {loginExternal} from '../../redux_actions/loginActions';
import {Image, Text, TouchableOpacity} from 'react-native';

export const GoogleAuth = ({loginExternal, loginData}) => {
  const [authObject, setAuthObject] = useState(null);

  useEffect(() => {
    try {
      GoogleSignin.configure();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const makeAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setAuthObject({userInfo});
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
    <TouchableOpacity style={google.googleButton} onPress={() => makeAuth()}>
      <Image style={google.googleButtonLogo} source={googlelogo} />
      <Text style={google.googleButtonText}>Zaloguj przez Google</Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  loginData: state.loginData,
});

GoogleAuth.propTypes = {
  loginData: PropTypes.object,
};

export default connect(mapStateToProps, {loginExternal})(GoogleAuth);