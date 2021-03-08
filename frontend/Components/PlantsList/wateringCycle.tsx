import React from 'react';
import {View, Text, TextInput} from 'react-native';

import ErrorMessage from '../ErrorMessage/errorMessage';
import styles from './styles/plantsList';

type Input = {
  formSubmitted: boolean;
  wateringCycle: string;
  setWateringCycle: React.Dispatch<React.SetStateAction<string>>;
};

export const WateringCycle = ({
  wateringCycle,
  setWateringCycle,
  formSubmitted,
}: Input) => {
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

export default WateringCycle;
