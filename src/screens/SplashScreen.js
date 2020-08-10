import React, { Component } from 'react';
import { connect } from "react-redux";
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from "@up-shared/components";
import { colors } from "../theme/colors";
import Fonts from "../../utils/Font";
import { getUser, setUser } from '../Lib/asyncStorageModule';
import { requestCountries, requestStates } from "../store/Country/actions";

class SplashScreen extends Component {
    constructor(props) {
        super(props)
        setTimeout(() => {
            this.chechAuthenticated();
        }, 2000);
    }
    async chechAuthenticated() {
        let data = await getUser();        
        await this.props.requestCountries("data.Token");
        await this.props.requestStates("data.Token");
        if (data == null) {
            this.props.navigation.navigate("AuthNavigator")
        } else {
            this.props.navigation.navigate("App")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Icon name="logo_qatar" size={60} color={colors.secondaryColor} />
                </View>
                <Text style={styles.logoText}>Qatar Foundation</Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestCountries: (token) => dispatch(requestCountries(token)),
        requestStates: (token) => dispatch(requestStates(token))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    logoContainer: {
        alignContent: "center",
        alignSelf: "center"
    },
    logoText: {
        color: colors.primaryColor,
        fontSize: 18,
        fontFamily: Fonts.GeorgiaRegular,
        alignSelf: "center",
        marginTop: 22

    }
});
