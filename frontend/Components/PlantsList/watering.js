import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {updateLastWateringDate} from '../../redux_actions/plantsActions';
import {showPlantsList} from '../../redux_actions/plantsListsActions';
import setCurrentDate from './setCurrentDate';
import styles from './styles/plantsList';

const Watering = ({
  updateLastWateringDate,
  showPlantsList,
  lastWateringDate,
  plantId,
  wateringCycle,
  listId,
}) => {
  const currentDate = setCurrentDate(new Date());
  const oneDayInMiliseconds = 86400000;

  const handleUpdateLastWateringDate = async () => {
    await updateLastWateringDate(plantId, currentDate);
    await showPlantsList(listId);
  };

  const countWatering = () => {
    const countDaysSinceLastWatering =
      (new Date(currentDate).getTime() - new Date(lastWateringDate).getTime()) /
      oneDayInMiliseconds;

    const nextWateringIn = wateringCycle - countDaysSinceLastWatering;

    if (countDaysSinceLastWatering < wateringCycle) {
      return (
        <View style={styles.wateringStatusContainer}>
          <Text style={[styles.wateringStatus, styles.statusOk]}>
            U mnie w porządku!
          </Text>
          <Text style={styles.wateringStatus}>
            Kolejne podlewanie za: {nextWateringIn}
            {nextWateringIn === 1 ? ' dzień' : ' dni'}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.wateringStatusContainer]}>
          <Text style={[styles.wateringStatus, styles.statusNok]}>
            Potrzebuję wody!
          </Text>
          <TouchableOpacity onPress={handleUpdateLastWateringDate}>
            <Text style={[styles.wateringStatus, styles.buttonWatering]}>
              Podlej
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.wateringContainer}>
      <Text>{countWatering()}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
  plantsData: state.plantsData,
});

Watering.propTypes = {
  plantsListsData: PropTypes.object,
  plantsData: PropTypes.object,
};

export default connect(mapStateToProps, {
  updateLastWateringDate,
  showPlantsList,
})(Watering);
