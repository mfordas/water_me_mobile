import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {updateLastWateringDate} from '../../redux_actions/plantsActions';
import {showPlantsList} from '../../redux_actions/plantsListsActions';
import {RootState} from '../../redux_reducers';
import {useCountWatering} from './hooks';
import {WateringProps} from './plantsList';
import styles from './styles/plantsList';

export const Watering = ({
  updateLastWateringDate,
  showPlantsList,
  lastWateringDate,
  plantId,
  wateringCycle,
  listId,
}: PropsFromRedux) => {
  const {nextWateringIn, currentDate} = useCountWatering(
    lastWateringDate,
    wateringCycle,
  );

  const handleUpdateLastWateringDate = async () => {
    await updateLastWateringDate(plantId, currentDate);
    await showPlantsList(listId);
  };

  const renderWateringStatus = () => {
    if (nextWateringIn > 0) {
      return (
        <View style={styles.wateringStatusContainer}>
          <Text
            style={[styles.wateringStatus, styles.statusOk]}
            data-test="statusOk">
            U mnie w porządku!
          </Text>
          <Text style={styles.wateringStatus} data-test="nextWateringContainer">
            Kolejne podlewanie za: {nextWateringIn}
            {nextWateringIn === 1 ? ' dzień' : ' dni'}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.wateringStatusContainer]}>
          <Text
            style={[styles.wateringStatus, styles.statusNok]}
            data-test="statusNok">
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
    <View style={styles.wateringContainer} data-test="WateringComponent">
      {renderWateringStatus()}
    </View>
  );
};

const mapStateToProps = (state: RootState, ownProps: WateringProps) => ({
  lastWateringDate: ownProps.lastWateringDate,
  plantId: ownProps.plantId,
  wateringCycle: ownProps.wateringCycle,
  listId: ownProps.listId,
});

const mapDispatch = {
  updateLastWateringDate: updateLastWateringDate,
  showPlantsList: showPlantsList,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Watering);
