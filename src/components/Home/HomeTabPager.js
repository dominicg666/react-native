import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ListComponent from "./List/ListComponent"
import { connect } from "react-redux";
import { requestEventsByCategory } from "../../store/EventCategory/actions";
import { getUser, setUser } from '../../Lib/asyncStorageModule';
import { LoadingComponent } from "../LoadingComponent";
class HomeTabPager extends Component {
    constructor(props) {
        super(props);

        this.init();

    }
    async init() {
        let data = await getUser();
        let KEY = this.props.routekey;
        await this.props.requestEventsByCategory(data.Token, {
            generalSearch: "",
            EventCategoryId: KEY
        })
    }

    itemClickHandler(item) {   
        this.props.navigation.navigate("ItemDetailsScreen", { EventId: item.EventId });
    }
    registrationClickHandler(item) {
        // this.props.navigation.navigate("RegisterScreen", { EventId: item.EventId });
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.eventCategoryService.eventList
                    && this.props.eventCategoryService.eventList[`routekey_${this.props.routekey}`]
                    && this.props.eventCategoryService.eventList[`routekey_${this.props.routekey}`]['isRequest'] ? <LoadingComponent /> : null}
                <ListComponent
                    key={`routekey_${this.props.routekey}`}
                    routekey={`routekey_${this.props.routekey}`}
                    data={
                        this.props.eventCategoryService.eventList
                            && this.props.eventCategoryService.eventList[`routekey_${this.props.routekey}`]
                            && this.props.eventCategoryService.eventList[`routekey_${this.props.routekey}`]['data']
                            && this.props.eventCategoryService.eventList[`routekey_${this.props.routekey}`]['data'].length > 0 ?
                            this.props.eventCategoryService.eventList[`routekey_${this.props.routekey}`]['data'] : []
                    }
                    itemClickHandler={this.itemClickHandler.bind(this)}
                    registrationClickHandler={this.registrationClickHandler.bind(this)}
                />
            </View>
        );
    }


}

const mapStateToProps = state => {
    return {
        authenticationService: state.AuthenticationReducer,
        eventCategoryService: state.EventCategoryReducer

    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestEventsByCategory: (token, data) => dispatch(requestEventsByCategory(token, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeTabPager);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f7fa",
        flex: 1
    },
});