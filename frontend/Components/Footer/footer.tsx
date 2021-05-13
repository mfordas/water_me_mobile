import React from 'react';
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';

const Footer = () => {
    return (
        <View style={styles.wrapper} data-test='footerComponent'>
            <Text>Copyright © </Text>
            <TouchableOpacity
                onPress={() => Linking.openURL('https://www.fordas.pl')}
                data-test='linkInFooter'>
                <Text>Mateusz Fordas</Text>
            </TouchableOpacity>
            <Text> {new Date().getFullYear()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        margin: 0.5,
        fontSize: 10,
        padding: 6,
        width: '100%',
        justifyContent: 'center',
        color: 'black',
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
});

export default Footer;
