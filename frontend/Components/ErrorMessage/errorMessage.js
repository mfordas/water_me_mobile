import React from 'react';
import {StyleSheet, Text} from 'react-native';

const ErrorMessage = ({errorText}) => {
  return errorText ? (
    <Text style={styles.errorMessageContainer}>{errorText}</Text>
  ) : null;
};

const styles = StyleSheet.create({
  errorMessageContainer: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ErrorMessage;
