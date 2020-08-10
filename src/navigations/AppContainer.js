import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthNavigator from "./AuthNavigator";
import { AppStackConatiner } from "./AppStackConatiner";
import SplashScreen from "../screens/SplashScreen";

const AppContainer = createSwitchNavigator({
    SplashScreen:SplashScreen,
    AuthNavigator: AuthNavigator,
    App: AppStackConatiner
}, {
    initialRouteName: "SplashScreen"
});


export default createAppContainer(AppContainer);