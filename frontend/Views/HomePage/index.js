import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import RegisterComponent from '../../Components/Register';
import LoginComponent from '../../Components/Login';

const HomePage = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        Cześć! Witamy w programie WaterMe! Dzięki niemu już nigdy nie zapomnisz
        o podlewaniu swoich roślin. Twórz listy roślin z domu, ogrodu, pracy i
        innych miejsc. Ustawiaj harmonogramy podlewania a rośliny same dadzą Ci
        znać, że potrzebują wody. Jeśli zapomnisz o podlewaniu będziesz
        otrzymywał kolejne przypomnienia, które uratują Twoje rośliny.
      </Text>
      <RegisterComponent />
      <LoginComponent />
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
    backgroundColor: '#FFFFFF',
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
