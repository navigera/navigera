import React, { Component } from 'react';
import { TouchableHighlight, Text, StyleSheet, View } from 'react-native';
import { globalStyles } from '../utilities';
import { Icon } from "@up-shared/components";


export default class PrimaryButton extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  renderIcon(icon) {
    if (icon) {
      return (
        <Icon name={icon} size={30} color="white"></Icon>
      );
    }
  }

  render() {
    const { text, onPress, icon } = this.props;

    return (
      <View style={styles.Box}>
        <TouchableHighlight underlayColor={"#3379b5"}
          style={styles.button} onPress={onPress}>
          <View style={styles.buttonContent}>
            {this.renderIcon(icon)}
            <Text style={[styles.text, globalStyles.bold]}>
              {text}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Box: {
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#0058a3",
    width: "100%",
    padding: 5,
    borderRadius: 50,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "white",
    margin: 15,
    marginLeft: 25,
    textAlign: "center",
  },
});
