import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';

// import './scss/footer.scss';

const Footer = () => {
  return (
    <View>
      <Text>
        Copyright ©{' '}
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.fordas.pl')}>
          <Text>Mateusz Fordas</Text>
        </TouchableOpacity>{' '}
        {new Date().getFullYear()}
      </Text>
    </View>
  );
};

export default Footer;
