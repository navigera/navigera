import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { numberWithSpaces, capitalizeFirst } from '../utilities.js';

export default class DescriptionBox extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {product} = this.props;   
    return (

        <View style={styles.descriptionBox}>
          <Text style={styles.h1}>{product.product_info.family.toUpperCase()}</Text>
          <Text style={styles.h3}>{capitalizeFirst(product.product_info.category)}, {product.product_info.color}</Text>
          <Text style={styles.h2}>{numberWithSpaces(product.availability.price)} kr</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  descriptionBox: {
    flexDirection: "column",
    width:'45%',
  },
  h1: {
    fontSize: 18,
    fontWeight: "bold"
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold"
  },
  h3: {
    fontSize: 14,
    color: "gray"
  },
});
