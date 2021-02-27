import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {
  addPlantToList,
  uploadPlantImage,
} from '../../redux_actions/plantsActions';
import {showPlantsList} from '../../redux_actions/plantsListsActions';
import {DatePicker} from './datePicker';
import {WateringCycle} from './wateringCycle';
import {AddPlantPicture} from './addPlantPicture';
import NameInput from './nameInput';
import setCurrentDate from './setCurrentDate';
import {handleUploadingFile} from './helpers';
import styles from './styles/plantsList';
import {RootState} from '../../redux_reducers/';

export const AddPlant = ({
  listId,
  addPlantToList,
  uploadPlantImage,
  plantsData,
  showPlantsList,
  setShowAddPlantForm,
}: PropsFromRedux) => {
  const [name, setName] = useState('');
  const [wateringCycle, setWateringCycle] = useState('0');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const [picture, setPicture] = useState('');
  const [startDate, setStartDate] = useState(setCurrentDate(new Date()));

  useEffect(() => {
    const updatePlantsList = async () => {
      await showPlantsList(listId);
    };

    updatePlantsList();
    setStartDate(setCurrentDate(new Date()));
  }, [plantsData, listId, showPlantsList]);

  const handleAddingPlantToList = async () => {
    setFormSubmitted(true);

    if (name && wateringCycle && singleFile && startDate) {
      const pictureName = await handleUploadingFile(
        singleFile,
        uploadPlantImage,
        setPicture,
      );

      if (pictureName) {
        const plantData = {
          name: name,
          wateringCycle: parseInt(wateringCycle),
          pictureUrl: pictureName,
          wateringCycleBeginingData: startDate,
          lastTimeWatered: startDate,
        };
        await addPlantToList(plantData, listId);
        setFormSubmitted(false);
        setShowAddPlantForm(false);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.addPlantContainer}>
        <NameInput
          formSubmitted={formSubmitted}
          name={name}
          setName={setName}
        />
        <WateringCycle
          wateringCycle={wateringCycle}
          setWateringCycle={setWateringCycle}
          formSubmitted={formSubmitted}
        />
        <DatePicker setStartDate={setStartDate} />
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

const mapStateToProps = (
  state: RootState,
  ownProps: {
    listId: number;
    setShowAddPlantForm: React.Dispatch<React.SetStateAction<boolean>>;
  },
) => ({
  plantsData: state.plantsData,
  listId: ownProps.listId,
  setShowAddPlantForm: ownProps.setShowAddPlantForm,
});

const mapDispatch = {
  showPlantsList: showPlantsList,
  addPlantToList: addPlantToList,
  uploadPlantImage: uploadPlantImage,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddPlant);
