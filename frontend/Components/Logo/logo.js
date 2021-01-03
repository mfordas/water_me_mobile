import React from 'react';
import {View} from 'react-native';

import mainStyling from '../../scss/main_styling';

import LogoPic from '../../img/logo.svg';

// <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

const Logo = () => {
  return (
    <View style={[{flex: 1, flexGrow: 0.5}, mainStyling.logoContainer]}>
      <LogoPic width={350} />
    </View>
  );
};

export default Logo;
