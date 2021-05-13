import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import {DatePicker} from '../datePicker';

jest.mock('react-native-document-picker', () => () => ({}));
jest.mock('react-native-image-picker', () => () => ({}));
jest.mock('../helpers', () => {
    const helpers = jest.requireActual('../helpers');

    return {
        ...helpers,
        handleUploadingFile: jest.fn(),
    };
});

const mockSetStartDate = jest.fn(() => console.log('Set start date'));

const setUp = () => {
    const wrapper = shallow(<DatePicker setStartDate={mockSetStartDate} />);
    return wrapper;
};

describe('Date picker component', () => {
    it('Should render without error', () => {
        const wrapper: ShallowWrapper = setUp();
        const component = findByDataTestAtrr(wrapper, 'DatePicker');
        expect(component.length).toBe(1);
    });
});

describe('Should handle input change', () => {
    const component = setUp();

    it('Should emit callback on date change', async () => {
        const datePickerShowFunction = component
            .find(TouchableOpacity)
            .at(0)
            .prop('onPress');

        if (datePickerShowFunction) {
            datePickerShowFunction({} as any);
        }

        expect(component.find(DateTimePicker).length).toBe(1);
    });
});
