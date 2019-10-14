import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class ProductListItemInfo extends Component {

  render(){
    return(

      <View style={styles.container}>
        <Text>Billy bokhylla</Text>
      </View>

    );
  }

}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: 'green',
  },
});
