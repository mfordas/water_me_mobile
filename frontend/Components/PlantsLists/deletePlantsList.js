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
  plantsListId,
}) => {
  const handlerDeletePlantsList = async () => {
    await deletePlantsList(plantsListId);
    await getPlantsListsForUser();
  };

  return (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handlerDeletePlantsList()}>
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
