import React, { Component } from "react";
import { TouchableHighlight, Text, Image, StyleSheet, View } from 'react-native';
import {globalStyles } from '../utilities.js';
import { Icon } from "@up-shared/components";


export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(){
    this.props.navigation.navigate("WarehouseLocationPage")
  }


  render() {
    return (
    <View style={styles.container}>
        <Text style={[styles.text,globalStyles.bold]}>NAVIGERA</Text>
        
        <TouchableHighlight underlayColor={"#116fbf"} onPress={this.handlePress}>
            <View style={styles.btn}>
                <Text style={[styles.textBtn,globalStyles.bold]}> Locate a warehouse </Text>
                <Icon name="arrow-right" size={40} color="#ffdb00" />
            </View>
        </TouchableHighlight>
       
    </View>);
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#0058a3",
        alignContent:"center",
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        color:"white",
        textAlign: "center",
        fontSize:48
    },
    textBtn:{
        color:"white",
        textAlign: "center",
        fontSize:24,
    },
    btn:{
        flexDirection:"row",
        alignContent:"center",
        alignItems:"center",
        borderColor: "white",
        borderWidth:1,   
        paddingLeft:20,
        paddingRight:20
    }

});
