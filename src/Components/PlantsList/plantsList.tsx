import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect, ConnectedProps } from 'react-redux';

import { showPlantsList } from '../../redux_actions/plantsListsActions';
import { RootState } from '../../redux_reducers';
import AddPlant from './addPlant';
import { useCreatePlantsList } from './hooks';
import PlantsListGenerator from './plantsListGenerator';
import styles from './styles/plantsList';

export type DeletePlantProps = {
  plantId: number;
  listId: number;
};

export type WateringProps = {
  lastWateringDate: Date;
  plantId: number;
  wateringCycle: number;
  listId: number;
};

export const PlantsList = ({ showPlantsList, plantsListsData, listIndex, listName }: PropsFromRedux) => {
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);
  const plants = useCreatePlantsList(plantsListsData, showPlantsList, listIndex);

  return (
    <ScrollView style={styles.plantsContainer} contentContainerStyle={{ alignItems: 'center' }}>
      <Text style={styles.listName}>{listName}</Text>
      <TouchableOpacity
        style={[styles.button, styles.addPlantButton]}
        onPress={() => setShowAddPlantForm(!showAddPlantForm)}
      >
        <Text style={styles.addPlantButtonText}>Dodaj roślinę</Text>
      </TouchableOpacity>
      {showAddPlantForm && (
        <AddPlant
          listId={plantsListsData.plantsLists[listIndex].id}
          setShowAddPlantForm={setShowAddPlantForm}
        />
      )}
      <PlantsListGenerator plants={plants} listIndex={listIndex} />
    </ScrollView>
  );
};

const mapStateToProps = (state: RootState, ownProps: { listIndex: number; listName: string }) => ({
  plantsListsData: state.plantsListsData,
  listIndex: ownProps.listIndex,
  listName: ownProps.listName,
});

const mapDispatch = {
  showPlantsList: showPlantsList,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PlantsList);
