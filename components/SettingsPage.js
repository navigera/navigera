import React, { Component } from 'react';
import { Text, View, StyleSheet, BackHandler, TouchableHighlight } from 'react-native';
import { globalStyles } from "../utilities";
import SettingsHeader from "./SettingsHeader.js";
import SettingsOption from "./SettingsOption.js";
import SettingsOptionExtended from "./SettingsOptionExtended.js";


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
                    <SettingsOptionExtended title={"Order route by"} subTitle={"Package volume"}/>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.props.navigation.navigate("SettingWarehouse", {warehouse: this.props.screenProps.chosenWarehouse, update: this.props.screenProps.updateWarehouse})}>
                    <SettingsOptionExtended title={"Warehouse location"} subTitle={location}/>
                </TouchableHighlight>

                <TouchableHighlight>
                    <SettingsOption title={"Help"}/>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.props.navigation.navigate("SettingAbout")}>
                    <SettingsOption title={"About NAVIGERA"}/>
                </TouchableHighlight>

                <TouchableHighlight>
                    <SettingsOption title={"Report a problem"}/>
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
  eraseText: {
    color: 'red',
    fontSize: 18,
  },
  notImplementedText: {
    color: 'grey',
    fontSize: 18,
  },
})