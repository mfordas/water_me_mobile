import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  addPlantsList,
  getPlantsListsForUser,
} from '../../redux_actions/plantsListsActions';

export const AddPlantsList = ({addPlantsList, getPlantsListsForUser}) => {
  const [plantsListName, setPlantsListName] = useState('');
  const [submitPlantsList, setSubmitPlantsList] = useState(false);

  const verifyPlantsListName = () =>
    !plantsListName && submitPlantsList ? 'Najpierw wpisz nazwę listy!' : null;

  const addNewPlantsList = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setSubmitPlantsList(true);
    if (plantsListName) {
      await addPlantsList(plantsListName);
      setSubmitPlantsList(false);
      await getPlantsListsForUser();
    } else return;
  };

  return (
    <View style={styles.addPlantsListContainer}>
      <View style={styles.addPlantsListForm}>
        <TextInput
          style={styles.input}
          onChange={(e) => setPlantsListName(e.target.value)}></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={(e) => addNewPlantsList(e)}>
          <Text style={styles.text}>Dodaj listę roślin</Text>
        </TouchableOpacity>
      </View>
      <Text>{verifyPlantsListName()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  addPlantsListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  addPlantsListForm: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    margin: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    width: 200,
  },

  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginTop: 15,
  },

  text: {
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
});

AddPlantsList.propTypes = {
  plantsListsData: PropTypes.object,
};

export default connect(mapStateToProps, {addPlantsList, getPlantsListsForUser})(
  AddPlantsList,
);
