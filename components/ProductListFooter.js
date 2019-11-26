import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { numberWithSpaces,globalStyles } from '../utilities';

export default class ProductListFooter extends Component {

  getProductsText(quantity){
    let text = "product";
    if(quantity != 1){
      text += 's';
    }
    return text;
  }

  render() {
    const price = this.props.price;
    const quantity = this.props.quantity;
    return (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textQuantity}>
              <Text> You've got </Text>
              <Text style={globalStyles.bold}>{quantity} {this.getProductsText(quantity)}</Text>
              <Text> in your shopping list. </Text>
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.textPrice, globalStyles.bold]}> Total </Text>
            <Text style={[styles.textPrice, globalStyles.bold]}> {numberWithSpaces(price)} kr </Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    paddingTop:5,
    paddingBottom:5,
    height: 65,
    flexDirection: 'column',
  },
  textContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20,
  },
  textPrice: {
    fontSize: 24,
    color: 'black',
    margin: 15,
    marginVertical: 25,
  },
  textQuantity: {
    fontSize: 17,
    color: '#5a5e66',
    margin: 15,
  },
});
