import React, { Component } from 'react';
import { Text, View, Animated, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { LoadingComponent } from "../components/LoadingComponent";
import ListComponent from "../components/Home/List/ListComponent";
import { getUser, setUser } from '../Lib/asyncStorageModule';
import { colors } from "../theme/colors";
import Fonts from "../../utils/Font";
import { Icon } from "@up-shared/components";
import { connect } from "react-redux";
import { requestSearchList } from "../store/Search/actions";
import ElevatedView from 'react-native-elevated-view';

class SearchScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: "",
            Token: ""
        };
    }
    async componentDidMount() {
        let data = await getUser();
        this.setState({ Token: data.Token })
    }
    async inputHandler(value) {
        this.setState({ searchQuery: value })
        this.props.requestSearchList(this.state.Token, {
            generalSearch: value,
            EventCategoryId: "All"
        })
        console.log(this.props.searchService);

    }
    itemClickHandler(item) {
        this.props.navigation.navigate("ItemDetailsScreen", { EventId: item.EventId });
    }
    render() {
        return (
            <View style={styles.container}>

                <ElevatedView style={styles.headerbar} elevation={4}>
                    <View style={styles.searchContainer}>
                        <TouchableOpacity style={styles.searchIcon} onPress={() => { this.props.navigation.pop() }}>
                            <Icon name="back" size={14} color="#A3A3A3" />
                        </TouchableOpacity>
                        <View>
                            <TextInput
                                autoFocus={true}
                                style={styles.searchInput} placeholder="Search" value={this.state.searchQuery} onChangeText={async value => {
                                    await this.inputHandler(value);
                                }} />
                        </View>
                    </View>
                </ElevatedView>
                <View>
                    {this.props.searchService.isRequest ? (<View style={{ marginTop: 30 }}><LoadingComponent /></View>) : null}
                    <ListComponent
                        data={this.props.searchService
                            && this.props.searchService.data
                            && this.props.searchService.data.length > 0
                            && this.state.searchQuery.trim() !== "" ? this.props.searchService.data : []}
                        itemClickHandler={this.itemClickHandler.bind(this)}
                        routekey={"routekey"}
                    />
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        authenticationService: state.AuthenticationReducer,
        searchService: state.SearchReducer

    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestSearchList: (token, data) => dispatch(requestSearchList(token, data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchScreen);


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f7fa",
        flex: 1,
        // justifyContent: "center"
    },
    tabbar: {
        backgroundColor: 'rgba(0, 0, 0, .32)',
        elevation: 0,
        shadowOpacity: 0,
    },
    tabIndicatorStyle: {
        backgroundColor: "#FFFFFF",
        color: colors.labelColor
    },
    tabBarStyle: {
        backgroundColor: "#FFFFFF",
        color: colors.labelColor
    },
    tabTextContainer: {
        paddingLeft: 15,
        fontFamily: Fonts.HelveticaNeueRegular
    }, logoText: {
        color: colors.primaryColor,
        fontSize: 16,
        fontFamily: Fonts.GeorgiaRegular,
        alignSelf: "center",
        marginTop: 20
    },
    searchContainer: {
        margin: 14,
        backgroundColor: "#ecefee",
        borderRadius: 4,
        flexDirection: "row",
        height: 44,
    },
    searchInput: {
        width: Dimensions.get("screen").width - (28),
        height: 44,
        fontFamily: Fonts.HelveticaNeueRegular,
        paddingTop: 14,
        color: "#A3A3A3"
    },
    searchIcon: {
        padding: 15
    },
    headerbar: {
        backgroundColor: "#ffffff"
    }
});
