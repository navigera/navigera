import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class ProductList extends Component {

  render(){
    return(

      <View style={styles.container}>
        <Text>{this.props.name}</Text>
      </View>

    );
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: 'red',
  },
});
