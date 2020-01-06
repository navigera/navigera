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

      return (
        <Icon name={icon} size={30} color="white"></Icon>
      );
  }

  renderText(text){
    if(text.length>0){
      return(
      <Text style={[styles.text, globalStyles.bold]}>
        {text}
      </Text>);
    }
  }

  getColor(){
    if(this.props.color=="green"){
      return styles.green;
    }
    console.log("color: ",this.props.color);
    
  }

  render() {
    const { text, onPress, icon, color, disabled } = this.props;
    
    
    return (
      <View style={styles.Box}>
        <TouchableHighlight underlayColor={"#3379b5"}
          style={[styles.button, {backgroundColor: color}]} onPress={onPress} disabled={disabled}>
          
          <View style={styles.buttonContent}>
            {this.renderIcon(icon)}
            {this.renderText(text)}
            
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
  green:{
    backgroundColor: "#00FF00",
  },
  text: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "white",
    margin: 5,
    marginLeft: 10,
    textAlign: "center",
  },
});
