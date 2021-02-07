import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  plantsContainer: {
    width: '100%',
  },

  plantsContainerHeader: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },

  plantContainer: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  addPlantContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '90%',
    // borderColor: 'black',
    // borderWidth: 1,
  },

  inputContainerPicture: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderBottomWidth: 2,
    width: 150,
  },

  text: {
    marginHorizontal: 15,
  },

  label: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginHorizontal: 10,
    marginVertical: 10,
    width: '50%',
    alignSelf: 'center',
  },

  addPlantButton: {
    backgroundColor: '#f5d453',
  },

  addPlantButtonText: {
    textAlign: 'center',
  },

  deletePlantButton: {
    backgroundColor: '#f24949',
  },

  deletePlantButtonText: {
    color: 'white',
  },

  wateringStatusContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  addPictureButton: {
    width: '100%',
  },

  wateringStatus: {
    padding: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
  },

  statusOk: {
    backgroundColor: '#4CAF50',
    textAlign: 'center',
  },

  statusNok: {
    backgroundColor: '#f24949',
  },

  buttonWatering: {
    backgroundColor: 'skyblue',
  },

  wateringContainer: {},

  listName: {
    fontSize: 18,
  },

  inputContainerPictureConfirmText: {
    color: 'green',
    fontSize: 16,
  },

  plantPicture: {
    width: '55%',
    height: 200,
  },

  plantText: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default styles;
