import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from "../theme/colors";
import Fonts from "../../utils/Font";
export default class ButtonSecondaryComponent extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.clickHandler();
            }}>
                <View style={styles.container}>
                    <Text style={styles.buttonText}>
                        {this.props.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        justifyContent: "center",
        height: 48,
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.secondaryColor,
    },
    buttonText: {
        color: colors.secondaryColor,
        fontSize: 15,
        alignSelf: "center",
        fontFamily: Fonts.HelveticaNeueRegular
    }
});