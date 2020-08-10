import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { connect } from "react-redux";
import ElevatedView from 'react-native-elevated-view'
import { colors } from "../theme/colors";
import Fonts from "../../utils/Font";
import { Icon } from "@up-shared/components";
import ButtonComponent from "../components/ButtonComponent";
import { requestEventDetals } from "../store/EventDetails/actions";
import { getUser, setUser } from '../Lib/asyncStorageModule';
import { LoadingComponent } from "../components/LoadingComponent";
import MapViewComponent from "../components/MapViewComponent";

class ItemDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.init();
    }
    async init() {
        let data = await getUser();
        await this.props.requestEventDetals(data.Token, this.props.navigation.getParam('EventId'));

    }
    registrationClickHandler() {
        this.props.navigation.navigate("RegisterScreen", {
            EventId: this.props.navigation.getParam('EventId'),
            PriceText: this.props.eventDetailsService.data.PriceText,
            PriceAmount: this.props.eventDetailsService.data.PriceAmount
        });
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.eventDetailsService.isRequest ? <LoadingComponent /> :
                    <ScrollView style={styles.container}>
                        <View style={styles.headerContainer}>
                            <ImageBackground source={{ uri: this.props.eventDetailsService.data.Banner ? this.props.eventDetailsService.data.Banner : null }} style={{ width: '100%', height: '100%' }}>
                                <View style={styles.overlay}>
                                    <TouchableOpacity style={styles.buttonConatiner} onPress={() => this.props.navigation.pop()}>
                                        <View style={styles.backConatiner}>
                                            <Icon name="back" size={16} color="#000000" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.bodyContainer}>
                            <View>
                                <View style={styles.titleOutsideConatiner}>
                                    <Text style={styles.title}>{
                                        this.props.eventDetailsService.data.EventName ? this.props.eventDetailsService.data.EventName : null
                                    }</Text>
                                    <TouchableOpacity style={styles.titleButtonConatiner}>
                                        <Icon name="upload-register" size={18} color="#000000" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.titleSubOutsideConatiner}>
                                    <Text style={styles.subTitle}>{
                                        this.props.eventDetailsService.data.Organizer ? this.props.eventDetailsService.data.Organizer : null
                                    } </Text>
                                    <TouchableOpacity style={styles.subTitleButtonConatiner}>
                                        <Text style={styles.subTitleButtonTitle}>{
                                            this.props.eventDetailsService.data.AttendeeCount ? this.props.eventDetailsService.data.AttendeeCount : null
                                        } Seats</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.borderHorizontal} />
                            </View>
                            <View>
                                {this.props.eventDetailsService.data.EventRegisterStartFlag && this.props.eventDetailsService.data.EventRegisterStartFlag != 1 ? <View style={styles.errorConatainer}>
                                    <Icon name="warning" size={13} color="red" />
                                    <Text style={styles.errorText}>{this.props.eventDetailsService.data.EventRegisterStartFlagText}</Text>
                                </View> : null}
                                <Text style={styles.description}>{
                                    this.props.eventDetailsService.data.Dec ? this.props.eventDetailsService.data.Dec : null
                                }</Text>

                            </View>
                        </View>
                        <View style={styles.listConatiner}>
                            <View style={styles.listItemConatiner} >
                                <View style={styles.listItemIconConatiner}><Icon name="calendar1" size={22} color="#000000" /></View>
                                <View style={styles.listItemInnerConatiner}>
                                    <Text style={styles.listItemInnerSmallTitle}>Date</Text>
                                    <Text style={styles.listItemInnerTitle}>{
                                        this.props.eventDetailsService.data.EventDate ? this.props.eventDetailsService.data.EventDate : null
                                    }</Text>
                                </View>
                            </View>

                            <View style={styles.listItemConatiner} >
                                <View style={styles.listItemIconConatiner}><Icon name="clock" size={22} color="#000000" /></View>
                                <View style={styles.listItemInnerConatiner}>
                                    <Text style={styles.listItemInnerSmallTitle}>Time</Text>
                                    <Text style={styles.listItemInnerTitle}>{
                                        this.props.eventDetailsService.data.Time ? this.props.eventDetailsService.data.Time : null
                                    }</Text>
                                </View>
                            </View>

                            <View style={styles.listItemConatiner} >
                                <View style={styles.listItemIconConatiner}><Icon name="location" size={22} color="#000000" /></View>
                                <View style={styles.listItemInnerConatiner}>
                                    <Text style={styles.listItemInnerSmallTitle}>Location</Text>
                                    <Text style={styles.listItemInnerTitle}>{
                                        this.props.eventDetailsService.data.Venue ? this.props.eventDetailsService.data.Venue : null
                                    }</Text>
                                </View>
                            </View>

                            <View style={styles.listItemConatiner} >
                                <View style={styles.listItemIconConatiner}><Icon name="time" size={22} color="#000000" /></View>
                                <View style={styles.listItemInnerConatiner}>
                                    <Text style={styles.listItemInnerSmallTitle}>Duration</Text>
                                    <Text style={styles.listItemInnerTitle}>{
                                        this.props.eventDetailsService.data.Duration ? this.props.eventDetailsService.data.Duration : null
                                    }</Text>
                                </View>
                            </View>

                            <View style={styles.listItemConatiner} >
                                <View style={styles.listItemIconConatiner}><Icon name="replay" size={22} color="#000000" /></View>
                                <View style={styles.listItemInnerConatiner}>
                                    <Text style={styles.listItemInnerSmallTitle}>Frequency</Text>
                                    <Text style={styles.listItemInnerTitle}>{
                                        this.props.eventDetailsService.data.Frequency ? this.props.eventDetailsService.data.Frequency : null
                                    }</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.mapViewContainer}>
                            <MapViewComponent
                                Lat={this.props.eventDetailsService.data.Lat ? parseFloat(this.props.eventDetailsService.data.Lat) : 10.293580}
                                Lng={this.props.eventDetailsService.data.Lng ? parseFloat(this.props.eventDetailsService.data.Lng) : 76.313889}
                                Venue={this.props.eventDetailsService.data.Venue ? this.props.eventDetailsService.data.Venue : ""}
                            />
                        </View>
                    </ScrollView>
                }
                {!this.props.eventDetailsService.isRequest ? <ElevatedView style={styles.footerConatainer} elevation={4}>
                    <View style={styles.footerAmountConatiner}>
                        <Text style={styles.footerAmountText}>{this.props.eventDetailsService.data.PriceText ? this.props.eventDetailsService.data.PriceText : null}</Text>
                        <Text style={styles.footerAmountSubText}>Event fee</Text>
                    </View>
                    <View style={styles.footerButtonConatiner}>
                        {this.props.eventDetailsService.data.EventRegisterStartFlag && this.props.eventDetailsService.data.EventRegisterStartFlag == 1 ? <ButtonComponent name="Register" clickHandler={() => this.registrationClickHandler()} /> : null}
                    </View>
                </ElevatedView> : null}
            </View>
        );
    }
    renderListItem = (item) => {
        return (<View style={styles.listItemConatiner} key={item.icon}>
            <View style={styles.listItemIconConatiner}><Icon name={item.icon} size={22} color="#000000" /></View>
            <View style={styles.listItemInnerConatiner}>
                <Text style={styles.listItemInnerSmallTitle}>{item.subTitle}</Text>
                <Text style={styles.listItemInnerTitle}>{item.title}</Text>
            </View>
        </View>);
    }
}

