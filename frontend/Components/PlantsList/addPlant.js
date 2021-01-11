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
import {launchCamera} from 'react-native-image-picker';

import PropTypes from 'prop-types';

import {
  addPlantToList,
  uploadPlantImage,
} from '../../redux_actions/plantsActions';
import {showPlantsList} from '../../redux_actions/plantsListsActions';
import ErrorMessage from '../ErrorMessage/errorMessage';
import setCurrentDate from './setCurrentDate';
import plantsList from './styles/plantsList';

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

  const [startDate, setStartDate] = useState(setCurrentDate());

  useEffect(() => {
    const updatePlantsList = async () => {
      await showPlantsList(localStorage.getItem('id'), listId);
    };

    updatePlantsList();
  }, [plantsData, listId, showPlantsList]);

  const handleUploadingFile = async () => {
    const photoData = new FormData();

    photoData.append('image', event.target.files[0]);

    const imageName = await uploadPlantImage(photoData);

    setPicture(imageName);
  };

  const handleAddingPlantToList = async (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    if (name && wateringCycle && picture && startDate) {
      const plantData = {
        name: name,
        wateringCycle: wateringCycle,
        pictureUrl: picture,
        wateringCycleBeginingData: startDate,
        lastTimeWatered: startDate,
      };

      await addPlantToList(plantData, listId);

      setFormSubmitted(false);
    }
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
    if (formSubmitted && !picture) {
      return <ErrorMessage errorText="Dodaj zdjęcie" />;
    }
  };

  return (
    <ScrollView>
      {/* <form encType='multipart/form-data'> */}
      <View style={plantsList.addPlantContainer}>
        <View>
          <Text>Imię</Text>
          <TextInput
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>
        {validateName()}
        <View>
          <Text>Podlewanie co:</Text>
          <TextInput
            keyboardType="number-pad"
            value={wateringCycle}
            onChange={(text) => {
              setWateringCycle(text);
            }}
          />
          <Text>{wateringCycle === '1' ? `dzień` : 'dni'}</Text>
        </View>
        {validateWateringCycle()}
        {/* <label>
          Data startu:
          <input
            type='date'
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </label> */}
        <View>
          <TouchableOpacity
            onPress={async () => {
              // await handleUploadingFile();
              launchCamera(
                {
                  madiaType: 'photo',
                },
                // (res) => setPicture(res.uri),
                (res) => console.log(res.uri),
              );
            }}>
            <Text>Zdjęcie</Text>
          </TouchableOpacity>
        </View>
        {validatePicture()}
        <TouchableOpacity onPress={handleAddingPlantToList}>
          <Text>Dodaj</Text>
        </TouchableOpacity>
        {/* </form> */}
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
