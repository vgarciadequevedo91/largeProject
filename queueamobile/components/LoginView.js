import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native';
import TextField from './TextField';
import QAButton from './QAButton';

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = { placeholder: this.props.placeholder };
  }

  logIn() {
      // log in here?
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loginText}>
          Log into Queue+A
        </Text>
        <TextField placeholder='Username' autoCapitalize='none' autoCorrect={false} />
        <TextField placeholder='Password' secureTextEntry={true} />
        <QAButton 
            onPress={this.logIn} 
            title='Log In'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    loginText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
        color: '#000'
    }
});

AppRegistry.registerComponent('LoginView', () => LoginView);