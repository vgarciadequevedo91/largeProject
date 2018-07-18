import React, { Component } from 'react';
import { AppRegistry, Text, Button } from 'react-native';

export default class ClassDetailView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.name,
        headerLeft: (
            <Button
            onPress={() => navigation.goBack()}
            title="Close"
            color="#16966A"
            />
        ),
    });

    render() {
      const { name, id, professor, sessionName, sessionID } = this.props.navigation.state.params

      return (
        <Text>
            {sessionName}
        </Text>
      );
    }
  }

  AppRegistry.registerComponent('ClassDetailView', () => ClassDetailView);
