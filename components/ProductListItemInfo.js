import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Icon } from "@up-shared/components";
import { TouchableHighlight } from "react-native";
import DescriptionBox from "./DescriptionBox.js";
export default class ProductListItemInfo extends Component {

  handlePress() {
    this.props.handlePress();
  }

  render() {
    const { product, expanded } = this.props;
    return (

      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: (product.product_info.image_url) }} />
        
        <DescriptionBox product ={product}></DescriptionBox>
        <View style={styles.amount}>
          <TouchableHighlight
            style={styles.iconContainer}
            onPress={() => { this.handlePress(); }}
            underlayColor={"white"}>
            <Icon name={"chevron-" + (expanded ? 'up' : 'down')} size={30} color="black" />
          </TouchableHighlight>
          <Text style={styles.amountText}>x {product.amount}</Text>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderStyle: "dotted",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15
  },
  descriptionBox: {
    flexDirection: "column"
  },
  image: {
    width: 70,
    height: 70,
    margin: 5,
  },

  amount: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  amountText: {
    fontSize: 14,
    width: "35%",
    color: "gray",
    textAlign: "left"
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignSelf: "flex-end"
  },
});
