import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { numberWithSpaces, globalStyles } from "../utilities";

export default class ProductListFooter extends Component {
  getProductsText(quantity) {
    let text = "product";
    if (quantity != 1) {
      text += "s";
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
            <Text style={globalStyles.bold}>
              {quantity} {this.getProductsText(quantity)}
            </Text>
            <Text> in your shopping list. </Text>
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.textPrice, globalStyles.bold]}> Total </Text>
          <Text style={[styles.textPrice, globalStyles.bold]}>
            {" "}
            {numberWithSpaces(price)} kr{" "}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: '100%',
    bottom: 0,
    backgroundColor: "#f4f4f4",
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "column"
  },
  textContainer: {
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingBottom: 20
  },
  textPrice: {
    fontSize: 24,
    color: "black",
    marginVertical: 25
  },
  textQuantity: {
    marginVertical: 30,
    fontSize: 17,
    color: "#5a5e66",
    marginBottom: 45,
  }
});
