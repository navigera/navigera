import React, { Component } from "react";
import { Text, View, StyleSheet} from "react-native";
import { globalStyles } from "../utilities";
import { Icon } from "@up-shared/components";

export default class SettingsOptionExtended extends Component {
  render() {
    const title = this.props.title;
    const subLabel = this.props.subTitle;
    return (
        <View style={styles.optionContainer}>
            <Text style={[styles.optionText, globalStyles.regular]}>{title}</Text>
            <View style={styles.infoContainer}>
                <Text style={[styles.infoText, globalStyles.regular]}>{subLabel}</Text>
                <View style={{transform: [{rotate: '90deg'}]}}>
                    <Icon name="chevron-up" size={27} color="black"></Icon>
                </View>     
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
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        color: 'grey',
        marginRight: 10,
        fontSize: 14,
    },
});