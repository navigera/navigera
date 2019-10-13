import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import ProductListItem from "./ProductListItem.js"

export default class ProductList extends Component {

  render(){
    return(

      <View style={styles.container}>
        <ProductListItem></ProductListItem>
        <ProductListItem></ProductListItem>
        <ProductListItem></ProductListItem>
      </View>

    );
  }

}

const styles = StyleSheet.create({
	button : {
    color:"white"

  },
  h1:{
    fontSize:40,
    fontFamily: "Roboto",
    fontWeight:"bold",
  },
  h2:{
    fontSize:32,
    fontFamily: "Roboto",
    fontWeight:"bold",
  },
  h3:{
    fontSize:20,
    fontFamily: "Roboto",
    fontWeight:"normal",
  },
  h4:{
    fontSize:18,
    fontFamily: "Roboto",
    fontWeight:"normal",
  },
  h5:{
    fontSize:18,
    color:"#666",
    fontFamily: "Roboto",
    fontWeight:"normal",
  },

  container:{
    flex: 1,
    backgroundColor: 'purple',
    padding: 20,
  },

  image:{
    width: 300,
    height: 300
  }
});
