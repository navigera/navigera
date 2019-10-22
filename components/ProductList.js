import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ProductListItem from "./ProductListItem.js"

export default class ProductList extends Component {

  render(){
    return(

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container, styles.padding}>
          {this.props.products.map(p => {
            return <ProductListItem product={p.product} removeCallback={this.props.removeCallback} key={p.key}/>
          })}
        </ScrollView>
      </SafeAreaView>

    );
  }

}

const styles = StyleSheet.create({
	button : {
    color:"white"

  },

  container:{
    flex: 1,
  },

  padding:{
    padding: 20,
  },

  image:{
    width: 300,
    height: 300
  }
});
