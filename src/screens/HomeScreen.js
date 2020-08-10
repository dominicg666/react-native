import React, { Component } from 'react';
import { Text, View, Animated, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { LoadingComponent } from "../components/LoadingComponent";
import { connect } from "react-redux";
import { TabView, TabBar, PagerPan } from 'react-native-tab-view';
import HomeTabPager from "../components/Home/HomeTabPager";
import { colors } from "../theme/colors";
import Fonts from "../../utils/Font";
import { Icon } from "@up-shared/components";
import { getUser, setUser } from '../Lib/asyncStorageModule';
import { requestEventCategory } from "../store/EventCategory/actions";
class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            routes: [

            ],
            searchQuery: ""
        };
        this.init();

    }
    async init() {
        let data = await getUser();
        await this.props.requestEventCategory(data.Token);
        let routes = [
            {
                key: "All", title: "All"
            }
        ];
        if (this.props.eventCategoryService && this.props.eventCategoryService.data) {
            this.props.eventCategoryService.data.map((data, index) => {
                routes.push({ key: data.EventCategoryId, title: data.EventCategoryName })
            });
        }
        this.setState({ routes });

    }
    _handleIndexChange = index => {
        this.setState({ index });
    };
    _renderPager = props => <PagerPan {...props} />;
    _renderHeader = props => {
        const { index, routes } = props.navigationState;
        return (
            <View>
                <TabBar {...props} style={styles.tabbar} scrollEnabled={true}
                    indicatorStyle={styles.TabIndicatorStyle}
                    style={styles.tabBarStyle}
                    tabStyle={[styles.tabBarStyle, { width: 'auto' }]}
                    renderLabel={({ route, focused, color }) => (
                        <Text style={[styles.tabTextContainer, { color: focused ? colors.labelColor : "#A4A4A4" }]}>
                            {route.title}
                        </Text>
                    )}
                />
            </View>
        );
    };

    _renderScene = ({ route, jumpTo }) => {
        return (
            <HomeTabPager
                key={route.key}
                routekey={route.key}
                title={route.title}
                navigation={this.props.navigation}
                searchQuery={this.state.searchQuery}
            />
        );
    };

    async inputHandler(value) {
        await this.setState({ searchQuery: value })
        this.init();
    }


    render() {
        return (
            <View style={styles.container}>
                {this.props.eventCategoryService.isRequest ? <LoadingComponent /> : null}
                <View style={styles.headerbar}>
                    <View>
                        <Text style={styles.logoText}>Qatar Foundation</Text>
                    </View>
                    <TouchableOpacity style={styles.searchContainer} onPress={() => {
                        this.props.navigation.navigate("SearchScreen")
                    }}>
                        <View style={styles.searchIcon}>
                            <Icon name="search-input" size={14} color="#A3A3A3" />
                        </View>
                        <View>
                            <Text style={styles.searchInput}>Search</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.routes.length > 0 ? <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene.bind(this)}
                    renderTabBar={this._renderHeader}
                    renderPager={this._renderPager}
                    onIndexChange={this._handleIndexChange}
                /> : null}
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
        requestEventCategory: (token) => dispatch(requestEventCategory(token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);

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
        marginLeft: 14,
        marginRight: 14,
        marginTop: 14,
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
