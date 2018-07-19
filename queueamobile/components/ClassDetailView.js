import React, { Component } from 'react';
import { AppRegistry, Text, Button, StyleSheet, View, SectionList, TouchableHighlight } from 'react-native';
import SessionModel from '../models/SessionModel';

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
        headerBackTitle: 'Sessions'
    });

    render() {
      formatDate = (date) => {
        var dateString = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()

        var hours = date.getHours()
        hours = hours % 12
        hours = hours ? hours : 12

        var mins = date.getMinutes()
        mins = mins < 10 ? '0' + mins : mins
        
        var ampm = hours >= 12 ? 'pm' : 'am'
        var timeString = hours + ':' + mins + ampm

        return dateString + ', ' + timeString
      }

      openSession = (session) => {
        this.props.navigation.navigate('SessionDetailView', session)
      }

      const { name, id, professor, sessions } = this.props.navigation.state.params

      return (
        <View style={styles.container}>
            <Text style={styles.caption}>
                {'ID: ' + id + '\n' + professor}
            </Text>
            <SectionList
                sections={[{
                    title: 'Active Sessions', data: sessions
                }]}
                renderItem={({item}) => 
                    <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => openSession(item)}>
                        <View>
                            <Text style={styles.sessionName}>{item.name}</Text>
                            <Text style={styles.sessionDate}>{formatDate(item.createdAt)}</Text>
                            <View style={styles.separator}></View>
                        </View>
                    </TouchableHighlight>
                }
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    caption: {
        fontSize: 15,
        margin: 20,
        color: 'rgba(0,0,0,.5)'
    },
    sectionHeader: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        fontSize: 17,
        backgroundColor: 'white',
    },
    sessionName: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 6,
        fontSize: 17,
        fontWeight: 'bold',
    },
    sessionDate: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 20,
        fontSize: 15,
        color: 'rgba(0,0,0,.5)'
    },
    separator: {
        backgroundColor: 'rgba(0,0,0,.1)',
        marginLeft: 30,
        height: 1
    }
});

AppRegistry.registerComponent('ClassDetailView', () => ClassDetailView);
