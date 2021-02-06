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
    flexDirection: 'row',
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
  },

  addPlantButton: {
    backgroundColor: '#f5d453',
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginHorizontal: 10,
    marginVertical: 10,
    width: '50%',
    alignSelf: 'center',
  },

  addPlantButtonText: {
    textAlign: 'center',
  },

  deletePlantButton: {
    backgroundColor: '#f24949',
    color: 'white',
  },

  wateringStatusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusOk: {
    backgroundColor: '#4CAF50',
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
});

export default styles;
