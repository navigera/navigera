import React, { Component } from "react";
import { Text, View, StyleSheet} from "react-native";
import { globalStyles } from "../utilities";
import { Icon } from "@up-shared/components";

export default class SettingsOption extends Component {
  render() {
    const label = this.props.title;
    return (
        <View style={styles.optionContainer}>
            <Text style={[styles.optionText, globalStyles.regular]}>{label}</Text>
            <View style={{transform: [{rotate: '90deg'}]}}>
                <Icon name="chevron-up" size={27} color="black"></Icon>
            </View>     
        </View>
    );
  }
}

const styles = StyleSheet.create({
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
});