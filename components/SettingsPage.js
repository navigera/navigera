import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, BackHandler, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Icon } from "@up-shared/components";
import { globalStyles } from "../utilities";


export default class SettingsPage extends Component {
    constructor(props){
        super(props);

        this.settingsClosed = this.settingsClosed.bind(this);
    }

    settingsClosed(){
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount(){
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.settingsClosed
        );
    }

    componentWillUnmount(){
        this.backHandler.remove();
    }

  render() {
    return (
        <View style={styles.container}>

            <View style={styles.header}>  
                <TouchableOpacity style={styles.button} onPress={this.settingsClosed}>
                    <Icon name="arrow-left" size={33} color="white"></Icon>
                </TouchableOpacity>  
                <Text style={[styles.headerText, globalStyles.bold]}>Settings</Text>  
            </View>

            <View style={styles.contentContainer}>
                
                <Text style={[styles.titleText, globalStyles.bold]}>Application</Text>

                <TouchableHighlight onPress={() => this.props.navigation.navigate("SettingWarehouse")}>
                    <View style={styles.optionContainer}>
                        <Text style={[styles.optionText, globalStyles.regular]}>Change warehouse</Text>
                        <Icon name="arrow-right" size={20} color="#5a5e66"></Icon>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate("SettingRoute")}>
                    <View style={styles.optionContainer}>
                        <Text style={[styles.optionText, globalStyles.regular]}>Order route by</Text>
                        <Icon name="arrow-right" size={20} color="#5a5e66"></Icon>
                    </View>
                </TouchableHighlight>

                <Text style={[styles.titleText, globalStyles.bold]}>About</Text>

                <View style={styles.aboutContainer}>
                    <View style={styles.optionContainer}>
                        <Text style={[styles.optionText, globalStyles.regular]}>Version</Text>
                        <Text style={[styles.optionText, globalStyles.regular]}>1.0.0</Text>
                    </View>
                    <View style={styles.optionContainer}>
                        <Text style={[styles.optionText, globalStyles.regular]}>License</Text>
                        <Text style={[styles.optionText, globalStyles.regular]}>IKEA</Text>
                    </View>
                </View>

            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#0058a3',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    borderBottomWidth: 0.5,
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    marginTop: 15,
    marginRight: 155,
  },
  button: {
    height: 40,
    marginTop: 15,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0058a3',  
  },
  titleText: {
    color: '#5a5e66',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  optionContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingRight: 20,
    paddingLeft: 20,
    borderColor: 'grey',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    backgroundColor: 'white',
  },
  optionText: {
    color: 'black',
    fontSize: 15,
  },
  aboutContainer: {
    flex: 1,
    backgroundColor: 'white',
  }
})