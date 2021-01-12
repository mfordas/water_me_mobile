import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {Provider} from 'react-redux';

import LogoComponent from './frontend/Components/Logo';
import FooterComponent from './frontend/Components/Footer';
import Menu from './frontend/Components/Menu';
import AddPlant from './frontend/Components/PlantsList/addPlant';
import {store} from './frontend/redux_store/reduxStore';
import PlantsList from './frontend/Components/PlantsList/plantsList';

import HomePage from './frontend/Views/HomePage';
import PlantsLists from './frontend/Views/PlantsLists';

// import './frontend/scss/main_styling.scss';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <LogoComponent />
          <Menu />
          <Stack.Navigator>
            {/* <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PlantsLists"
              component={PlantsLists}
              options={{headerShown: false}}
            /> */}
            <Stack.Screen
              name="PlantsList"
              component={PlantsList}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
          <FooterComponent />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
