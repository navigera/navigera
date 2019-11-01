import React, { Component } from 'react';
import {TouchableHighlight,Text,StyleSheet, View } from 'react-native';


export default class PrimaryButton extends Component {
  
    constructor(){
        super();
        this.state ={
        }
    }

  render(){ 
    return (
        <View style={styles.Box}>
          <TouchableHighlight underlayColor ={"#3379b5"} 
            style={styles.button} onPress={this.props.onPress}>
              <Text style={styles.text}>{this.props.text}
              </Text>
          </TouchableHighlight>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    Box:{
       flexWrap:"wrap",
       justifyContent: "center",
       alignItems: "center",
    },
    button:{
        backgroundColor:"#0058a3",
        width:"100%",
        padding: 5,
        borderRadius: 50,
        
    },
    text:{
         fontSize:20,
         fontFamily:"Roboto",
         fontWeight:"bold",
         color:"white",
         margin: 10,
         textAlign: "center",
    },
  });
