import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import google from './styling/google';
import googlelogo from '../../img/g-logo.png';
import ConfirmGoogle from './confirmGoogle';
import {postGoogleUser} from '../../redux_actions/registerActions';

const GoogleRegister = ({postGoogleUser, registerData, setError}) => {
  const makeAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await postGoogleUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('Rejestracja przerwana');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setError('Jesteś już w trakcie operacji rejestracji');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Brak połączenia z Google Play');
      } else {
        setError('Coś się zepsuło :(');
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

const mapStateToProps = (state, ownProps) => ({
  registerData: state.registerData,
  setError: ownProps.setError,
});

GoogleRegister.propTypes = {
  registerData: PropTypes.object,
  setError: PropTypes.func,
};

export default connect(mapStateToProps, {postGoogleUser})(GoogleRegister);
