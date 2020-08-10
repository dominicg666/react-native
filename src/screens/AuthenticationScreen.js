import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, TextInput } from 'react-native';
import { LoadingComponent } from "../components/LoadingComponent";
import { connect } from "react-redux";
import { colors } from "../theme/colors";
import Fonts from "../../utils/Font";
import ButtonComponent from "../components/ButtonComponent";
import TelephoneInput from "../Lib/MobilePhoneInput/telephoneInput";
import { requestLogin } from "../store/Authentication/actions";

const Joi = require("joi-react-native");
const schema = Joi.object().keys({
    MobileNumber: Joi.string().trim()
        .required().min(12).max(15)
        .label("Mobile Number")
});
class AuthenticationScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            MobileNumber: "",
            formError: null,
            showPassword: false
        };
    }
    inputHandler = async (name, value) => {
        var data = value.replace("+", "")
        data = data.replace(" ", "")
        data = data.replace("-", "")
        await this.setState({
            [name]: data
        });
        await this.handleError();
    };
    handleError = async () => {
        await this.setState({
            formError: Joi.validate(
                {
                    MobileNumber: this.state.MobileNumber
                },
                schema
            )
        });
    };
    async submitForm() {
        await this.handleError();
        if (this.state.formError != null && this.state.formError.error !== null) {

        } else {
            this.props.requestLogin({
                MobileNumber: this.state.MobileNumber
            }, this.props.navigation)
        }

    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.authenticationService.isRequest ? <LoadingComponent /> : null}
                <View style={styles.headerContainer}>
                    <Text style={styles.headingText}>{`${'Login / Register'}`}</Text>
                    <Text style={styles.subHeadingText}>Enter your mobile number</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.phoneInputContainer}>
                        <TelephoneInput countryStyle={{
                            margin: 7,
                            borderRightColor: "#E7E7E7",
                            borderRightWidth: 1,
                            borderStyle: "solid",
                            fontFamily: Fonts.HelveticaNeueRegular
                        }}
                            placeholder="Enter the mobile number"
                            onChangeText={async value => {
                                await this.inputHandler("MobileNumber", value);
                            }}
                        />
                    </View>

                </View>
                {this.state.formError !== null &&
                    this.state.formError.error !== null &&
                    this.state.formError.error.details[0].context.key == "MobileNumber" ? (
                        <Text style={styles.error}>
                            {this.state.formError.error.details[0].message.replace(/"/g, "")}
                        </Text>
                    ) : null}
                <View style={styles.buttonContainer}>
                    <ButtonComponent name="Submit" clickHandler={() => {
                        this.submitForm();
                    }} />
                </View>

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticationService: state.AuthenticationReducer,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestLogin: (DATA, NavigationAction) => dispatch(requestLogin(DATA, NavigationAction)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticationScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        flex: 1,
        // justifyContent: "center"
    },
    headerContainer: {
        alignSelf: 'center',
    },
    headingText: {
        fontSize: 26,
        fontFamily: Fonts.GeorgiaRegular,
        alignSelf: "center",
        marginTop: 80,
        color: colors.textColor
    },
    subHeadingText: {
        color: colors.textGrayColor,
        fontSize: 12,
        fontFamily: Fonts.GeorgiaRegular,
        alignSelf: "center",
        marginTop: 14,
        marginBottom: 100
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
        borderColor: "#E7E7E7",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 4,
        padding: 8,
        height: 54
    },
    phoneCodeContainer: {
        width: 90,
        height: 46,
        alignSelf: "center"
    },
    picker: {
        fontSize: 11,
        fontFamily: Fonts.GeorgiaRegular,
        height: 46,
        color: colors.textColor,
        margin: 0, padding: 0,
        textAlign: "center",
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerItem: {
        fontSize: 9,
        fontFamily: Fonts.GeorgiaRegular,
        color: colors.textColor,
        margin: 0, padding: 20,
        textAlign: "center",
        alignItems: "center"
    },
    borderRight: {
        width: 1,
        backgroundColor: "#E7E7E7",
        height: 36
    },
    phoneInputContainer: {
        width: "100%"
    },
    phoneInput: {
        width: "100%",
        fontSize: 15,
        fontFamily: Fonts.GeorgiaRegular,
        height: 40,
        marginLeft: 6
    },
    buttonContainer: {
        margin: 20,
    },
    error: {
        // display: "flex",
        color: "#EB5757",
        fontSize: 11,
        paddingBottom: 6,
        paddingLeft: 20,
        paddingRight: 20
    }
});