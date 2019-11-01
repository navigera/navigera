import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Icon } from "@up-shared/components";
import { TouchableHighlight } from "react-native";

export default class ProductListItemInfo extends Component {

  capitalizeFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  handlePress() {
    this.props.handlePress();
  }

  getChevron(expanded) {
    if (!expanded) {
      return (<Icon name="chevron-down-24" size={30} color="black" />);
    } else {
      return (
        <View style={{ transform: [{ scaleY: -1 }] }}>
          <Icon name="chevron-down-24" size={30} color="black" />
        </View>
      );
    }
  }

  render() {
    const { item, amount, expanded } = this.props;

    console.log("rendering");
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: item.product_info.image_url }}
        />

        <View style={styles.descriptionBox}>
          <Text style={styles.h1}>
            {item.product_info.family.toUpperCase()}
          </Text>
          <Text style={styles.h3}>
            {this.capitalizeFirst(item.product_info.category)},{" "}
            {item.product_info.color}
          </Text>
          <Text style={styles.h2}>
            {this.numberWithSpaces(item.availability.price)} kr
          </Text>
        </View>

        <View style={styles.amount}>
          <TouchableHighlight
            style={styles.iconContainer}
            onPress={() => {this.handlePress();}}
            underlayColor={"white"}>
            {this.getChevron(expanded)}
          </TouchableHighlight>

          <Text style={styles.amountText}>x {amount}</Text>
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
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5
  },
  descriptionBox: {
    flexDirection: "column"
  },
  image: {
    width: 70,
    height: 70
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
