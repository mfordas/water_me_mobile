import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {deletePlant} from '../../redux_actions/plantsActions';
import {showPlantsList} from '../../redux_actions/plantsListsActions';
import styles from './styles/plantsList';
import {RootState} from '../../redux_reducers/';
import {DeletePlantProps} from './plantsList';

export const DeletePlant = ({
    deletePlant,
    showPlantsList,
    plantId,
    listId,
}: PropsFromRedux) => {
    const handleDeletePlant = async () => {
        await deletePlant(plantId);
        await showPlantsList(listId);
    };

    return (
        <View>
            <TouchableOpacity
                style={[styles.button, styles.deletePlantButton]}
                onPress={handleDeletePlant}
                data-test='deletePlantButton'>
                <Text style={styles.deletePlantButtonText}>Usuń</Text>
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = (state: RootState, ownProps: DeletePlantProps) => ({
    plantsData: state.plantsData,
    plantId: ownProps.plantId,
    listId: ownProps.listId,
});

const mapDispatch = {
    deletePlant: deletePlant,
    showPlantsList: showPlantsList,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DeletePlant);
