import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  addPlantToList,
  uploadPlantImage,
} from '../../redux_actions/plantsActions';
import {showPlantsList} from '../../redux_actions/plantsListsActions';
import ErrorMessage from '../ErrorMessage/errorMessage';
import {DatePicker} from './datePicker';
import {WateringCycle} from './wateringCycle';
import {AddPlantPicture} from './addPlantPicture';
import styles from './styles/plantsList';

export const AddPlant = ({
  listId,
  addPlantToList,
  uploadPlantImage,
  plantsData,
  showPlantsList,
  setShowAddPlantForm,
}) => {
  const [name, setName] = useState('');
  const [wateringCycle, setWateringCycle] = useState('0');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const [picture, setPicture] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const updatePlantsList = async () => {
      await showPlantsList(listId);
    };

    updatePlantsList();
  }, [plantsData, listId, showPlantsList]);

  const handleUploadingFile = async () => {
    if (singleFile != null) {
      const data = new FormData();
      data.append('image', singleFile);
      const imageName = await uploadPlantImage(data);

      if (imageName) {
        setPicture(imageName);
        return imageName;
      }
    } else {
      setPicture('No picture selected');
    }
  };

  const handleAddingPlantToList = async () => {
    setFormSubmitted(true);

    if (name && wateringCycle && singleFile && date) {
      const pictureName = await handleUploadingFile();

      const plantData = {
        name: name,
        wateringCycle: wateringCycle,
        pictureUrl: pictureName,
        wateringCycleBeginingData: date,
        lastTimeWatered: date,
      };

      await addPlantToList(plantData, listId);

      setFormSubmitted(false);
      setShowAddPlantForm(false);
    }
  };

  const validateName = () => {
    if (formSubmitted && !name) {
      return <ErrorMessage errorText="Wpisz imię" />;
    } else if (formSubmitted && name.length <= 3) {
      return <ErrorMessage errorText="Imię powinno być dłuższe niż 3 znaki" />;
    }
  };

  return (
    <ScrollView>
      <View style={styles.addPlantContainer}>
        <View style={styles.inputContainer}>
          <Text>Imię</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>
        {validateName()}
        <WateringCycle
          wateringCycle={wateringCycle}
          setWateringCycle={setWateringCycle}
          formSubmitted={formSubmitted}
        />
        <DatePicker date={date} setDate={setDate} />
        <AddPlantPicture
          singleFile={singleFile}
          setSingleFile={setSingleFile}
          formSubmitted={formSubmitted}
        />
        <TouchableOpacity
          style={[styles.button, styles.addPlantButton]}
          onPress={handleAddingPlantToList}>
          <Text style={styles.addPlantButtonText}>Dodaj</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
  plantsData: state.plantsData,
});

AddPlant.propTypes = {
  plantsListsData: PropTypes.object,
  plantsData: PropTypes.object,
};

export default connect(mapStateToProps, {
  addPlantToList,
  showPlantsList,
  uploadPlantImage,
})(AddPlant);
