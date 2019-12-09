import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, BackHandler, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Icon } from "@up-shared/components";
import { globalStyles } from "../utilities";
import SettingsHeader from "./SettingsHeader.js";


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
    const location = this.props.screenProps.chosenWarehouse.Name;
    return (
        <View style={styles.container}>
          
            <SettingsHeader titleText={"Settings"} method={this.settingsClosed}/>

            <View style={styles.contentContainer}>
                
                <TouchableHighlight>
                    <View style={styles.optionContainer}>
                        <Text style={[styles.eraseText, globalStyles.regular]}>Clear shopping list</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.props.navigation.navigate("SettingRoute")}>
                    <View style={styles.optionContainer}>
                        <Text style={[styles.optionText, globalStyles.regular]}>Order route by</Text>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.infoText, globalStyles.regular]}>Package volume</Text>
                            <View style={{transform: [{rotate: '90deg'}]}}>
                                <Icon name="chevron-up" size={27} color="black"></Icon>
                            </View>     
                        </View>   
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.props.navigation.navigate("SettingWarehouse", {warehouse: this.props.screenProps.chosenWarehouse, update: this.props.screenProps.updateWarehouse})}>
                    <View style={styles.optionContainer}>
                        <Text style={[styles.optionText, globalStyles.regular]}>Warehouse location</Text>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.infoText, globalStyles.regular]}>{location}</Text>
                            <View style={{transform: [{rotate: '90deg'}]}}>
                                <Icon name="chevron-up" size={27} color="black"></Icon>
                            </View>     
                        </View>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight>
                    <View style={styles.optionContainer}>
                        <Text style={[styles.optionText, globalStyles.regular]}>Help</Text>
                        <View style={{transform: [{rotate: '90deg'}]}}>
                              <Icon name="chevron-up" size={27} color="black"></Icon>
                        </View>     
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.props.navigation.navigate("SettingAbout")}>
                    <View style={styles.optionContainer}>
                        <Text style={[styles.optionText, globalStyles.regular]}>About NAVIGERA</Text>
                        <View style={{transform: [{rotate: '90deg'}]}}>
                              <Icon name="chevron-up" size={27} color="black"></Icon>
                        </View>     
                    </View>
                </TouchableHighlight>

                <TouchableHighlight>
                    <View style={styles.optionContainer}>
                        <Text style={[styles.notImplementedText, globalStyles.regular]}>Report a problem</Text>
                        <View style={{transform: [{rotate: '90deg'}]}}>
                              <Icon name="chevron-up" size={27} color="grey"></Icon>
                        </View>     
                    </View>
                </TouchableHighlight>
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
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    paddingRight: 25,
    paddingLeft: 25,
  },
  optionText: {
    color: 'black',
    fontSize: 18,
  },
  eraseText: {
    color: 'red',
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: 'grey',
    marginRight: 10,
    fontSize: 14,
  },
  notImplementedText: {
    color: 'grey',
    fontSize: 18,
  },
})