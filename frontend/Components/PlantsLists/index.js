import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AddPlantsList from './addPlantsList';
import ShowPlantsLists from './showPlantsLists';
import PlantsList from '../PlantsList/plantsList';
import {getPlantsListsForUser} from '../../redux_actions/plantsListsActions';
import {Text} from 'react-native';

const Stack = createStackNavigator();

const PlantsListsComponent = ({getPlantsListsForUser, plantsListsData}) => {
  useEffect(() => {
    const getPlantsLists = async () => {
      await getPlantsListsForUser();
      console.log(plantsListsData);
    };

    getPlantsLists();
  }, [getPlantsListsForUser]);

  return (
    <>
      <AddPlantsList />
      <Stack.Navigator>
        <Stack.Screen name="PlantsLists" options={{headerShown: false}}>
          {() => <ShowPlantsLists />}
        </Stack.Screen>
        {plantsListsData.plantsLists.map((list, index) => (
          <Stack.Screen
            key={list.id}
            name={`${list.id}`}
            options={{headerShown: false}}>
            {() => <PlantsList listIndex={index} />}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </>
  );
};

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
});

PlantsListsComponent.propTypes = {
  plantsListsData: PropTypes.object,
};

export default connect(mapStateToProps, {getPlantsListsForUser})(
  PlantsListsComponent,
);
