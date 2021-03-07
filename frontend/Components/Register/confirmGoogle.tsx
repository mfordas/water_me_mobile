import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {resetRegisterState} from '../../redux_actions/registerActions';
import {style} from '../Menu/index';
import * as RootNavigation from '../../Utils/rootNavigation';
import {RootState} from '../../redux_reducers/';

export const ConfirmGoogle = ({resetRegisterState}: PropsFromRedux) => {
  return (
    <>
      <Text>Konto założone!</Text>
      <Text>Możesz teraz się zalogować.</Text>
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

const mapStateToProps = (state: RootState) => ({
  registerData: state.registerData,
});

const mapDispatch = {
  resetRegisterState: resetRegisterState,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ConfirmGoogle);
