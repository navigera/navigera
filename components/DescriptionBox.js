import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { numberWithSpaces, capitalizeFirst } from "../utilities.js";

export default class DescriptionBox extends Component {
  constructor(props) {
    super(props);
  }

  getBox(product) {
    if (!this.props.carousel) {
      return (
        <View style={styles.descriptionBox}>
          <Text style={styles.h1}>
            {product.product_info.family.toUpperCase()}
          </Text>
          <Text style={styles.h3}>
            {capitalizeFirst(product.product_info.category)},{" "}
            {product.product_info.color}
          </Text>
          <Text style={styles.h2}>
            {numberWithSpaces(product.availability.price)} kr
          </Text>
        </View>
      );
    }
    else{
      return(
        <View style={styles.descriptionBox}>
        <Text style={[styles.h3,styles.rightAligned]}>
          {capitalizeFirst(product.product_info.category)},
          
        </Text>
        <Text style={[styles.h3,styles.rightAligned]}>
        {product.product_info.color}</Text>
        <Text style={[styles.h2, styles.rightAligned]}>
          {numberWithSpaces(product.availability.price)} kr
        </Text>
      </View>
      );
    }
  }
  render() {
    const { product } = this.props;

    return this.getBox(product);
  }
}

const styles = StyleSheet.create({
  descriptionBox: {
    flexDirection: "column",

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
  rightAligned:{
    textAlign:"right"
  }
});
