import React, { Component } from 'react';
import { Platform, AppRegistry, TextInput, StyleSheet } from 'react-native';

export default class TextField extends Component {
  render() {
    return (
      <TextInput
        style={styles.textField}
        onChangeText={(text) => this.setState({text})}
        text={this.props.text}
        placeholder={this.props.placeholder}
        keyboardType={this.props.keyboardType}
        autoCapitalize={this.props.autoCapitalize}
      />
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    borderWidth: 2,
    borderColor: Platform.OS === 'ios' ? '#0000004D' : null,
    borderRadius: 4,
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    fontSize: 15
  }
});

AppRegistry.registerComponent('TextField', () => TextField);