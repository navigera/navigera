import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../utilities";
import { Icon } from "@up-shared/components";

export default class SettingsHeader extends Component {
  render() {
    return (
        <View style={styles.header}>  
            <TouchableOpacity style={styles.button} onPress={this.props.method}>
                <View style={{transform: [{rotate: '90deg'}]}}>
                    <Icon name="chevron-down" size={30} color="white"></Icon>
                </View> 
            </TouchableOpacity>  
            <Text style={[styles.headerText, globalStyles.bold]}>{this.props.titleText}</Text>  
         </View>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#0058a3',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 27,
        marginTop: 20,
        marginLeft: 8,
        width: '100%',
    },
    button: {
        height: 45,
        width: 45,
        marginTop: 15,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
});