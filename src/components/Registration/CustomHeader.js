import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { colors } from "../../theme/colors";
import Fonts from "../../../utils/Font";
import ElevatedView from 'react-native-elevated-view';
import { Icon } from "@up-shared/components";

export default class CustomHeader extends Component {
    render() {
        const { scene } = this.props;
        const { options } = scene.descriptor;
        return (
            <ElevatedView style={styles.container} elevation={3}>
                <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.pop()}>
                    <Icon name="back" size={16} color="#000000" />
                </TouchableOpacity>
                <View style={styles.headingContainer}><Text style={styles.headingText}>{options.title}</Text></View>
            </ElevatedView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        padding: 12,
        marginBottom: 3,
    },
    headingContainer: {
        justifyContent: "center",
        flexDirection: "row",
        width:Dimensions.get("screen").width-(80)
    },
    headingText: {
        fontFamily: Fonts.GeorgiaRegular,
        fontSize: 16,
        color: "#000000",
        alignSelf: "center"
    },
    backButton: {
        padding: 8,
        alignSelf: "flex-start",
        alignItems: "flex-start"
    }
});