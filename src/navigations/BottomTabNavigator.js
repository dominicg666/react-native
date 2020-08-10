import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from "@up-shared/components";
import Fonts from "../../utils/Font";
import { colors } from "../theme/colors";

import HomeNavigator from "./HomeNavigator"
import EventsScreen from "../screens/EventsScreen";
import FeedScreen from "../screens/FeedScreen";

export const EventsNavigator = createStackNavigator({
    EventsScreen
});


export const BottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: "Events",
            tabBarIcon: ({ tintColor }) => <Icon name="events" size={20} color={tintColor} />
        }
    },
    Event: {
        screen: EventsNavigator,
        navigationOptions: {
            title: "My Events",
            tabBarIcon: ({ tintColor }) => <Icon name="myevents" size={20} color={tintColor} />
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: colors.secondaryColor,
        // inactiveTintColor: "#39354F",
        labelStyle: {
            fontFamily: Fonts.HelveticaNeueMedium,
            fontSize: 10,
            // color: "#39354F"
        }
    }
});

