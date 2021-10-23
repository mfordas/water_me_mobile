import AsyncStorage from '@react-native-async-storage/async-storage';

import {getData, storeData, removeValue} from '../asyncStorage';

describe('Async storage module', () => {
  it('should store data in async storage', async () => {
    const testKey = 'TestKey';
    const testValue = 'TestValue';
    await storeData(testKey, testValue);
    const readValue = await AsyncStorage.getItem(testKey);
    expect(readValue).toBe(testValue);
  });
  it('should read data stored in async storage', async () => {
    const testKey = 'TestKey';
    const testValue = 'TestValue';

    await AsyncStorage.setItem(testKey, testValue);

    const readValue = await getData(testKey);
    expect(readValue).toBe(testValue);
  });
  it('should Delete data from async storage', async () => {
    const testKey = 'TestKeyToDelete';
    const testValue = 'TestValue';

    await AsyncStorage.setItem(testKey, testValue);

    await removeValue(testKey);

    const readValue = await AsyncStorage.getItem(testKey);
    expect(readValue).toBe(null);
  });
});
