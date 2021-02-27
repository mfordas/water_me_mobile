import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

import setCurrentDate from './setCurrentDate';
import styles from './styles/plantsList';

type Input = {
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
};

export const DatePicker = ({setStartDate}: Input) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(new Date(selectedDate.nativeEvent.timestamp));
    setStartDate(setCurrentDate(new Date(currentDate.nativeEvent.timestamp)));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Data startu:</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <Text>{setCurrentDate(date)}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </>
  );
};

DatePicker.propTypes = {
  setStartDate: PropTypes.func,
};
