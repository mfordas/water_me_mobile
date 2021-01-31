import React, {useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import FooterComponent from './frontend/Components/Footer';
import Menu from './frontend/Components/Menu';
import {store} from './frontend/redux_store/reduxStore';
import PlantsList from './frontend/Components/PlantsList/plantsList';
import LogoComponent from './frontend/Components/Logo';
import {loginCheck, logout} from './frontend/redux_actions/loginActions';
import {REACT_APP_GOOGLE_AUTH_API_CLIENTID} from '@env';

import HomePage from './frontend/Views/HomePage';
import PlantsLists from './frontend/Views/PlantsLists';

const App: () => React$Node = ({loginData, loginCheck, logout}) => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: REACT_APP_GOOGLE_AUTH_API_CLIENTID,
      offlineAccess: false,
      forceCodeForRefreshToken: true,
    });
    loginCheck();
  }, [loginData.isLogged]);

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <LogoComponent />
        <Menu />
        <Stack.Navigator>
          {!loginData.isLogged && (
            <>
              <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{headerShown: false}}
              />
            </>
          )}
          {loginData.isLogged && (
            <>
              <Stack.Screen
                name="PlantsLists"
                component={PlantsLists}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PlantsList"
                component={PlantsList}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
        <FooterComponent />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  loginData: state.loginData,
});

Menu.propTypes = {
  loginData: PropTypes.object,
};

const AppConnected = connect(mapStateToProps, {loginCheck, logout})(App);

const AppContext = () => {
  return (
    <Provider store={store}>
      <AppConnected />
    </Provider>
  );
};

export default AppContext;
