import React, { Component } from 'react';
import {TouchableHighlight,Text,StyleSheet, View } from 'react-native';


export default class InputSpinner extends Component {

    constructor(){
        super();
    }

    subtract(){
        if(this.props.amount > 1){
            this.props.handleSpinnerChange(this.props.amount - 1);
        }
      
    }

    add(){
        this.props.handleSpinnerChange(this.props.amount + 1);
    }

  render(){

    return (

      <View style={styles.Spinner}>
        <View style={{flex:1}}>
          <TouchableHighlight underlayColor = {this.props.amount > 1 ? 'lightgray' :'white'}
            style={styles.button} onPress = {() =>{this.subtract()}}>
              <Text style={this.props.amount > 1 ? styles.text : styles.text_subtract}>-</Text>
          </TouchableHighlight>
        </View>

        <Text style={styles.text}>{this.props.amount}</Text>

        <View style={{flex:1}}>
          <TouchableHighlight  underlayColor ={'lightgray'} style={styles.button} onPress = {() =>{this.add()}}>
            <Text style={styles.text}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
      );
    }
}

const styles = StyleSheet.create({
    Spinner:{
      width:100,
      height:30,
      borderColor:"gray",
      borderWidth:1,
      flexWrap:"wrap",
      flexDirection:"row",
      alignContent:"center",
      alignItems:"center"

    },
    button:{
      justifyContent:"center",
    },
    text:{
     textAlign:"center",
     fontSize:20
    },
    text_subtract:{
      textAlign:"center",
      fontSize: 20,
      opacity:0.5
    }
  });
