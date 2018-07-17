import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextField from './TextField';
import QAButton from './QAButton';
import Subhead from './Subhead';
import ClassModel from '../models/ClassModel';

export default class MyClassesView extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    joinClass = (id) => {
      let myClass = new ClassModel('My Cool Class', id)
      this.props.navigation.navigate('ClassDetailView', myClass)
    }
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardDismissMode='on-drag'>
        <View style={styles.form}>
          <Text style={styles.headerText}>
            Join a Class
          </Text>
          <Subhead text='Class ID'/>
          <TextField placeholder='Enter the ID given by your instructor' keyboardType='numeric' />
          <QAButton 
              onPress={() => joinClass('12345')} 
              title='Join'
          />
        </View>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 40,
        color: 'black'
    },
    logo: {
      position: 'absolute',
      alignSelf: 'center',
      top: 50
    }
});

AppRegistry.registerComponent('MyClassesView', () => MyClassesView);