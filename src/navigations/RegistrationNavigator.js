import { createStackNavigator } from 'react-navigation-stack';
import RegisterScreen from "../screens/Register/RegisterScreen";
import AddressScreen from "../screens/Register/AddressScreen";
export const RegistrationNavigator = createStackNavigator({
    RegisterScreen,
    AddressScreen

});