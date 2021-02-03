import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ShowPlantsLists from './showPlantsLists';
import PlantsList from '../PlantsList/plantsList';
import {getPlantsListsForUser} from '../../redux_actions/plantsListsActions';

const Stack = createStackNavigator();

const PlantsListsComponent = ({getPlantsListsForUser, plantsListsData}) => {
  useEffect(() => {
    const getPlantsLists = async () => {
      await getPlantsListsForUser();
    };

    getPlantsLists();
  }, [getPlantsListsForUser]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PlantsLists"
        component={ShowPlantsLists}
        options={{headerShown: false}}
      />
      {plantsListsData.plantsLists.map((list, index) => (
        <Stack.Screen
          key={list.id}
          name={`${list.id}`}
          options={{headerShown: false}}>
          {(props) => (
            <PlantsList {...props} listIndex={index} listName={list.name} />
          )}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
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
