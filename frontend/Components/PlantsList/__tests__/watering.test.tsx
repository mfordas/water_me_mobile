import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Watering} from '../watering';
import {shallow, ShallowWrapper} from 'enzyme';
import {findByDataTestAtrr} from '../../../Utils/findByDataTestAtrr';
import {useCountWatering} from '../hooks';

jest.mock('../../../Utils/apiUrl', () => jest.fn());

jest.mock('../hooks', () => {
    const helpers = jest.requireActual('../hooks');

    return {
        ...helpers,
        useCountWatering: jest.fn(),
    };
});

const mockUpdateLastWateringDate = jest.fn(() =>
    Promise.resolve(console.log('Last watering date updated')),
);
const mockShowPlantsList = jest.fn(() =>
    Promise.resolve(console.log('Plant list loaded')),
);

const setUp = (lastWateringDate: Date, wateringCycle: number) => {
    const wrapper = shallow(
        <Watering
            lastWateringDate={lastWateringDate}
            wateringCycle={wateringCycle}
            plantId={1}
            listId={1}
            updateLastWateringDate={mockUpdateLastWateringDate}
            showPlantsList={mockShowPlantsList}
        />,
    );
    return wrapper;
};

describe('Watering component', () => {
    it('Should render component with ok status when plant is watered', () => {
        (useCountWatering as jest.Mock).mockImplementation(() => {
            return {nextWateringIn: 3, currentDate: '2021-10-10'};
        });
        const wrapper: ShallowWrapper = setUp(new Date('2021-10-09'), 3);
        const component = findByDataTestAtrr(wrapper, 'WateringComponent');
        const status = findByDataTestAtrr(wrapper, 'statusOk');
        const watering = findByDataTestAtrr(wrapper, 'nextWateringContainer');

        expect(component.length).toBe(1);
        expect(status.debug()).toContain('U mnie w porządku!');
        expect(watering.debug()).toContain('dni');
        expect(component.find(TouchableOpacity).length).toBe(0);
    });

    it('Should render /dzień/ string if next watering is in 1 day', () => {
        (useCountWatering as jest.Mock).mockImplementation(() => {
            return {nextWateringIn: 1, currentDate: '2021-10-10'};
        });
        const wrapper: ShallowWrapper = setUp(new Date('2021-10-09'), 3);
        const component = findByDataTestAtrr(wrapper, 'WateringComponent');
        const status = findByDataTestAtrr(wrapper, 'statusOk');
        const watering = findByDataTestAtrr(wrapper, 'nextWateringContainer');

        expect(component.length).toBe(1);
        expect(status.debug()).toContain('U mnie w porządku!');
        expect(watering.debug()).toContain('dzień');
        expect(component.find(TouchableOpacity).length).toBe(0);
    });

    it('Should render component with nok status when plant is not watered', () => {
        (useCountWatering as jest.Mock).mockImplementation(() => {
            return {nextWateringIn: -1, currentDate: '2021-10-10'};
        });
        const wrapper: ShallowWrapper = setUp(new Date('2021-10-09'), 3);
        const component = findByDataTestAtrr(wrapper, 'WateringComponent');
        const status = findByDataTestAtrr(wrapper, 'statusNok');
        expect(component.length).toBe(1);
        expect(status.debug()).toContain('Potrzebuję wody!');
        expect(component.find(TouchableOpacity).length).toBe(1);
    });
});

describe('Should handle update watering action', () => {
    (useCountWatering as jest.Mock).mockImplementation(() => {
        return {nextWateringIn: -1, currentDate: '2021-10-10'};
    });
    const component = setUp(new Date('2021-10-09'), 3);

    it('Should emit callback on press event', async () => {
        const updateWateringButtonFunction = component
            .find(TouchableOpacity)
            .at(0)
            .prop('onPress');

        if (updateWateringButtonFunction) {
            updateWateringButtonFunction({} as any);
        }

        await component.update();

        expect(mockUpdateLastWateringDate).toHaveBeenCalledTimes(1);
        expect(mockShowPlantsList).toHaveBeenCalledTimes(1);
    });
});
