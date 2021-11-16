import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { connect, ConnectedProps } from 'react-redux';

import { getPlantsListsForUser } from '../../redux_actions/plantsListsActions';
import { RootState } from '../../redux_reducers';
import PlantsList from './plantsList';

const Stack = createStackNavigator();

export const PlantsListComponent = ({ getPlantsListsForUser, plantsListsData }: PropsFromRedux) => {
  useEffect(() => {
    const getPlantsLists = async () => {
      await getPlantsListsForUser();
    };

    getPlantsLists();
  }, [getPlantsListsForUser]);

  return (
    <Stack.Navigator>
      {plantsListsData.plantsLists.map((list, index) => (
        <Stack.Screen key={list.id} name={`${list.id}`} options={{ headerShown: false }}>
          {(props) => <PlantsList {...props} listIndex={index} listName={list.name} />}
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
