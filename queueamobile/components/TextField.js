import React, { Component } from 'react';
import { Platform, AppRegistry, TextInput, StyleSheet } from 'react-native';

export default class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: this.props.text,
      placeholder: this.props.placeholder,
      autoCapitalize: this.props.autoCapitalize,
      autoCorrect: this.props.autoCorrect,
      secureTextEntry: this.props.secureTextEntry,
    };
  }

  render() {
    return (
      <TextInput
        style={styles.textField}
        onChangeText={(text) => this.setState({text})}
        text={this.state.text}
        placeholder={this.state.placeholder}
        autoCapitalize={this.state.autoCapitalize}
        autoCorrect={this.state.autoCorrect}
        secureTextEntry={this.state.secureTextEntry}
      />
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    backgroundColor: Platform.OS === 'ios' ? '#f6f6f6' : null,
    borderRadius: 4,
    height: 50,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10
  }
});

AppRegistry.registerComponent('TextField', () => TextField);