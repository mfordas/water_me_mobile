import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {logout, loginCheck} from '../../redux_actions/loginActions';
import * as RootNavigation from '../../Utils/rootNavigation';

export const Menu = ({loginData, logout}) => {
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
            onPress={() => RootNavigation.navigate('PlantsLists')}>
            <Text style={style.buttonMenuText}>Moje listy rośliny</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.buttonMenu}
            onPress={() => handleLogout()}>
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
    fontSize: 18,
  },
});

const mapStateToProps = (state) => ({
  loginData: state.loginData,
});

Menu.propTypes = {
  loginData: PropTypes.shape({
    loginData: PropTypes.shape({
      name: PropTypes.string,
      googleId: PropTypes.string,
      invalidData: PropTypes.bool,
    }),
    isLogged: PropTypes.bool,
  }),
  logout: PropTypes.func,
  loginCheck: PropTypes.func,
};

export {style};

export default connect(mapStateToProps, {logout, loginCheck})(Menu);
