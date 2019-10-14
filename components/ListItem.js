import React, { Component } from 'react';
import {Text, StyleSheet, View } from 'react-native';

import ItemDescription from "./ItemDescription";

export default class ListItem2 extends Component {
    
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container,{flex:1}}>
        <ItemDescription style={styles.modal}ref={modal =>{this.modal = modal}} item={item}></ItemDescription>
        
        <View style={styles.textBox}>
          <Text style={styles.text}
            onPress={() => {this.modal.showPopover()}}>
            {item.name} 
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  

  container: {
    margin: 20,
  },
  text: {
    fontSize: 20,
    marginLeft:'10%',
    textAlign: 'center',
    //backgroundColor:'#0058a3'
  },
  textBox: {
    flexWrap:'wrap',
    height:30, 
    alignContent:"center",
    borderWidth:1,

    //padding:20,
    margin: 5,
  }
});