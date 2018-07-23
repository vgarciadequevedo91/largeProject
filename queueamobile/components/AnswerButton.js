import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, View, Text } from 'react-native';

export default class AmswerButton extends Component {
  constructor() {
    super()

    this.state = {
        selected: false
    }
  }

  render() {
    onPress = () => {
      this.setState({selected: true})
      this.props.onPress()
    }

    return (
        <TouchableHighlight onPress={() => onPress()} underlayColor='white'>
            <View style={this.state.selected ? styles.selected : styles.deselected}>
                <Text style={this.state.selected ? styles.selectedTitle : styles.deselectedTitle}>{this.props.title}</Text>
            </View>
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    deselected: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        minWidth: 100,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.03)',
        borderColor: 'rgba(0,0,0,.3)',
        borderWidth: 2,
        borderRadius: 4,
        height: 50,
    },
    deselectedTitle: {
        color: 'black',
        fontSize: 17
    },

    selected: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        minWidth: 100,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center',
        backgroundColor: '#16966A1A',
        borderColor: '#16966A',
        borderWidth: 2,
        borderRadius: 4,
        height: 50,
    },
    selectedTitle: {
        color: '#16966A',
        fontSize: 17,
        fontWeight: 'bold'
    }
  })

AppRegistry.registerComponent('AmswerButton', () => AmswerButton);
