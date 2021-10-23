import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import * as RootNavigation from '../../Utils/rootNavigation';
import {getPlantsListsForUser} from '../../redux_actions/plantsListsActions';
import {PlantsList} from '../../redux_actions/plantsListsTypes';
import {RootState} from '../../redux_reducers';
import {style} from '../Menu/index';
import AddPlantsList from './addPlantsList';
import DeletePlantsList from './deletePlantsList';

export const ShowPlantsLists = ({
  getPlantsListsForUser,
  plantsListsData,
}: PropsFromRedux) => {
  useEffect(() => {
    const getPlantsLists = async () => {
      await getPlantsListsForUser();
    };
    getPlantsLists();
  }, [getPlantsListsForUser]);

  const generatePlantsLists = (plantsListsArray: PlantsList[]) => {
    return (
      <>
        <AddPlantsList />
        <ScrollView
          style={styles.plantsListsContainer}
          contentContainerStyle={{alignItems: 'center'}}
          data-test="showPlantsListsComponent">
          {plantsListsArray.map((plantsList) => {
            return (
              <View
                style={styles.plantsListContainer}
                key={plantsList.id}
                data-test="plantsListContainer">
                <Text style={styles.text}>{plantsList.name}</Text>
                <TouchableOpacity
                  style={style.buttonMenu}
                  onPress={() => {
                    RootNavigation.navigate(`${plantsList.id}`);
                  }}>
                  <Text style={style.buttonMenuText}>Przejdź</Text>
                </TouchableOpacity>
                <DeletePlantsList plantsListId={plantsList.id} />
              </View>
            );
          })}
        </ScrollView>
      </>
    );
  };

  return <>{generatePlantsLists(plantsListsData.plantsLists)}</>;
};

const styles = StyleSheet.create({
  plantsListsContainer: {
    width: '100%',
  },

  plantsListContainer: {
    justifyContent: 'space-around',
    margin: 0.5,
    padding: 0.5,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
  },
  text: {
    fontSize: 16,
  },
});

const mapStateToProps = (state: RootState) => ({
  plantsListsData: state.plantsListsData,
});

const mapDispatch = {
  getPlantsListsForUser: getPlantsListsForUser,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ShowPlantsLists);
