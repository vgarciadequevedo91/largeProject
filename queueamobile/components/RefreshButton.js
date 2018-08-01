import React, { Component } from 'react';
import { AppRegistry, TouchableHighlight, Image, Platform } from 'react-native';

export default class RefreshButton extends Component {
  render() {
    return (
        <TouchableHighlight 
          style={{paddingRight: Platform.OS === 'ios' ? 0 : 8}}
          onPress={this.props.onPress} 
          underlayColor='#00000000'>
            <Image source={require('../assets/refresh.png')}/>
        </TouchableHighlight>
    );
  }
}

AppRegistry.registerComponent('RefreshButton', () => RefreshButton);
