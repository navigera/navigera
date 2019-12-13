import React, { Component } from "react";
import { Text, View, StyleSheet} from "react-native";
import { globalStyles } from "../utilities";
import { Icon } from "@up-shared/components";

export default class SettingsOption extends Component {

  renderIcon() {
      return(
        <View style={{transform: [{rotate: '90deg'}]}}>
            <Icon name="chevron-up" size={27} color={this.props.disabled ? "grey" : "black"}></Icon>
         </View>     
      );
  }  

  renderExtended() {
      return(
        <View style={styles.infoContainer}>
            <Text style={[styles.infoText, globalStyles.regular]}>{this.props.subTitle}</Text>
            {this.renderIcon()}
        </View>
      );
  }

  render() {
    const label = this.props.title;
    return (
        <View style={styles.optionContainer}>
            <Text style={[this.props.disabled ? styles.notImplementedText : styles.optionText, globalStyles.regular]}>{label}</Text>
            {this.props.extended ? this.renderExtended() : this.renderIcon()}
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
    notImplementedText: {
        color: 'grey',
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