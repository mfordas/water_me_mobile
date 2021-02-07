import React from 'react';
import {View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';

import ErrorMessage from '../ErrorMessage/errorMessage';
import styles from './styles/plantsList';

export const WateringCycle = ({
  wateringCycle,
  setWateringCycle,
  formSubmitted,
}) => {
  const validateWateringCycle = () => {
    if (formSubmitted && wateringCycle === '0') {
      return <ErrorMessage errorText="Wpisz częstotliwość podlewania" />;
    }
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <Text>Podlewanie co:</Text>
        <TextInput
          keyboardType="number-pad"
          value={wateringCycle}
          onChangeText={(text) => {
            setWateringCycle(text);
          }}
        />
        <Text>{wateringCycle === '1' ? `dzień` : 'dni'}</Text>
      </View>
      {validateWateringCycle()}
    </>
  );
};

WateringCycle.propTypes = {
  wateringCycle: PropTypes.string,
  setWateringCycle: PropTypes.func,
  formSubmitted: PropTypes.bool,
};
