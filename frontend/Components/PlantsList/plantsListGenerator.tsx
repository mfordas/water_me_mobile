import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {View, Text, Image} from 'react-native';

import DeletePlant from './deletePlant';
import Watering from './watering';
import styles from './styles/plantsList';
import {Plant} from '../../redux_actions/plantsTypes';
import {RootState} from '../../redux_reducers/';

export const PlantsListGenerator = ({
  plants,
  listIndex,
  plantsListsData,
}: PropsFromRedux) => {
  const generatePlantsList = (plantsArray: Plant[]) => {
    if (plantsArray) {
      const plantsList = plantsArray.map((plant, index) => {
        return (
          <View key={index} style={styles.plantContainer}>
            <Text style={styles.plantText}>{plant.name}</Text>
            <Image
              style={styles.plantPicture}
              source={{
                uri: `http://192.168.0.45:8080/images/${plant.pictureUrl}.png`,
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

const mapStateToProps = (
  state: RootState,
  ownProps: {plants: Plant[]; listIndex: number},
) => ({
  plantsListsData: state.plantsListsData,
  listIndex: ownProps.listIndex,
  plants: ownProps.plants,
});

const mapDispatch = {};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PlantsListGenerator);
