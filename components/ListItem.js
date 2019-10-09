import React, { Component } from 'react';
import {Text, StyleSheet, View } from 'react-native';

import ItemDescription from "./ItemDescription";

export default class ListItem2 extends Component {

    
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container,{flex:1}}>
         <ItemDescription style={styles.modal}ref={modal =>{this.modal = modal}} item={item}></ItemDescription>
        <Text style={styles.text}
         onPress={() => { this.modal.showPopover()}}>
          {item.name} 
        </Text>
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
    textAlign: 'center',
    backgroundColor:'#0058a3'
  }
});