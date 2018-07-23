import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View, SectionList, TouchableHighlight } from 'react-native';

export default class SessionDetailView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#16966A',
        headerTitleStyle: {
            color: 'black',
        },
        headerBackTitle: 'Session'
    });

    render() {
      const { name, id, createdAt, surveys } = this.props.navigation.state.params

      openSurvey = (survey) => {
        this.props.navigation.navigate('SurveyDetailView', survey)
      }

      return (
        <SectionList
            style={styles.container}
            sections={[
                {title: 'Ask a Question', data: []},
                {title: 'Surveys', data: surveys}
            ]}
            renderItem={({item}) =>
                <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => openSurvey(item)}>
                    <View>
                        <Text style={styles.questionText}>{item.questionText}</Text>
                        <Text style={styles.numResponses}>{item.numResponses + " responses"}</Text>
                        <View style={styles.separator}></View>
                    </View>
                </TouchableHighlight>
            }
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
        />
      )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    sectionHeader: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        fontSize: 17,
        backgroundColor: 'white',
    },
    questionText: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 6,
        fontSize: 17,
        fontWeight: 'bold',
    },
    numResponses: {
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

AppRegistry.registerComponent('SessionDetailView', () => SessionDetailView);
