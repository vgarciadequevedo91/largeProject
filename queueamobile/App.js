import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import MyClassesView from './components/MyClassesView.js';
import ClassDetailView from './components/ClassDetailView.js';
import SessionDetailView from './components/SessionDetailView.js';

export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}

const ClassStack = createStackNavigator(
  {
    ClassDetailView: ClassDetailView,
    SessionDetailView: SessionDetailView,
  },
  {
    initialRouteName: 'ClassDetailView',
  }
);

const RootStack = createStackNavigator(
  {
    MyClassesView: MyClassesView,
    ClassStack: {
      screen: ClassStack,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'MyClassesView',
    mode: 'modal',
  }
);
