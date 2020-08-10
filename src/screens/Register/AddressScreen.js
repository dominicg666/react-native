import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, ScrollView, TouchableOpacity, TextInput, Picker, } from 'react-native';
import { connect } from "react-redux";
import { colors } from "../../theme/colors";
import Fonts from "../../../utils/Font";
import { Icon } from "@up-shared/components";
import ButtonComponent from "../../components/ButtonComponent";
import CustomHeader from "../../components/Registration/CustomHeader";
import { eventRegistration, clearAttendees } from "../../store/EventRegistration/actions";
import { requestMyEvents } from "../../store/MyEvents/actions";
import { getUser, setUser } from '../../Lib/asyncStorageModule';
const Joi = require("joi-react-native");
const schema = Joi.object().keys({
    Address: Joi.string().trim()
        .required().min(3).max(15)
        .label("Address"),
    Country: Joi.string().trim()
        .required()
        .label("Country"),
    State: Joi.string().trim()
        .required()
        .label("State"),
    ZipCode: Joi.string().trim()
        .required().min(6).max(6)
        .label("ZipCode")
});

class AddressScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            Country: "",
            State: "",
            Price: "",
            Address: "",
            ZipCode: "",
            formError: null,
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: `Address`,
        header: props => <CustomHeader {...props} navigation={navigation} />
    });

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
                    Address: this.state.Address,
                    Country: this.state.Country,
                    State: this.state.State,
                    ZipCode: this.state.ZipCode
                },
                schema
            )
        });
    };
    clickHandlerRegister = async () => {
        let data = await getUser();
        if (this.state.formError != null && this.state.formError.error !== null) {
            return;
        }
        await this.props.eventRegistration(data.Token, {
            Attendees: this.props.attendeesData,
            EventId: this.props.navigation.getParam('EventId'),
            Price: this.props.navigation.getParam('PriceAmount'),
            Address: this.state.Address,
            Country: this.state.Country,
            State: this.state.State,
            ZipCode: this.state.ZipCode
        })
        if (this.props.registrationResult && this.props.registrationResult.status) {
            this.setState({
                Address: "",
                Country: "",
                State: "",
                ZipCode: ""
            });
            this.props.requestMyEvents(data.Token);
            this.props.clearAttendees();
            this.props.navigation.popToTop();
            this.props.navigation.popToTop();
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Let us know where you are</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.inputMultilineConatiner}>
                        <TextInput placeholder="Address" multiline={true} style={styles.input} value={this.state.Address}
                            onChangeText={async value => {
                                await this.inputHandler("Address", value);
                            }} />
                    </View>
                    {this.state.formError !== null &&
                        this.state.formError.error !== null &&
                        this.state.formError.error.details[0].context.key == "Address" ? (
                            <Text style={styles.error}>
                                {this.state.formError.error.details[0].message.replace(/"/g, "")}
                            </Text>
                        ) : null}

                    <View style={styles.inputConatiner}>
                        <Picker
                            placeholder="Country"
                            selectedValue={this.state.Country}
                            style={styles.input}
                            onValueChange={async (itemValue, itemIndex) => {
                                await this.inputHandler("Country", itemValue);
                            }
                            }>
                            <Picker.Item label="Country" value="" />
                            {
                                this.props.countryService.countryList.map(data => {
                                    return (<Picker.Item label={data.name} value={data.id + ""} key={data.id + ""} />);
                                })
                            }
                        </Picker>
                    </View>
                    {this.state.formError !== null &&
                        this.state.formError.error !== null &&
                        this.state.formError.error.details[0].context.key == "Country" ? (
                            <Text style={styles.error}>
                                {this.state.formError.error.details[0].message.replace(/"/g, "")}
                            </Text>
                        ) : null}
                    <View style={styles.inputConatiner}>
                        <Picker
                            placeholder="State"
                            selectedValue={this.state.State}
                            style={styles.input}
                            onValueChange={async (itemValue, itemIndex) => {
                                await this.inputHandler("State", itemValue);
                            }
                            }>
                            <Picker.Item label="State" value="" />
                            {
                                this.props.countryService.stateList.map(data => {
                                    return (<Picker.Item label={data.name} value={data.id + ""} key={data.id + ""} />);
                                })
                            }
                        </Picker>
                    </View>
                    {this.state.formError !== null &&
                        this.state.formError.error !== null &&
                        this.state.formError.error.details[0].context.key == "State" ? (
                            <Text style={styles.error}>
                                {this.state.formError.error.details[0].message.replace(/"/g, "")}
                            </Text>
                        ) : null}
                    <View style={styles.inputConatiner}>
                        <TextInput placeholder="Zipcode" style={styles.input} keyboardType="numeric" value={this.state.ZipCode} onChangeText={async value => {
                            await this.inputHandler("ZipCode", value);
                        }} />
                    </View>
                    {this.state.formError !== null &&
                        this.state.formError.error !== null &&
                        this.state.formError.error.details[0].context.key == "ZipCode" ? (
                            <Text style={styles.error}>
                                {this.state.formError.error.details[0].message.replace(/"/g, "")}
                            </Text>
                        ) : null}
                </View>
                <View style={styles.borderHorizontal} />
                <View style={styles.footerConatainer}>
                    <View style={styles.footerAmountConatiner}>
                        <Text style={styles.footerAmountSubText}>Event fee</Text>
                        <Text style={styles.footerAmountText}>{this.props.navigation.getParam('PriceText')}</Text>
                    </View>
                </View>
                <View style={styles.bottomButtonConatiner}>
                    <View>
                        <ButtonComponent name="Complete" clickHandler={() => this.clickHandlerRegister()} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticationService: state.AuthenticationReducer,
        countryService: state.CountryReducer,
        attendeesData: state.EventRegistrationReducer.attendeesData,
        registrationResult: state.EventRegistrationReducer.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        eventRegistration: (token, data) => dispatch(eventRegistration(token, data)),
        requestMyEvents: (token) => dispatch(requestMyEvents(token)),
        clearAttendees: () => dispatch(clearAttendees()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddressScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex: 1,
    }, headerContainer: {
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
    },
    headerText: {
        fontSize: 20,
        fontFamily: Fonts.GeorgiaRegular,
        color: "#000000"
    },
    formContainer: {
        margin: 22
    },
    inputConatiner: {
        height: 46,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#E7E7E7",
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 5
    },
    inputMultilineConatiner: {
        minHeight: 46,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#E7E7E7",
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 5
    },
    input: {
        padding: 8
    },
    bottomButtonConatiner: {
        margin: 22
    },
    borderHorizontal: {
        height: 1,
        width: "100%",
        backgroundColor: "#e9e9e9",
        marginTop: 16,
        marginBottom: 20
    },
    footerConatainer: {
        display: "flex",
        flexDirection: "row"
    },
    footerAmountConatiner: {
        flexDirection: "column",
        marginLeft: 22,
        marginRight: 22,
        marginTop: 10,
        marginBottom: 10
    },

    footerAmountText: {
        fontFamily: Fonts.HelveticaNeueMedium,
        fontSize: 16,
        color: "#000000",
        marginTop: 4
    },
    footerAmountSubText: {
        fontFamily: Fonts.HelveticaNeueRegular,
        fontSize: 11,
        color: "#aaaaaa",
    },
    error: {
        // display: "flex",
        color: "#EB5757",
        fontSize: 11,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10
    }
});