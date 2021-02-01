import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {resetRegisterState} from '../../redux_actions/registerActions';
import {style} from '../Menu/index';
import * as RootNavigation from '../../Utils/rootNavigation';

const ConfirmGoogle = ({resetRegisterState}) => {
  return (
    <>
      <Text>Konto założone!</Text>
      <Text> Możesz teraz się zalogować.</Text>
      <TouchableOpacity
        style={style.buttonMenu}
        onPress={() => {
          resetRegisterState();
          RootNavigation.navigate('Login');
        }}>
        <Text> Ekran główny </Text>
      </TouchableOpacity>
    </>
  );
};

const mapStateToProps = (state) => ({
  registerData: state.registerData,
});

ConfirmGoogle.propTypes = {
  registerData: PropTypes.object,
};

export default connect(mapStateToProps, {resetRegisterState})(ConfirmGoogle);
