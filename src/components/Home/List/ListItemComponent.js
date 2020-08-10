import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Linking, Platform } from 'react-native';
import ElevatedView from 'react-native-elevated-view'
import { colors } from "../../../theme/colors";
import Fonts from "../../../../utils/Font";
import { Icon } from "@up-shared/components";
import { openGps } from "../../../Lib/Utils";
export default class ListItemComponent extends Component {

    render() {
        return (
            <TouchableOpacity style={{ backgroundColor: "#f8f7fa" }} onPress={() => this.props.itemClickHandler(this.props.item)}>
                <ElevatedView style={[styles.container, { marginBottom: this.props.dataSize == this.props.indexOfData + 1 ? 15 : 4 }]} elevation={2} borderRadius={4} backgroundColor="#ffffff">
                    <View style={styles.cardImage}>
                        <ImageBackground
                            imageStyle={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                            source={{ uri: this.props.item.EventBanner }} style={{
                                width: '100%', height: '100%'
                            }}>
                            <View style={styles.containerBadgeOuter}>
                                <ElevatedView style={styles.containerBadge} elevation={2} borderRadius={2} backgroundColor="#ffffff">
                                    <Text style={styles.badgeText}>{this.props.item.Currency} {this.props.item.EventPrice} / {this.props.item.PaymentTypeText}</Text>
                                </ElevatedView>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.timeText}>{this.props.item.EventFrom} - {this.props.item.EventTo}, {this.props.item.TimeDuration}</Text>
                        <Text style={styles.title}>{this.props.item.EventName}</Text>
                    </View>
                    <View style={styles.horizontalBorder} />
                    <View style={styles.cardBottomContainer}>
                        <TouchableOpacity style={styles.cardBottomTextContainer} onPress={() => openGps(this.props.item.VenueLatitude, this.props.item.VenueLongitude, this.props.item.VenueGoogleMapText)}>
                            <Icon name="location" size={16} color="#5b5b5b" />
                            <Text style={styles.cardBottomText}>{this.props.item.VenueGoogleMapText}</Text>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity style={styles.uploadButton} onPress={() => this.props.registrationClickHandler(this.props.item)}>
                                <Icon name="upload-register" size={18} color="#000000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ElevatedView>
            </TouchableOpacity>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        display: "flex",
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15
        // justifyContent: "center"
    },
    cardImage: {
        height: 150,
        // borderRadius: 6
    },
    containerBadgeOuter: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignContent: "flex-end"
    },
    containerBadge: {
        alignContent: "center",
        margin: 12,
        padding: 8
    },
    badgeText: {
        fontFamily: Fonts.HelveticaNeueMedium,
        color: "#000000",
        fontSize: 11
    },
    textContainer: {
        margin: 12
    },
    timeText: {
        color: "#3f3b54",
        fontSize: 12,
        textTransform: "uppercase",
        fontFamily: Fonts.HelveticaNeueRegular
    },
    title: {
        fontSize: 14,
        fontFamily: Fonts.HelveticaNeueMedium,
        color: "#000000",
        marginTop: 10
    },
    horizontalBorder: {
        backgroundColor: "#eeedf2",
        height: 1,
        width: Dimensions.get("screen").width - (30),
        marginTop: 10,
        marginBottom: 10
    },
    cardBottomContainer: {
        marginLeft: 12,
        marginRight: 12,
        marginTop: 8,
        marginBottom: 14,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    cardBottomTextContainer: {
        flexDirection: "row"
    },
    cardBottomText: {
        color: "#5b5b5b",
        fontSize: 12,
        fontFamily: Fonts.HelveticaNeueRegular,
        marginLeft: 8,
        width: Dimensions.get("screen").width - 100
    },
    uploadButton: {
        paddingLeft: 6,
        paddingRight: 6
    }
});
