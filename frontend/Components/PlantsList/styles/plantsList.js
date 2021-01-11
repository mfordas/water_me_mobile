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
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: 'white',
    borderRadius: 10,
  },

  addPlantButton: {
    backgroundColor: '#f5d453',
  },

  deleteButton: {
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

  button: {
    backgroundColor: 'skyblue',
  },
});

export default styles;
