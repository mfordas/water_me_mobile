import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {deletePlant} from '../../redux_actions/plantsActions';
import {showPlantsList} from '../../redux_actions/plantsListsActions';
import styles from './styles/plantsList';

const DeletePlant = ({deletePlant, showPlantsList, plantId, listId}) => {
  const handleDeletePlant = async () => {
    await deletePlant(plantId);
    await showPlantsList(listId);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, styles.deletePlantButton]}
        onPress={handleDeletePlant}>
        <Text style={styles.deletePlantButtonText}>Usuń</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  plantsData: state.plantsData,
});

DeletePlant.propTypes = {
  plantsData: PropTypes.object,
};

export default connect(mapStateToProps, {deletePlant, showPlantsList})(
  DeletePlant,
);
