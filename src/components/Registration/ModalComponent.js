import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Picker, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import ButtonComponent from "../../components/ButtonComponent";
import ButtonSecondaryComponent from "../../components/ButtonSecondaryComponent";
import { colors } from "../../theme/colors";
import Fonts from "../../../utils/Font";
const Joi = require("joi-react-native");
const schema = Joi.object().keys({
    Name: Joi.string().trim()
        .required().min(3).max(15)
        .label("Name"),
    Gender: Joi.string().trim()
        .required()
        .label("Gender"),
    Age: Joi.string().trim()
        .required()
        .label("Age")
});
export default class ModalComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Name: "",
            Gender: "",
            Age: "",
            formError: null,
        }
        this.clickHandlerAdd = this.clickHandlerAdd.bind(this);
        this.clickHandlerUpdate = this.clickHandlerUpdate.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.isEdit) {
            this.setState({
                Name: newProps.Name,
                Gender: newProps.Gender,
                Age: newProps.Age,
            })
        } else {
            this.setState({
                Name: "",
                Gender: "",
                Age: "",
            })
        }
    }



    clickHandlerAdd = () => {
        if (this.state.formError != null && this.state.formError.error !== null) {
            return;
        }
        this.props.addAttendee({
            Name: this.state.Name,
            Gender: this.state.Gender,
            Age: this.state.Age
        })
        this.setState({
            Name: "",
            Gender: "",
            Age: ""
        });
        this.props.modalHandlerEvent()

    }
    clickHandlerUpdate = (index) => {
        if (this.state.formError != null && this.state.formError.error !== null) {
            return;
        }
        this.props.updateAttendee({
            Name: this.state.Name,
            Gender: this.state.Gender,
            Age: this.state.Age
        }, index)
        this.setState({
            Name: "",
            Gender: "",
            Age: ""
        });
        this.props.modalHandlerEvent()

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
                    Name: this.state.Name,
                    Gender: this.state.Gender,
                    Age: this.state.Age
                },
                schema
            )
        });
    };
    render() {
        return (
            <Modal isVisible={this.props.modalVisible} onRequestClose={() => this.props.modalHandlerEvent()} >
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <View style={styles.inputConatiner}>
                            <TextInput placeholder="Name" style={styles.input} value={this.state.Name} onChangeText={async value => {
                                await this.inputHandler("Name", value);
                            }} />
                        </View>
                        {this.state.formError !== null &&
                            this.state.formError.error !== null &&
                            this.state.formError.error.details[0].context.key == "Name" ? (
                                <Text style={styles.error}>
                                    {this.state.formError.error.details[0].message.replace(/"/g, "")}
                                </Text>
                            ) : null}
                        <View style={styles.inputConatiner}>
                            <Picker
                                selectedValue={this.state.Gender}
                                style={styles.input}
                                onValueChange={async (itemValue, itemIndex) => {
                                    await this.inputHandler("Gender", itemValue);
                                }
                                }>
                                <Picker.Item label="Gender" value="" />
                                <Picker.Item label="Male" value="1" />
                                <Picker.Item label="Female" value="2" />
                                <Picker.Item label="Other" value="3" />
                            </Picker>
                        </View>
                        {this.state.formError !== null &&
                            this.state.formError.error !== null &&
                            this.state.formError.error.details[0].context.key == "Gender" ? (
                                <Text style={styles.error}>
                                    {this.state.formError.error.details[0].message.replace(/"/g, "")}
                                </Text>
                            ) : null}
                        <View style={styles.inputConatiner}>
                            <TextInput placeholder="Age" style={styles.input} value={this.state.Age} onChangeText={async value => {
                                await this.inputHandler("Age", value);
                            }} keyboardType="numeric" />
                        </View>
                        {this.state.formError !== null &&
                            this.state.formError.error !== null &&
                            this.state.formError.error.details[0].context.key == "Age" ? (
                                <Text style={styles.error}>
                                    {this.state.formError.error.details[0].message.replace(/"/g, "")}
                                </Text>
                            ) : null}
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={{ width: (Dimensions.get("screen").width / 2) - 30 }}>
                            <ButtonSecondaryComponent name="Cancel" clickHandler={() => this.props.modalHandlerEvent()} />
                        </View>
                        <View style={{ width: (Dimensions.get("screen").width / 2) - 30 }}>
                            {this.props.isEdit ? <ButtonComponent name="Update" clickHandler={() => this.clickHandlerUpdate(this.props.editItemIndex)} /> : <ButtonComponent name="Add" clickHandler={() => this.clickHandlerAdd()} />}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 4
    },
    formContainer: {
        margin: 10
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
    input: {
        padding: 8
    }, buttonContainer: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-around"
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