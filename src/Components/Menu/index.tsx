import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

import * as RootNavigation from '../../Utils/rootNavigation';
import { logout } from '../../redux_actions/loginActions';
import { RootState } from '../../redux_reducers';

export const Menu = ({ loginData, logout }: PropsFromRedux) => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={style.containerMenu}>
      {!loginData.isLogged && <></>}
      {loginData.isLogged && (
        <>
          <TouchableOpacity
            style={style.buttonMenu}
            onPress={() => RootNavigation.navigate('PlantsLists')}
            data-test="myPlantsButton"
          >
            <Text style={style.buttonMenuText}>Moje listy rośliny</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.buttonMenu}
            onPress={() => handleLogout()}
            data-test="logoutButton"
          >
            <Text style={style.buttonMenuText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  containerMenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonMenu: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    color: 'black',
    flex: 2,
    margin: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    maxWidth: 180,
  },
  buttonMenuText: {
    fontSize: 16,
  },
});

const mapStateToProps = (state: RootState) => ({
  loginData: state.loginData,
});

const mapDispatch = {
  logout: logout,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export { style };

export default connector(Menu);
