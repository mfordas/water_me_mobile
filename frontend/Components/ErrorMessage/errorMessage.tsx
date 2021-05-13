import React from 'react';
import {StyleSheet, Text} from 'react-native';

type PropsType = {
  errorText: string;
};

const ErrorMessage = ({errorText}: PropsType): JSX.Element | null => {
    return errorText ? (
        <Text
            style={styles.errorMessageContainer}
            data-test='errorMessageComponent'>
            {errorText}
        </Text>
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
