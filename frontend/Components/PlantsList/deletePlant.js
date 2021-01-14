import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {deletePlant} from '../../redux_actions/plantsActions';
import {showPlantsList} from '../../redux_actions/plantsListsActions';
import plantsList from './styles/plantsList';

const DeletePlant = ({deletePlant, showPlantsList, plantId, listId}) => {
  const handleDeletePlant = async () => {
    await deletePlant(plantId);
    await showPlantsList(listId);
  };

  return (
    <View>
      <TouchableOpacity
        style={plantsList.deletePlantButton}
        onPress={handleDeletePlant}>
        Usuń
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
