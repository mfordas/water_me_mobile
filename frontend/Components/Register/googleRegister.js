import React, {useEffect} from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {GoogleSignin} from '@react-native-community/google-signin';

import google from './styling/google';
import googlelogo from '../../img/g-logo.png';
import ConfirmGoogle from './confirmGoogle';
import {postGoogleUser} from '../../redux_actions/registerActions';

const GoogleRegister = ({postGoogleUser, registerData}) => {
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
      await postGoogleUser(userInfo);
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

  return !registerData.confirm ? (
    <TouchableOpacity style={google.googleButton} onPress={() => makeAuth()}>
      <Image style={google.googleButtonLogo} source={googlelogo} />
      <Text style={google.googleButtonText}>Zarejestruj przez Google</Text>
    </TouchableOpacity>
  ) : (
    <ConfirmGoogle />
  );
};

const mapStateToProps = (state) => ({
  registerData: state.registerData,
});

GoogleRegister.propTypes = {
  registerData: PropTypes.object,
};

export default connect(mapStateToProps, {postGoogleUser})(GoogleRegister);
