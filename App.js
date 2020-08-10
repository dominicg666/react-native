/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import AppContainer from "./src/navigations/AppContainer";
import { Provider } from "react-redux";
import store from "./src/store/ConfigureStore";
import FlashMessage from "react-native-flash-message";

export default class App extends React.Component {
  constructor(props){
    super(props)
    console.reportErrorsAsExceptions = false;
  }
  render() {
    return (<Provider store={store}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <AppContainer />
      <FlashMessage position="top" />
    </Provider>);
  }
}