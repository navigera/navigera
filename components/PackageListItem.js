import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { formatSingleUnit, capitalizeFirst } from "../utilities.js";

export default class ProductList extends Component {
  render() {
    const { item, amount, lastItem } = this.props;

    console.log("lastitem:", lastItem);

    return (
      <View style={lastItem ? styles.containerLastItem : styles.container}>
        {/*<Image style={styles.image} source={{uri:(item.product_info.image_url)}} />*/}
        <View style={styles.descriptionBox}>
          <View style={styles.amount}>
            <Text style={styles.h3}>
              {capitalizeFirst(item.product_info.category)}
            </Text>
            <Text style={styles.amountText}>x {amount}</Text>
          </View>
          <View style={styles.productNumbers}>
            <View style={styles.productIDBox}>
              <Text style={styles.productIDText}>
                {item.product_info.id}
              </Text>
            </View>

            <View style={styles.shelfBox}>
              <Text style={styles.productIDText}>
                {formatSingleUnit(item.availability.aisle)}
              </Text>
            </View>
            <Text style={styles.h3}>Aisle</Text>

            <View style={styles.shelfBox}>
              <Text style={styles.productIDText}>
                {formatSingleUnit(item.availability.shelf)}
              </Text>
            </View>
            <Text style={styles.h3}>Shelf</Text>
          </View>
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
    padding: 10
  },
  containerLastItem: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15
  },
  descriptionBox: {
    flexDirection: "column"
  },
  image: {
    width: 20,
    height: 20,
    margin: 30,
    alignSelf: "center"
  },
  amount: {
    flexDirection: "row"
  },
  amountText: {
    fontSize: 14,
    width: "30%",
    color: "gray",
    textAlign: "center"
  },
  h1: {
    fontSize: 18
  },
  h2: {
    fontSize: 16
  },
  h3: {
    fontSize: 14,
    color: "gray"
  },
  h4: {
    fontSize: 10
  },
  productNumbers: {
    width: 230,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  productIDBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: 70,
    height: 20
  },
  productIDText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 10
  },
  shelfBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cc0008",
    width: 20,
    height: 20
  }
});
