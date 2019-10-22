import React, { Component } from 'react';
import {Text, StyleSheet, View } from 'react-native';

import PopUpProduct from "./PopUpProduct";

export default class TestPopUpProduct extends Component {
    
  render() {
    const { item } = this.props;
    if ( item!=null){
      console.log(item.product.product_info.family)
    return (
      <View style={styles.container,{flex:1}}>
        <PopUpProduct style={styles.modal}ref={modal => {this.modal = modal}} item={item.product}></PopUpProduct>
        <View style={styles.textBox}>
          <Text style={styles.text}
          onPress={() => {this.modal.showPopover()}}>

            {item.product.product_info.family} 
          </Text>
        </View>
      </View>
    );}

    else { return(
      <View>
        <Text>Failed to fetch, Bad connection(?)</Text>
      </View>
    );}
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
  },
  textBox: {
    flexWrap:'wrap',
    height:30, 
    alignContent:"center",
    borderWidth:1,

    margin: 5,
  }
});
