import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, StyleSheet, View, SectionList, TouchableHighlight, Alert } from 'react-native';
import QAButton from './QAButton';
import SessionModel from '../models/SessionModel';
import SurveyModel from '../models/SurveyModel';
import RefreshButton from './RefreshButton'

export default class SessionDetailView extends Component {
    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state

      return {
        headerTitle: navigation.state.params.name,
        headerTintColor: '#16966A',
        headerTitleStyle: {
            color: 'black',
        },
        headerRight: (
            <RefreshButton onPress={params.refresh}/>
        ),
        headerBackTitle: 'Session'
      }
    }

    refresh = () => {
      fetch('http://group5.gearhostpreview.com/API/StudentListPolls.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionID: this.state.session.id,
        }),
      }).then((response) => response.json()).then((responseJson) => {
        // Check response
        if (responseJson.error === '' || responseJson.error === null) {
          this.setState({session:
            new SessionModel(this.state.session.name, responseJson.sessionID, this.state.session.createdAt, responseJson.questionList)
          })
        }
      }).catch((error) => {
        console.warn(error)
      });
    }

    componentDidMount() {
      this.props.navigation.setParams({refresh: this.refresh})
    }

    constructor(props) {
      super(props);
      this.state = {
        session: this.props.navigation.state.params,
        text: ''
      }
    }

    render() {
      askQuestion = (question) => {
        question = this.state.text;
        console.warn("Called")

        // Ignore if there is no question text
        if(question.length > 0) {

          // Pull class information
          fetch('http://group5.gearhostpreview.com/API/AskQuestionRN.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionID: this.state.session.id,
              text: question
            }),
          }).then((response) => response.json()).then((responseJson) => {
            // Check response
            if (!(responseJson.error === '' || responseJson.error === null)) {
              Alert.alert(
                'Question did not send',
                '' + responseJson.error,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            }
            else {
              this.setState({text: ''})
            }
          }).catch((error) => {
            Alert.alert(
              'Question did not send',
              '' + error,
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
          });
        }
      }

      openSurvey = (survey) => {
        let surveyObj = new SurveyModel(survey.questionText, survey.pollID,
        survey.answers.filter(a => a.answer != ''))
        this.props.navigation.navigate('SurveyDetailView', surveyObj)
      }

      return (
        <View style={styles.container}>
          <Text
            style={styles.sectionHeader}>
            Ask a Question
          </Text>
          <View style={styles.form}>
            <TextInput
              style={styles.textField}
              underlineColorAndroid='rgba(0,0,0,0)'
              onChangeText={(text) => this.setState({text: text})}
              value={this.state.text}
              placeholder='Wondering anything?'
            />
            <QAButton
              styleOverride={styles.button}
              disabled={this.state.text.length == 0}
              onPress={() => askQuestion()}
              title='Ask'
            />
          </View>
          <SectionList
              style={styles.container}
              sections={[
                  {title: 'Surveys', data: this.state.session.surveys}
              ]}
              renderItem={({item}) =>
                  <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => openSurvey(item)}>
                      <View>
                          <Text style={styles.questionText}>{item.questionText}</Text>
                          <Text style={styles.numResponses}>{item.numAnswers + " responses"}</Text>
                          <View style={styles.separator}></View>
                      </View>
                  </TouchableHighlight>
              }
              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index}
          />
          <TextInput
            multiline={true}
            maxLength={200}
            editable={false}
            ref='errorOutput'
            style={styles.errorText}
            onChangeText={(errorText) => {this.setState({text: errorText})}}
            value={this.state.errorText}
          />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  form: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row'
  },
  container: {
      backgroundColor: 'white',
      flex: 1
  },
  sectionHeader: {
      paddingTop: 20,
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
  },
  questionInput: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  errorText: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 40,
      color: 'red'
  },
  textField: {
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,.3)',
    borderRadius: 4,
    height: 50,
    alignSelf: 'stretch',
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    flex: 1
  },
  button: {
    minWidth: 77,
    height: 50,
    margin: 0,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  enabledTitle: {
    color: 'white'
  },
  disabledTitle: {
    color: 'rgba(0,0,0,.2)'
  }
});

AppRegistry.registerComponent('SessionDetailView', () => SessionDetailView);
