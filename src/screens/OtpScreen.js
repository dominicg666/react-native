import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, TextInput, TouchableOpacity } from 'react-native';
import { LoadingComponent } from "../components/LoadingComponent";
import { connect } from "react-redux";
import { colors } from "../theme/colors";
import { Icon } from "@up-shared/components";
import Fonts from "../../utils/Font";
import ButtonComponent from "../components/ButtonComponent";
import OtpInputs from 'react-native-otp-inputs';
import { requestOtpVerify } from "../store/Authentication/actions";

const Joi = require("joi-react-native");
const schema = Joi.object().keys({
    OtpCode: Joi.string().trim()
        .required().min(5)
        .label("OTP")
});

class OtpScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MobileNumber: "",
            OtpCode: "",
            formError: null,
            showPassword: false
        };
        const { navigation } = this.props;

    }

    componentDidMount() {
        this.setState({
            MobileNumber: this.props.authenticationService.data && this.props.authenticationService.data.MobileNumber ? this.props.authenticationService.data.MobileNumber : null
        });
    }
    inputHandler = async (name, value) => {
        await this.setState({
            [name]: value
        });
        await this.handleError();
    };
    handleError = async () => {
        await this.setState({
            formError: Joi.validate(
                {
                    OtpCode: this.state.OtpCode
                },
                schema
            )
        });
    };

    async submitForm() {
        await this.handleError();
        if (this.state.formError != null && this.state.formError.error !== null) {

        } else {
            this.props.requestOtpVerify({
                MobileNumber: this.state.MobileNumber,
                OtpCode: this.state.OtpCode
            }, this.props.navigation)
        }

    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.authenticationService.isRequest ? <LoadingComponent /> : null}
                <View style={styles.headerContainer}>
                    <Text style={styles.headingText}>{`${'Enter OTP'}`}</Text>
                    <Text style={styles.subHeadingText}>Enter the 5 digit number sent to</Text>
                    <Text style={styles.mobileNumberText}>{this.props.authenticationService.data && this.props.authenticationService.data.OtpCode ?
                        this.props.authenticationService.data.OtpCode : null}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <OtpInputs
                        handleChange={async code => await this.inputHandler("OtpCode", code)}
                        numberOfInputs={5}
                        inputStyles={styles.otpInputStyle}
                        inputContainerStyles={styles.otpInputContainerStyles}
                        focusedBorderColor="#718780"
                    />
                </View>
                {this.state.formError !== null &&
                    this.state.formError.error !== null &&
                    this.state.formError.error.details[0].context.key == "OtpCode" ? (
                        <Text style={styles.error}>
                            {this.state.formError.error.details[0].message.replace(/"/g, "")}
                        </Text>
                    ) : null}
                <View style={styles.buttonContainer}>
                    <ButtonComponent name="Login" clickHandler={() => {
                        this.submitForm();
                    }} />
                </View>
                <TouchableOpacity style={styles.clicklayer}>
                    <View style={styles.resentContainer}>
                        <View>
                            <Text style={styles.resentTextColor}>{'Didn’t receive an OTP?'}</Text>
                        </View>
                        <View>
                            <Text style={[styles.resentTextColor, styles.textUnderline]}>{'Resend'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clicklayer} onPress={() => {
                    this.props.navigation.pop()
                }}>
                    <View style={styles.resentContainer}>
                        <View style={{ marginTop: 3, marginRight: 5 }}>
                            <Icon name="circle-left" size={11} color="#8E8E8E" />
                        </View>
                        <View>
                            <Text style={styles.resentTextColor}>{'Back'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
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
        requestOtpVerify: (DATA, NavigationAction) => dispatch(requestOtpVerify(DATA, NavigationAction)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OtpScreen);



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
        fontFamily: Fonts.HelveticaNeueRegular,
        alignSelf: "center",
        marginTop: 14
    },
    mobileNumberText: {
        fontSize: 15,
        fontFamily: Fonts.HelveticaNeueMedium,
        alignSelf: "center",
        fontWeight: "500",
        marginTop: 20,
        marginBottom: 50,
        color: colors.textColor
    },
    inputContainer: {
        margin: 16,
    },
    buttonContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40
    },
    otpInputStyle: {
        borderRadius: 6,
        fontSize: 20,
        fontFamily: Fonts.HelveticaNeueRegular,
    },
    otpInputContainerStyles: {
        borderColor: "#E7E7E7",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 4,
        width: 46,
        height: 48,
        fontFamily: Fonts.HelveticaNeueRegular,
    },
    otpInputsContainerStyles: {
        borderColor: "#718780"
    },
    resentContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 60
    },
    resentTextColor: {
        color: "#8E8E8E",
        fontSize: 13,
        fontFamily: Fonts.HelveticaNeueRegular,
    },
    clicklayer: {
        justifyContent: "center",
        alignSelf: "center",
    },
    textUnderline: {
        textDecorationLine: "underline",
        marginLeft: 5
    },
    error: {
        // display: "flex",
        color: "#EB5757",
        fontSize: 11,
        paddingBottom: 6,
        paddingLeft: 22,
        paddingRight: 22,
        marginTop: 20,
    }
});