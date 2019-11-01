import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default class ProductListFooter extends Component {

  numberWithSpaces(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  render() {
    const price = this.props.price;
    const quantity = this.props.quantity;
    return (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textQuantity}>
              <Text> Du har </Text>
              <Text style={{fontWeight:'bold'}}>{quantity} produkter</Text>
              <Text> i din lista </Text>
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textPrice}> Summa </Text>
            <Text style={styles.textPrice}> {this.numberWithSpaces(price)} kr </Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
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
    fontSize: 17,
    fontWeight: "bold",
    color: 'black',
    margin: 15,
  },
  textQuantity: {
    fontSize: 17,
    color: '#5a5e66',
    margin: 15,
  },
});
