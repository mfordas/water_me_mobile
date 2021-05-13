import React from 'react';
import {TextInput, Text} from 'react-native';
import {shallow, ShallowWrapper} from 'enzyme';
import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import {WateringCycle} from '../wateringCycle';
import ErrorMessage from '../../ErrorMessage/errorMessage';

jest.mock('../../../Utils/apiUrl', () => jest.fn());

const mockSetWateringCycle = jest.fn(() => console.log('Changing watering...'));

const setUp = (formSubmitted: boolean, wateringCycle: string) => {
    const wrapper = shallow(
        <WateringCycle
            formSubmitted={formSubmitted}
            wateringCycle={wateringCycle}
            setWateringCycle={mockSetWateringCycle}
        />,
    );
    return wrapper;
};

describe('DateInput component', () => {
    it('Should render without error', () => {
        const wrapper: ShallowWrapper = setUp(false, '0');
        const component = findByDataTestAtrr(wrapper, 'WateringInput');
        expect(component.length).toBe(1);
    });
});

describe('Should handle input change', () => {
    it('Should show /dzień/ string if watering is equal to 1', () => {
        const component = setUp(false, '1');

        const inputElement = component.find(TextInput).at(0);

        expect(inputElement.prop('value')).toBe('1');
        expect(component.find(Text).debug()).toContain('dzień');
    });

    it('Should show /dni/ string if watering is greater than 1', () => {
        const component = setUp(false, '3');

        const inputElement = component.find(TextInput).at(0);

        expect(inputElement.prop('value')).toBe('3');
        expect(component.find(Text).debug()).toContain('dni');
    });

    it('Should show error if form is submitted and watering cycle equals 0', () => {
        const component = setUp(true, '0');

        const errorMessage = component.find(ErrorMessage);

        expect(errorMessage.prop('errorText')).toBe(
            'Wpisz częstotliwość podlewania',
        );
    });

    it('Should emit callback on change event', () => {
        const component = setUp(true, '0');

        const wateringTextInputFunction = component
            .find(TextInput)
            .at(0)
            .prop('onChangeText');

        if (wateringTextInputFunction) {
            wateringTextInputFunction('2');
        }

        component.update();

        expect(mockSetWateringCycle.mock.calls.length).toBe(1);
    });
});
