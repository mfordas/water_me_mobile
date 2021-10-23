import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ErrorMessage from '../ErrorMessage/errorMessage';
import GoogleAuth from '../Login/googleAuth';
import GoogleRegister from '../Register/googleRegister';

const HomePage = () => {
  const [error, setError] = useState('');
  return (
    <View style={styles.wrapper} data-test="homePage">
      <Text style={styles.text}>
        Cześć! Witamy w programie WaterMe! Dzięki niemu już nigdy nie zapomnisz
        o podlewaniu swoich roślin. Twórz listy roślin z domu, ogrodu, pracy i
        innych miejsc. Ustawiaj harmonogramy podlewania a rośliny same dadzą Ci
        znać, że potrzebują wody. Jeśli zapomnisz o podlewaniu będziesz
        otrzymywał kolejne przypomnienia, które uratują Twoje rośliny.
      </Text>
      <GoogleRegister setError={setError} />
      <GoogleAuth setError={setError} />
      {error ? <ErrorMessage errorText={error} /> : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 0.5,
    fontSize: 10,
    padding: 3,
    color: 'black',
    alignItems: 'center',
    flexGrow: 2,
  },

  text: {
    textAlign: 'justify',
    fontSize: 16,
    margin: 15,
    padding: 15,
  },
});

export default HomePage;
