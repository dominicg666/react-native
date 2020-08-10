import React, { Component } from 'react';
import { View, ActivityIndicator, Platform, Linking } from 'react-native';

export const openGps = (lat, lng, EventVenueGoogleMapText) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = EventVenueGoogleMapText;
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
}