import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

import DeletePlant from './deletePlant';
import Watering from './watering';
import styles from './styles/plantsList';

export const PlantsListGenerator = ({plants, listIndex, plantsListsData}) => {
  const generatePlantsList = (plantsArray) => {
    if (plantsArray) {
      const plantsList = plantsArray.map((plant, index) => {
        return (
          <View key={index} style={styles.plantContainer}>
            <Text style={styles.plantText}>{plant.name}</Text>
            <Image
              style={styles.plantPicture}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            <Text style={styles.plantText}>
              Podlewanie co: {plant.wateringCycle}
            </Text>
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
    <View style={styles.plantsContainer}>{generatePlantsList(plants)}</View>
  );
};

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
});

PlantsListGenerator.propTypes = {
  plantsListsData: PropTypes.object,
};

export default connect(mapStateToProps, {})(PlantsListGenerator);
