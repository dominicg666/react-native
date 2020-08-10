import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Linking, Platform } from 'react-native';
import ElevatedView from 'react-native-elevated-view'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { colors } from "../theme/colors";
import Fonts from "../../utils/Font";
import { Icon } from "@up-shared/components";
import { openGps } from "../Lib/Utils";
export default class MapViewComponent extends Component {

    

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.buttonDirection} onPress={()=>openGps(this.props.Lat, this.props.Lng, this.props.Venue)}>
                    <ElevatedView  style={styles.buttonDirectionContainer} elevation={3} borderRadius={2}>
                        <Text style={styles.buttonDirectionText}>Get Direction</Text>
                    </ElevatedView>
                </TouchableOpacity>
                <MapView
                    style={styles.map}
                    scrollEnabled={false}
                    rotateEnabled={false}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: this.props.Lat,
                        longitude: this.props.Lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={{
                        latitude: this.props.Lat,
                        longitude: this.props.Lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.map}
                >
                    <Marker
                        coordinate={{
                            latitude: this.props.Lat,
                            longitude: this.props.Lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <View style={styles.circle}>
                            <View style={styles.innerCircle}></View>
                        </View>
                    </Marker>
                </MapView>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        display: "flex"
        // justifyContent: "center"
    },
    map: {
        width: Dimensions.get("screen").width,
        height: 200,
    },
    circle: {
        width: 22,
        height: 22,
        backgroundColor: "#11362A",
        borderRadius: 22,
        padding: 6
    },
    innerCircle: {
        width: 10,
        height: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 11
    },
    buttonDirection: {
        position:"absolute",
        right:10,
        top:10,
        zIndex:999,
        backgroundColor:"#FFFFFF",
    },
    buttonDirectionContainer:{
        padding:8
    },
    buttonDirectionText:{
        fontFamily:Fonts.HelveticaNeueMedium,
        color:"#000000",
        fontSize:13
    }
});
