import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  showPlantsList,
  getPlantsListsForUser,
} from '../../redux_actions/plantsListsActions';
import AddPlant from './addPlant';
import DeletePlant from './deletePlant';
import Watering from './watering';
import styles from './styles/plantsList';

const PlantsList = ({showPlantsList, plantsListsData, listIndex}) => {
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

  const generatePlantsList = (plantsArray) => {
    if (plantsArray) {
      const plantsList = plantsArray.map((plant, index) => {
        return (
          <View style={styles.plantContainer}>
            <Text>{plant.name}</Text>
            <Image
              style={styles.plantPicture}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            {/* <img src={`../../images/${plant.pictureUrl}.png`} /> */}
            <Text>Podlewanie co: {plant.wateringCycle}</Text>
            <Watering
              lastWateringDate={plant.lastTimeWatered}
              plantId={plant.id}
              wateringCycle={plant.wateringCycle}
              listId={plantsListsData.plantsLists[listIndex].id}
            />
            <DeletePlant
              plantId={plant.id}
              listId={plantsListsData.plantsLists[listIndex].id}
            />
          </View>
        );
      });

      return plantsList;
    } else {
      return <></>;
    }
  };

  return (
    <View style={styles.plantsContainer}>
      <TouchableOpacity
        style={styles.addPlantButton}
        onPress={() => setShowAddPlantForm(!showAddPlantForm)}>
        <Text style={{textAlign: 'center'}}>Dodaj roślinę</Text>
      </TouchableOpacity>
      {showAddPlantForm ? (
        <AddPlant listId={plantsListsData.plantsLists[listIndex].id} />
      ) : null}
      <View style={styles.plantsContainer}>{generatePlantsList(plants)}</View>
    </View>
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