import {StyleSheet} from 'react-native';

const google = StyleSheet.create({
  registerCard: {
    flexDirection: 'column',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    margin: 1,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    flexDirection: 'row',
    width: 220,
  },

  googleButtonText: {
    marginRight: 8,
    fontSize: 14,
  },

  googleButtonLogo: {
    marginTop: 11,
    marginRight: 24,
    marginBottom: 11,
    marginLeft: 8,
    width: 18,
    height: 18,
  },
});

export default google;
