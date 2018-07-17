import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import MyClassesView from './components/MyClassesView.js';
import ClassDetailView from './components/ClassDetailView.js';

export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}

const RootStack = createStackNavigator(
  {
    MyClassesView: MyClassesView,
    ClassDetailView: ClassDetailView,
  },
  {
    initialRouteName: 'MyClassesView',
    mode: 'modal',
  }
);
