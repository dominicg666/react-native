import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { colors } from "../../theme/colors";
import Fonts from "../../../utils/Font";
import { Icon } from "@up-shared/components";
import ButtonComponent from "../../components/ButtonComponent";
import ModalComponent from "../../components/Registration/ModalComponent";
import CustomHeader from "../../components/Registration/CustomHeader";
import { addAttendee, removeAttendee, getAttendee, updateAttendee } from "../../store/EventRegistration/actions";
class RegisterScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            EventId: "",
            isEdit: false
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: `Register`,
        header: props => <CustomHeader {...props} navigation={navigation} />
    });
    modalHandlerEvent = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }
    async addAttendees() {
        await this.setState({ isEdit: false });
        this.modalHandlerEvent()
    }
    async editAttendees(index) {
        this.props.getAttendee(index);
        await this.setState({ isEdit: true });
        this.modalHandlerEvent();
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Environmental Law Scholars Conference</Text>
                    <View style={styles.subHeadingContainer}>
                        <Icon name="location" size={14} color="#39354F" />
                        <Text style={styles.subHeadingText}>Qatar National Convention Centre</Text>
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <View style={styles.list}>
                        {this.props.attendeesData.map((data, index) => {
                            return (<View style={styles.listItem} key={index + ""}>
                                <View>
                                    <Text style={styles.listItemTitle}>{data.Name}</Text>
                                </View>
                                <View style={styles.listButtonConatiner}>
                                    <TouchableOpacity style={styles.editButton} onPress={() => this.editAttendees(index)}>
                                        <Icon name="document-edit" size={15} color="#39354F" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => this.props.removeAttendee(index)}>
                                        <Icon name="cancel" size={11} color="#39354F" />
                                    </TouchableOpacity>
                                </View>
                            </View>)
                        })
                        }
                    </View>
                </View>
                <View style={styles.bottomButtonConatiner}>
                    {this.props.attendeesData.length > 0 ? < View style={styles.addMoreButtonConatiner}>
                        <TouchableOpacity style={styles.addmoreButton} onPress={() =>
                            this.addAttendees()
                        }>
                            <Text style={styles.addmoreButtonText}>Add more attendees</Text>
                        </TouchableOpacity>
                    </View> : null
                    }
                    <View>
                        {this.props.attendeesData.length == 0 ? <ButtonComponent name="Add Attendees" clickHandler={() => this.addAttendees()} /> : null}
                        {this.props.attendeesData.length > 0 ?
                            <ButtonComponent name="Continue" clickHandler={() => {
                                this.props.navigation.navigate("AddressScreen", { EventId: this.props.navigation.getParam('EventId'),
                                PriceText: this.props.navigation.getParam('PriceText'),
                                PriceAmount: this.props.navigation.getParam('PriceAmount') });
                            }} /> : null
                        }
                    </View>
                </View>
                <ModalComponent
                    modalVisible={this.state.modalVisible}
                    modalHandlerEvent={this.modalHandlerEvent}
                    addAttendee={this.props.addAttendee}
                    updateAttendee={this.props.updateAttendee}
                    isEdit={this.state.isEdit}
                    Name={this.props.attendee && this.props.attendee.Name ? this.props.attendee.Name : ""}
                    Gender={this.props.attendee && this.props.attendee.Gender ? this.props.attendee.Gender : ""}
                    Age={this.props.attendee && this.props.attendee.Age ? this.props.attendee.Age : ""}
                    editItemIndex={this.props.editItemIndex}
                />
            </ScrollView >
        );
    }
}


const mapStateToProps = state => {
    return {
        authenticationService: state.AuthenticationReducer,
        attendeesData: state.EventRegistrationReducer.attendeesData,
        attendee: state.EventRegistrationReducer.attendee,
        editItemIndex: state.EventRegistrationReducer.editItemIndex,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addAttendee: (attendee) => dispatch(addAttendee(attendee)),
        removeAttendee: (index) => dispatch(removeAttendee(index)),
        getAttendee: (index) => dispatch(getAttendee(index)),
        updateAttendee: (data, index) => dispatch(updateAttendee(data, index)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex: 1,
    }, headerContainer: {
        margin: 22
    },
    subHeadingContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    headerText: {
        fontSize: 20,
        fontFamily: Fonts.GeorgiaRegular,
        color: "#000000"
    },
    subHeadingText: {
        fontSize: 13,
        color: "#39354F",
        fontFamily: Fonts.HelveticaNeueRegular,
        marginLeft: 8
    },
    listContainer: {
        margin: 22
    },
    list: {

    },
    listItem: {
        backgroundColor: "#f5f5f5",
        borderColor: "#E7E7E7",
        borderWidth: 1,
        borderStyle: "solid",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 56,
        marginBottom: 10
    },
    listItemTitle: {
        fontSize: 14,
        color: "#000000",
        fontFamily: Fonts.HelveticaNeueMedium,
        marginTop: 8
    },
    listButtonConatiner: {
        flexDirection: "row"
    },
    deleteButton: {
        width: 34,
        height: 34,
        backgroundColor: "#FFFFFF",
        padding: 11,
        marginBottom: 6,
        borderRadius: 34,
        marginLeft: 5
    },
    editButton: {
        width: 34,
        height: 34,
        backgroundColor: "#FFFFFF",
        padding: 10,
        marginBottom: 6,
        borderRadius: 34,
        marginLeft: 5
    },
    bottomButtonConatiner: {
        margin: 22
    },
    addMoreButtonConatiner: {
        justifyContent: "center",
        marginBottom: 20
    },
    addmoreButton: {
        alignSelf: "center",
        padding: 20
    },
    addmoreButtonText: {
        color: "#626262",
        textDecorationLine: "underline",
        fontFamily: Fonts.HelveticaNeueRegular,
        fontSize: 12,
    }
});