import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from "../theme/colors";
import Fonts from "../../utils/Font";
export default class ButtonComponent extends Component {
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
        backgroundColor: colors.secondaryColor,
        justifyContent: "center",
        height: 48,
        borderRadius: 2
    },
    buttonText: {
        color: colors.backgroundColor,
        fontSize: 15,
        alignSelf: "center",        
        fontFamily:Fonts.HelveticaNeueRegular
    }
});