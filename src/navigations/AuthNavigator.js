import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import AuthenticationScreen from "../screens/AuthenticationScreen";
import OtpScreen from "../screens/OtpScreen";

const AuthNavigator = createStackNavigator({
    AuthenticationScreen,
    OtpScreen

},{
    headerMode:"none"
});
export default AuthNavigator;