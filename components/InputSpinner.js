import React, { Component } from 'react';
import {TouchableHighlight,Text,StyleSheet, View } from 'react-native';


export default class InputSpinner extends Component {
  
    constructor(){
        super();
        this.state ={
            value:1,
            clickable: false
        }
    }

    subtract(){
        if(this.state.value>1){
            this.setState({value: this.state.value-1});
        }
        if(this.state.value<=2){
            this.setState({clickable:false})
        }
    console.log(this.state.value)
    }
    
    add(){
        this.setState({value: this.state.value+1});
        this.setState({clickable:true});
        console.log(this.state.value);
    }

    getData(){
        return this.state.value;
    }

  render(){
    
    return (
      
      <View style={styles.Spinner}>
        <View style={{flex:1}}>
          <TouchableHighlight underlayColor ={this.state.clickable ? 'lightgray' :'white'} 
            style={styles.button} onPress = {() =>{this.subtract()}}>
              <Text style={this.state.clickable ? styles.text : styles.text_subtract}>-</Text>
          </TouchableHighlight>
        </View>
      
        <Text style={styles.text}>{this.state.value}</Text>
      
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
