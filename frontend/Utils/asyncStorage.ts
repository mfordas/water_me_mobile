import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, value.toString());
    } catch (e) {
        throw new Error(`Could not store item ${key}: ${e}`);
    }
};

export const getData = async (key: string): Promise<string | void> => {
    try {
        const value = await AsyncStorage.getItem(`${key}`);
        if (value) {
            return value;
        }
    } catch (e) {
        throw new Error(`Could not read item ${key}: ${e}`);
    }
};

export const removeValue = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        throw new Error(`Could not delete item ${key}: ${e}`);
    }

    console.log('Done.');
};
