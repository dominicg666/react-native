import { createStackNavigator } from 'react-navigation-stack';
import ItemDetailsScreen from "../screens/ItemDetailsScreen";
import MyEventDetails from "../screens/MyEventDetails";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { RegistrationNavigator } from "./RegistrationNavigator";

export const AppStackConatiner = createStackNavigator({
    BottomTabNavigator,
    ItemDetailsScreen,
    MyEventDetails,
    RegistrationNavigator,


}, {
    headerMode: "none"
});