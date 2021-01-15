import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import PlantsList from './plantsList';
import {getPlantsListsForUser} from '../../redux_actions/plantsListsActions';

const Stack = createStackNavigator();

const PlantsListComponent = ({
  getPlantsListsForUser,
  plantsListsData = {plantsLists: [1, 2, 3, 4, 5]},
}) => {
  useEffect(() => {
    const getPlantsLists = async () => {
      await getPlantsListsForUser();
    };

    getPlantsLists();
  }, [getPlantsListsForUser]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="1" options={{headerShown: false}}>
        {(props) => <PlantsList {...props} listIndex={1} />}
      </Stack.Screen>
      {plantsListsData.plantsLists.map((list, index) => (
        <Stack.Screen name={`${list._id}`} options={{headerShown: false}}>
          {(props) => <PlantsList {...props} listIndex={index} />}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
});

PlantsListComponent.propTypes = {
  plantsListsData: PropTypes.object,
};

export default connect(mapStateToProps, {getPlantsListsForUser})(
  PlantsListComponent,
);
