import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  deletePlantsList,
  getPlantsListsForUser,
} from '../../redux_actions/plantsListsActions';

export const DeletePlantsList = ({
  deletePlantsList,
  getPlantsListsForUser,
  plantsListsData,
  plantsListId,
}) => {
  const handlerDeletePlantsList = async (e) => {
    e.preventDefault();
    await deletePlantsList(plantsListsData.userId, plantsListId);
    await getPlantsListsForUser();
  };

  return (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={(e) => handlerDeletePlantsList(e)}>
      <Text style={styles.text}>Usuń</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    borderWidth: 2,

    borderRadius: 10,
    backgroundColor: '#f24949',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'white',
  },

  text: {
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
});

DeletePlantsList.propTypes = {
  plantsListData: PropTypes.object,
};

export default connect(mapStateToProps, {
  deletePlantsList,
  getPlantsListsForUser,
})(DeletePlantsList);
