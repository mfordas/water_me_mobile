import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {connect,Provider} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import PropTypes from 'prop-types';
import {GoogleSignin} from '@react-native-community/google-signin';

import HomePage from './frontend/Components/HomePage';
import Logo from './frontend/Components/Logo/logo';
import Menu from './frontend/Components/Menu';
import PlantsListsComponent from './frontend/Components/PlantsLists';
import Footer from './frontend/Components/Footer/footer';

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
                <Logo />
                <Menu />
                <Stack.Navigator>
                    {!loginData.isLogged && (
                        <>
                            <Stack.Screen
                                name='HomePage'
                                component={HomePage}
                                options={{headerShown: false}}
                            />
                        </>
                    )}
                    {loginData.isLogged && (
                        <>
                            <Stack.Screen
                                name='PlantsList'
                                component={PlantsListsComponent}
                                options={{headerShown: false}}
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

const AppConnected = connect(mapStateToProps, {loginCheck})(App);

const AppContext = () => {
    return (
        <Provider store={store}>
            <AppConnected />
        </Provider>
    );
};

export default AppContext;
