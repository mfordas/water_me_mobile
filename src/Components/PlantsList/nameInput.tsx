import React from 'react';
import { View, Text, TextInput } from 'react-native';

import ErrorMessage from '../ErrorMessage/errorMessage';
import styles from './styles/plantsList';

type Input = {
  formSubmitted: boolean;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

export const NameInput = ({ formSubmitted, name, setName }: Input) => {
  const validateName = () => {
    if (formSubmitted && !name) {
      return <ErrorMessage errorText="Wpisz imię" />;
    } else if (formSubmitted && name.length <= 3) {
      return <ErrorMessage errorText="Imię powinno być dłuższe niż 3 znaki" />;
    }
  };

  return (
    <>
      <View style={styles.inputContainer} data-test="nameInput">
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
    </>
  );
};

export default NameInput;
