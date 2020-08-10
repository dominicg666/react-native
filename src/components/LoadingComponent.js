import React, { Component } from 'react';
import {  View, ActivityIndicator } from 'react-native';
export const LoadingComponent = () => (
    <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999
    }}>
        <ActivityIndicator animating={true} size={'large'} color={'#11362A'} />
    </View>
);