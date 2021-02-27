import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {
  addPlantsList,
  getPlantsListsForUser,
} from '../../redux_actions/plantsListsActions';
import {RootState} from '../../redux_reducers';

export const AddPlantsList = ({
  addPlantsList,
  getPlantsListsForUser,
}: PropsFromRedux) => {
  const [plantsListName, setPlantsListName] = useState('');
  const [submitPlantsList, setSubmitPlantsList] = useState(false);

  const verifyPlantsListName = () =>
    !plantsListName && submitPlantsList ? 'Najpierw wpisz nazwę listy!' : null;

  const addNewPlantsList = async () => {
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
          onChangeText={(text) => setPlantsListName(text)}
          value={plantsListName}></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => addNewPlantsList()}>
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

const mapStateToProps = (state: RootState) => ({
  plantsListsData: state.plantsListsData,
});

const mapDispatch = {
  getPlantsListsForUser: getPlantsListsForUser,
  addPlantsList: addPlantsList,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddPlantsList);
