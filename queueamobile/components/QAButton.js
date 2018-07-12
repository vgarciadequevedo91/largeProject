import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, View, Text } from 'react-native';

export default class QAButton extends Component {
  render() {
    return (
        <TouchableHighlight onPress={this.props.onPress} underlayColor='white'>
            <View style={styles.button}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      margin: 20,
      minWidth: 100,
      paddingLeft: 20,
      paddingRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#16966A',
      borderRadius: 4,
      height: 44,
    },
    title: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold'
    }
  })

AppRegistry.registerComponent('QAButton', () => QAButton);
