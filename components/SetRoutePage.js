import React, { Component } from 'react';
import { Text, View, StyleSheet, BackHandler, TouchableOpacity, Switch } from 'react-native';
import { Icon } from "@up-shared/components";
import { globalStyles } from "../utilities";
import SettingsHeader from "./SettingsHeader.js";


export default class SetRoutePage extends Component {
    constructor(props){
        super(props);

        this.setRouteClosed = this.setRouteClosed.bind(this);
    }

    setRouteClosed(){
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount(){
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.setRouteClosed
        );
    }

    componentWillUnmount(){
        this.backHandler.remove();
    }

  render() {
    return (
        <View style={styles.container}>

            <SettingsHeader titleText={"Route order"} method={this.setRouteClosed}/>

            <View style={styles.contentContainer}>

                <View style={styles.optionContainer}>
                    <Text style={[styles.optionText, globalStyles.regular]}>Package volume</Text>
                    <Switch disabled={true} trackColor={{false:'#b8b8b6', true:'#68ed8c'}} thumbColor={'white'} value={true} style={styles.switch,{ transform: [{ scaleX: 1.6 }, { scaleY: 1.5 }]}}/>
                </View>
                <View style={styles.optionContainer}>
                    <Text style={[styles.notImplementedText, globalStyles.regular]}>Package weight</Text>
                    <Switch disabled={true} trackColor={{false:'#b8b8b6', true:'#68ed8c'}} thumbColor={'white'} value={false} style={{ transform: [{ scaleX: 1.6 }, { scaleY: 1.5 }] }}/>
                </View>
                
                <View style={styles.optionContainer}>
                    <Text style={[styles.notImplementedText, globalStyles.regular]}>Quickest route</Text>
                    <Switch disabled={true} trackColor={{false:'#b8b8b6', true:'#68ed8c'}} thumbColor={'white'} value={false} style={{ transform: [{ scaleX: 1.6 }, { scaleY: 1.5 }] }}/>
                </View>
                
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  optionContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 25,
    paddingLeft: 25,
  },
  optionText: {
    color: 'black',
    fontSize: 18,
  },
  notImplementedText: {
    color: 'grey',
    fontSize: 18,
  },
})