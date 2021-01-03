import React from 'react';
import {View, Image} from 'react-native';
// import './scss/logo.scss';

import mainStyling from '../../scss/main_styling';

import {ReactComponent as LogoPic} from '../../img/logo.svg';
// import logoSrc from '../../img/logo.svg';

// <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

const Logo = () => {
  return (
    // <div className="logo-container" data-test="logoComponent">
    //     <Link to="/"><LogoPic data-test='logoSVG'/></Link>
    // </div>
    <View style={[{flex: 1, flexGrow: 0.5}, mainStyling.logoContainer]}>
      <Image style={mainStyling.logo} source={LogoPic} />
    </View>
  );
};

export default Logo;
