import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';

import PropTypes from 'prop-types';

import {
  addPlantToList,
  uploadPlantImage,
} from '../../redux_actions/plantsActions';
import {showPlantsList} from '../../redux_actions/plantsListsActions';
import ErrorMessage from '../ErrorMessage/errorMessage';
import setCurrentDate from './setCurrentDate';
import styles from './styles/plantsList';

export const AddPlant = ({
  listId,
  addPlantToList,
  uploadPlantImage,
  plantsData,
  showPlantsList,
}) => {
  const [name, setName] = useState('');
  const [wateringCycle, setWateringCycle] = useState('0');
  const [picture, setPicture] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    const updatePlantsList = async () => {
      await showPlantsList(listId);
    };

    updatePlantsList();
  }, [plantsData, listId, showPlantsList]);

  const handleUploadingFile = async () => {
    if (singleFile != null) {
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      console.log(fileToUpload);
      const imageName = await uploadPlantImage(data);

      setPicture(imageName);
      if (imageName) {
        alert('Upload Successful');
      }
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const handleAddingPlantToList = async () => {
    setFormSubmitted(true);

    if (name && wateringCycle && singleFile && date) {
      const plantData = {
        name: name,
        wateringCycle: wateringCycle,
        pictureUrl: singleFile.uri,
        wateringCycleBeginingData: date,
        lastTimeWatered: date,
      };

      await handleUploadingFile();
      await addPlantToList(plantData, listId);

      setFormSubmitted(false);
    }
  };

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(new Date(currentDate.nativeEvent.timestamp));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const validateName = () => {
    if (formSubmitted && !name) {
      return <ErrorMessage errorText="Wpisz imię" />;
    } else if (formSubmitted && name.length <= 3) {
      return <ErrorMessage errorText="Imię powinno być dłuższe niż 3 znaki" />;
    }
  };

  const validateWateringCycle = () => {
    if (formSubmitted && wateringCycle === 0) {
      return <ErrorMessage errorText="Wpisz częstotliwość podlewania" />;
    }
  };

  const validatePicture = () => {
    if (formSubmitted && !singleFile) {
      return <ErrorMessage errorText="Dodaj zdjęcie" />;
    }
  };

  return (
    <ScrollView>
      {/* <form encType='multipart/form-data'> */}
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
        <View style={styles.inputContainer}>
          <Text>Podlewanie co:</Text>
          <TextInput
            style={styles.inputContainer}
            keyboardType="number-pad"
            value={wateringCycle}
            onChange={(text) => {
              setWateringCycle(text);
            }}
          />
          <Text>{wateringCycle === '1' ? `dzień` : 'dni'}</Text>
        </View>
        {validateWateringCycle()}
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Data startu:</Text>
          <TouchableOpacity onPress={showDatepicker}>
            <Text>{setCurrentDate(date)}</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text>{picture}</Text>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              // await handleUploadingFile();
              launchCamera(
                {
                  madiaType: 'photo',
                },
                (res) => setPicture(res.uri),
              );
            }}>
            <Text style={styles.text}>Zrób Zdjęcie</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.button} onPress={selectFile}>
            <Text style={styles.text}>Dodaj zdjęcie z galerii</Text>
          </TouchableOpacity>
        </View>
        {validatePicture()}
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddingPlantToList}>
          <Text>Dodaj</Text>
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
