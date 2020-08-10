import AsyncStorage from '@react-native-community/async-storage';

const storageConstants = {
    USER_DATA: 'USER_DATA'
};

export const setUser = async (data) => {
    var oData = null;
    console.log(oData);

    try {
        oData = await AsyncStorage.setItem(storageConstants.USER_DATA, JSON.stringify(data));
    } catch (e) {
        // saving error
    }
    return oData;
}

export const getUser = async () => {
    var data = null;
    try {
        value = await AsyncStorage.getItem(storageConstants.USER_DATA);
        if (value !== null) {
            data = JSON.parse(value)
        }
    } catch (e) {
        // saving error
    }
    return data;
}

export const clearUser = async () => {
    try {
        await AsyncStorage.removeItem(storageConstants.USER_DATA)
        return true;
    }
    catch (exception) {
        return false;
    }
}
