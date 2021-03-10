import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {connect, ConnectedProps} from 'react-redux';

import PlantsList from './plantsList';
import {getPlantsListsForUser} from '../../redux_actions/plantsListsActions';
import {RootState} from '../../redux_reducers/';

const Stack = createStackNavigator();

export const PlantsListComponent = ({
  getPlantsListsForUser,
  plantsListsData,
}: PropsFromRedux) => {
  useEffect(() => {
    const getPlantsLists = async () => {
      await getPlantsListsForUser();
    };

    getPlantsLists();
  }, [getPlantsListsForUser]);

  return (
    <Stack.Navigator>
      {plantsListsData.plantsLists.map((list, index) => (
        <Stack.Screen name={`${list.id}`} options={{headerShown: false}}>
          {(props) => (
            <PlantsList {...props} listIndex={index} listName={list.name} />
          )}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  );
};

const mapStateToProps = (state: RootState) => ({
  plantsListsData: state.plantsListsData,
});

const mapDispatch = {
  getPlantsListsForUser: getPlantsListsForUser,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PlantsListComponent);
