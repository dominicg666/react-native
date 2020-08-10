import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import ListComponent from "../components/Events/List/ListComponent";
import { connect } from "react-redux";
import { Icon } from "@up-shared/components";
import { colors } from "../theme/colors";
import Fonts from "../../utils/Font";
import { requestMyEvents } from "../store/MyEvents/actions";
import { getUser, setUser, clearUser } from '../Lib/asyncStorageModule';
import { LoadingComponent } from "../components/LoadingComponent";
class EventsScreen extends Component {

    constructor(props) {
        super(props);
        this.init();

    }

    static navigationOptions = ({ navigation }) => ({
        title: `My Events`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center', fontFamily: Fonts.GeorgiaRegular, fontSize: 16, width: Dimensions.get("screen").width - 15 },
        headerStyle: {
            backgroundColor: 'white',
        },
        headerRight: (
            <TouchableOpacity style={styles.logoutButton} onPress={() => {
                clearUser();
                navigation.navigate("AuthNavigator");
            }}>
                <Icon name="exit" size={18} color="#000000" />
                {/* <Text style={styles.logoutButtonText}>Logout</Text> */}
            </TouchableOpacity>
        ),
    });

    async init() {
        let data = await getUser();
        await this.props.requestMyEvents(data.Token);

    }

    itemClickHandler(item) {
        this.props.navigation.navigate("MyEventDetails", { EventId: item.EventId });
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.myEventsService.isRequest ? <LoadingComponent /> : null}
                <ListComponent
                    data={this.props.myEventsService
                        && this.props.myEventsService.data
                        && this.props.myEventsService.data.length > 0 ? this.props.myEventsService.data : []}
                    itemClickHandler={this.itemClickHandler.bind(this)}
                />
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        authenticationService: state.AuthenticationReducer,
        myEventsService: state.MyEventsReducer

    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestMyEvents: (token) => dispatch(requestMyEvents(token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsScreen);


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f7fa",
        flex: 1
    },
    logoutButton: {
        padding: 10
    },
    logoutButtonText: {
        fontFamily: Fonts.HelveticaNeueRegular,
        color: "#000000"
    }
});