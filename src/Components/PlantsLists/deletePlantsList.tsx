import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {
  deletePlantsList,
  getPlantsListsForUser,
} from '../../redux_actions/plantsListsActions';
import {RootState} from '../../redux_reducers';

export const DeletePlantsList = ({
  deletePlantsList,
  getPlantsListsForUser,
  plantsListId,
}: PropsFromRedux) => {
  const handlerDeletePlantsList = async () => {
    await deletePlantsList(plantsListId);
    await getPlantsListsForUser();
  };

  return (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handlerDeletePlantsList()}
      data-test="deletePlantListComponent">
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

const mapStateToProps = (
  state: RootState,
  ownProps: {plantsListId: number},
) => ({
  plantsListsData: state.plantsListsData,
  plantsListId: ownProps.plantsListId,
});

const mapDispatch = {
  deletePlantsList: deletePlantsList,
  getPlantsListsForUser: getPlantsListsForUser,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DeletePlantsList);
