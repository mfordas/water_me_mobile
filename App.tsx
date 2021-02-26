import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import {GoogleSignin} from '@react-native-community/google-signin';

import HomePage from './frontend/Components/HomePage';
import LogoComponent from './frontend/Components/Logo';
import Menu from './frontend/Components/Menu';
import PlantsListsComponent from './frontend/Components/PlantsLists';
import FooterComponent from './frontend/Components/Footer';

import {store} from './frontend/redux_store/reduxStore';
import {loginCheck} from './frontend/redux_actions/loginActions';
import {REACT_APP_GOOGLE_AUTH_API_CLIENTID} from '@env';
import {navigationRef} from './frontend/Utils/rootNavigation';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App: () => React$Node = ({loginData, loginCheck}) => {
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
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
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
                name="PlantsList"
                component={PlantsListsComponent}
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

const AppConnected = connect(mapStateToProps, {loginCheck})(App);

const AppContext = () => {
  return (
    <Provider store={store}>
      <AppConnected />
    </Provider>
  );
};

export default AppContext;
