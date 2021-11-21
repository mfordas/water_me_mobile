import { REACT_APP_GOOGLE_AUTH_API_CLIENTID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import type { Node } from 'react';
import { SafeAreaView } from 'react-native';
import { connect, Provider } from 'react-redux';

import Footer from './src/Components/Footer/footer';
import HomePage from './src/Components/HomePage';
import Logo from './src/Components/Logo/logo';
import Menu from './src/Components/Menu';
import PlantsListsComponent from './src/Components/PlantsLists';
import { navigationRef } from './src/Utils/rootNavigation';
import { loginCheck } from './src/redux_actions/loginActions';
import { store } from './src/redux_store/reduxStore';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App: () => Node = ({ loginData, loginCheck }) => {
  console.log(REACT_APP_GOOGLE_AUTH_API_CLIENTID);
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
      <SafeAreaView style={{ flex: 1 }}>
        <Logo />
        <Menu />
        <Stack.Navigator>
          {!loginData.isLogged && (
            <>
              <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
            </>
          )}
          {loginData.isLogged && (
            <>
              <Stack.Screen
                name="PlantsList"
                component={PlantsListsComponent}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
        <Footer />
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

const AppConnected = connect(mapStateToProps, { loginCheck })(App);

const AppContext = () => {
  return (
    <Provider store={store}>
      <AppConnected />
    </Provider>
  );
};

export default AppContext;