const mapStateToProps = state => {
    return {
        authenticationService: state.AuthenticationReducer,
        eventDetailsService: state.EventDetailsReducer

    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestEventDetals: (token, id) => dispatch(requestEventDetals(token, id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemDetailsScreen);


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        flex: 1,
        // justifyContent: "center"
    },
    headerContainer: {
        height: 250
    },
    overlay: {
        display: "flex",
        height: 250,
        backgroundColor: "rgba(29,29,29,0.28)"
    },
    buttonConatiner: {
        width: 40,
    },
    backConatiner: {
        backgroundColor: "white",
        width: 32,
        height: 32,
        padding: 7,
        borderRadius: 32,
        margin: 20
    },
    bodyContainer: {
        padding: 25
    },
    titleOutsideConatiner: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontFamily: Fonts.GeorgiaRegular,
        fontSize: 18,
        color: "black",
        width: Dimensions.get("screen").width - 100,
        lineHeight: 22
    },
    titleButtonConatiner: {
        alignSelf: "flex-start",
    },
    titleSubOutsideConatiner: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    subTitle: {
        fontSize: 12,
        fontFamily: Fonts.HelveticaNeueRegular,
        color: colors.labelColor,
        marginTop: 8
    },
    subTitleButtonConatiner: {
        backgroundColor: "#F2F2F2",
        borderRadius: 2
    },
    subTitleButtonTitle: {
        fontSize: 12,
        fontFamily: Fonts.HelveticaNeueRegular,
        color: "#000000",
        padding: 10,
    },
    borderHorizontal: {
        height: 1,
        width: "100%",
        backgroundColor: "#e9e9e9",
        marginTop: 16,
        marginBottom: 20
    },
    description: {
        color: "#909090",
        fontFamily: Fonts.HelveticaNeueRegular,
        fontSize: 13,
        marginTop: 10,
        lineHeight: 22
    },
    listConatiner: {

    },
    listItemConatiner: {
        padding: 25,
        flexDirection: "row",
        borderTopColor: "#f6f6f6",
        borderTopWidth: 1,
        borderStyle: "solid"
    },
    listItemIconConatiner: {
        marginRight: 20,
        marginTop: 6,
    },
    listItemInnerConatiner: {
        flexDirection: "column"
    },
    listItemInnerSmallTitle: {
        color: "#9c9c9c",
        fontSize: 10,
        fontFamily: Fonts.HelveticaNeueRegular,
    },
    listItemInnerTitle: {
        fontFamily: Fonts.HelveticaNeueRegular,
        fontSize: 14,
        color: "#000000",
        marginTop: 2
    },
    mapViewContainer: {
        width: Dimensions.get("screen").width,
        height: 200,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    footerConatainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        height: 75,
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 10
    },
    footerAmountConatiner: {
        flexDirection: "column",
        marginTop: 6,
        width: Dimensions.get("screen").width / 2 - 15,
        marginLeft: 15
    },
    footerButtonConatiner: {
        width: Dimensions.get("screen").width / 2 - 15,
        paddingRight: 5
    },
    footerAmountText: {
        fontFamily: Fonts.HelveticaNeueMedium,
        fontSize: 14,
        color: "#000000",
    },
    footerAmountSubText: {
        fontFamily: Fonts.HelveticaNeueRegular,
        fontSize: 11,
        color: "#aaaaaa",
    },
    errorConatainer: {
        flexDirection: "row",
        backgroundColor:"#f5f8fd",
        padding:10,
        borderRadius:20
    },
    errorText: {
        fontFamily: Fonts.HelveticaNeueRegular,
        fontSize: 12,
        color: "red",
        marginLeft: 8

    }
});
