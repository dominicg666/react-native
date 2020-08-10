import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import ListItemComponent from "./ListItemComponent";

export default class ListComponent extends Component {
    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={({ item, index }) => <ListItemComponent
                    key={index.toString()}
                    item={item}
                    indexOfData={index}
                    dataSize={this.props.data.length}
                    itemClickHandler={this.props.itemClickHandler}
                    registrationClickHandler={this.props.registrationClickHandler}
                />}

                keyExtractor={item => this.props.routekey + item.EventId + "" + ""}
                key={this.props.routekey}

            />
        );
    }


}
