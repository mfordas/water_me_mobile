import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native-gesture-handler';

import {
  showPlantsList,
  getPlantsListsForUser,
} from '../../redux_actions/plantsListsActions';
import AddPlant from './addPlant';
import PlantsListGenerator from './plantsListGenerator';
import styles from './styles/plantsList';

const PlantsList = ({showPlantsList, plantsListsData, listIndex, listName}) => {
  const [plants, setPlants] = useState([]);
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);

  useEffect(() => {
    const getPlantsFromList = async () => {
      plantsListsData.plantsLists.length > 0
        ? await showPlantsList(plantsListsData.plantsLists[listIndex].id)
        : null;
    };

    getPlantsFromList();

    setPlants(plantsListsData.plants);
  }, []);

  useEffect(() => {
    setPlants(plantsListsData.plants);
  }, [plantsListsData.plants]);

  return (
    <ScrollView
      style={styles.plantsContainer}
      contentContainerStyle={{alignItems: 'center'}}>
      <Text style={styles.listName}>{listName}</Text>
      <TouchableOpacity
        style={[styles.button, styles.addPlantButton]}
        onPress={() => setShowAddPlantForm(!showAddPlantForm)}>
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

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
});

PlantsList.propTypes = {
  plantsListsData: PropTypes.object,
};

export default connect(mapStateToProps, {
  showPlantsList,
  getPlantsListsForUser,
})(PlantsList);
