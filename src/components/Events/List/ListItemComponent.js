import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Platform, Linking } from 'react-native';
import ElevatedView from 'react-native-elevated-view'
import { colors } from "../../../theme/colors";
import Fonts from "../../../../utils/Font";
import { Icon } from "@up-shared/components";
import { openGps } from "../../../Lib/Utils"
export default class ListItemComponent extends Component {
    render() {
        var color = "";
        if (this.props.item.EventStatus == "RUNNING") {
            color = "#01862A"
        } else if (this.props.item.EventStatus == "OVER") {
            color = "#f0ad4e"
        } else if (this.props.item.EventStatus == "UPCOMING") {
            color = "#999999"
        }

        return (
            <TouchableOpacity style={{ backgroundColor: "#f8f7fa" }} onPress={() => this.props.itemClickHandler(this.props.item)}>
                <ElevatedView style={[styles.container, { marginBottom: this.props.dataSize == this.props.indexOfData + 1 ? 15 : 4 }]} elevation={2} borderRadius={4} backgroundColor="#ffffff">
                    <View style={styles.textContainer}>
                        <View style={styles.textContainerTop}>
                            <Text style={styles.timeText}>{this.props.item.EventFrom} {this.props.item.EventTo} - {this.props.item.EventTimeDuration}</Text>
                            <Text style={[styles.statusBadge, { color: color }]}>{this.props.item.EventStatus}</Text>
                        </View>
                        <Text style={styles.title}>{this.props.item.EventName}</Text>
                    </View>
                    <View style={styles.horizontalBorder} />
                    <View style={styles.cardBottomContainer}>
                        <TouchableOpacity style={styles.cardBottomTextContainer} onPress={() => openGps(this.props.item.EventVenueLatitude, this.props.item.EventVenueLongitude, this.props.item.EventVenueGoogleMapText)}>
                            <Icon name="location" size={16} color="#5b5b5b" />
                            <Text style={styles.cardBottomText}>{this.props.item.EventVenueGoogleMapText}</Text>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity style={styles.uploadButton}>
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
        marginTop: 15,
        paddingTop: 4
        // justifyContent: "center"
    },
    textContainerTop: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    statusBadge: {
        fontFamily: Fonts.HelveticaNeueMedium,

        fontSize: 11,
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
    },
    uploadButton: {
        paddingLeft: 6,
        paddingRight: 6
    }
});
