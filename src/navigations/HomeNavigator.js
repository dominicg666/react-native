import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";

const HomeNavigator = createStackNavigator({
    HomeScreen,
    SearchScreen
}, {
    headerMode: "none"
});
export default HomeNavigator;