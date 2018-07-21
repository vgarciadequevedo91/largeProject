import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View, SectionList } from 'react-native';

export default class ClassDetailView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#16966A',
        headerTitleStyle: {
            color: 'black',
        }
    });

    render() {
      const { name, id, createdAt, surveys } = this.props.navigation.state.params

      return (
        <SectionList
            style={styles.container}
            sections={[
                {title: 'Ask a Question', data: []},
                {title: 'Surveys', data: surveys}
            ]}
            renderItem={({item}) =>
                <View style={styles.cell}>
                    <Text style={styles.sessionName}>{item.questionText}</Text>
                    <Text style={styles.sessionResponses}>{item.numAnswers + " responses"}</Text>
                    <View style={styles.separator}></View>
                </View>
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
    sessionName: {
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

AppRegistry.registerComponent('ClassDetailView', () => ClassDetailView);
