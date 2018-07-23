import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View, SectionList } from 'react-native';
import QAButton from './QAButton';
import AnswerButton from './AnswerButton';

export default class SurveyDetailView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Survey',
        headerTintColor: '#16966A',
        headerTitleStyle: {
            color: 'black',
        }
    });

    render() {
      const { questionText, id, answerChoices, numResponses } = this.props.navigation.state.params

      selectAnswer = (id) => {
        // store the answer
      }

      submitAnswer = (id) => {
        // submit the answer that was stored
        // if success, show results
      }

      return (
        <View style={styles.container}>
            <SectionList
                sections={[{title: questionText, data: answerChoices}]}
                renderItem={({item}) =>
                    <View>
                        <AnswerButton
                            onPress={() => selectAnswer()}
                            title={item}
                        />
                    </View>
                }
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
            <QAButton
              onPress={() => submitAnswer()}
              title='Submit'
            />
        </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // flex: 1
    },
    sectionHeader: {
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 30,
        fontSize: 17,
        backgroundColor: 'white',
        fontWeight: 'bold'
    },
    choice: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 6,
        fontSize: 17,
        fontWeight: 'bold',
    },
    sessionResponses: {
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

AppRegistry.registerComponent('SurveyDetailView', () => SurveyDetailView);
